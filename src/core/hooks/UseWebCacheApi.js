import { useState, useCallback } from 'react';
import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('UseWebCacheApi');
prefix.apply(log);
const tag = 'UseWebCacheApi';
const KTO_URL_PREFIX = 'https://kto.online';

export const useWebCacheApi = (key = false) => {
  const [cacheAvailable] = useState('caches' in window && key);
  const [cacheKey] = useState(key);

  const getCacheItem = useCallback(
    async (itemKey) => {
      if (!cacheAvailable) {
        return null;
      }
      const cache = await caches.open(cacheKey);
      if (!cache) {
        return null;
      }
      try {
        const cachedResponse = await cache.match(
          `${KTO_URL_PREFIX}/${itemKey}`,
        );
        if (!cachedResponse || !cachedResponse.ok) {
          return null;
        }
        const cacheObject = await cachedResponse.json();
        log.trace(tag, 'getCacheItem', cacheObject);
        return cacheObject;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    [cacheAvailable, cacheKey],
  );

  const setCacheItem = useCallback(
    async (itemKey, data) => {
      if (!cacheAvailable) {
        return false;
      }
      const cache = await caches.open(cacheKey);
      if (!cache) {
        return false;
      }
      var blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });

      var init = { status: 200, statusText: 'Sucess' };
      cache.put(`${KTO_URL_PREFIX}/${itemKey}`, new Response(blob, init));
      return true;
    },
    [cacheAvailable, cacheKey],
  );

  const deleteCacheItem = useCallback(
    async (itemKey) => {
      if (!cacheAvailable) {
        return false;
      }
      const cache = await caches.open(cacheKey);
      if (!cache) {
        return false;
      }
      await cache.delete(`${KTO_URL_PREFIX}/${itemKey}`);
      return true;
    },
    [cacheAvailable, cacheKey],
  );

  const deleteAllCache = useCallback(async () => {
    if (!cacheAvailable) {
      return false;
    }
    const cache = await caches.open(cacheKey);
    if (!cache) {
      return false;
    }
    const keys = await cache.keys();

    await Promise.all(
      keys.map(async (cacheItemKey) => {
        log.trace(tag, 'deleteCacheItem', cacheItemKey);
        await cache.delete(cacheItemKey);
      }),
    );

    // await cache.deleteAllCache();
    return true;
  }, [cacheAvailable, cacheKey]);

  return {
    getCacheItem,
    setCacheItem,
    deleteCacheItem,
    deleteAllCache,
  };
};
