import { useRef } from 'react';
import DomainResponse from 'core/common/DomainBase';
import Service from '../service/ConfigApiService';
import log from '../ModuleLogger';
import { useWebCacheApi } from 'core/hooks/UseWebCacheApi';
import {
  ConfigContext,
  ConfigActions,
  ConfigInitalState,
} from '../store/ConfigStore';
import { createSlice, useDispatch, useStore } from 'core/store/store';
const tag = 'ConfigDomain';
function useConfig() {
  const configContext = useStore()[ConfigContext];
  const dispatcher = useDispatch();

  const cache = useWebCacheApi('KTOAuthoring');
  const init = async (userState) => {
    log.info(tag, 'initialize domain');
    let result = new DomainResponse();
    let newConfig = { ...configContext };

    newConfig.classes = result.data;
    // lấy danh mục còn lại theo user
    result = await loadUserConfig(userState);
    if (!result.isSuccess()) {
      return result;
    }
    newConfig.category = result.data;

    // lấy danh sách cấu hình hệ thống
    result = await loadSystemConfig(userState);
    if (!result.isSuccess()) {
      return result;
    }
    newConfig = { ...newConfig, ...result.data };
    createSlice(dispatcher, ConfigContext, ConfigActions, {
      ...ConfigInitalState,
      ...newConfig,
    });
    result.success('Success');
    return result;
  };

  const loadUserConfig = async (userState) => {
    let result = new DomainResponse();
    const cacheItemKey = `config.${userState.company_code}.category`;
    // Lấy dữ liệu từ cache.
    const cacheObject = await cache.getCacheItem(cacheItemKey);
    if (cacheObject) {
      result.success('Success', cacheObject);
      return result;
    }
    // Nếu không tìm thấy dữ liệu trong cache thì lấy từ server
    let configResponse = await Service.invokeGetConfig();
    // kiểm tra trạng thái trả về
    if (!Service.isSuccess(configResponse)) {
      result.failed('Lỗi lấy thông tin user config', {
        navigateUrl: '/login',
      });
      return result;
    }
    if (userState.company_code) {
      // cập nhật lại dữ liệu vào cache
      cache.setCacheItem(cacheItemKey, configResponse.data.data);
    }
    log.trace(tag, 'initialize Config domain -> user config OK');
    result.success('', configResponse.data.data);
    return result;
  };

  const loadSystemConfig = async (userState) => {
    let result = new DomainResponse();
    let general = null;
    let grades = null;
    let subjects = null;
    let custom_tags = null;

    const cacheItemKey = `config.${userState.company_code}`;
    // Lấy dữ liệu cache company
    const cacheItemKeyGeneral = `${cacheItemKey}.general`;
    general = await cache.getCacheItem(cacheItemKeyGeneral);

    // Lấy dữ liệu cache grades
    const cacheItemKeyGrades = `${cacheItemKey}.grades`;
    grades = await cache.getCacheItem(cacheItemKeyGrades);

    // Lấy dữ liệu cache subjects
    const cacheItemKeySubjects = `${cacheItemKey}.subjects`;
    subjects = await cache.getCacheItem(cacheItemKeySubjects);

    // Lấy dữ liệu cache custom tags
    const cacheItemKeyTags = `${cacheItemKey}.tags`;
    custom_tags = await cache.getCacheItem(cacheItemKeyTags);

    if (general && grades && subjects && custom_tags) {
      let cachedTags = [];

      grades.forEach((element) => {
        cachedTags[element.value] = element.label;
      });
      subjects.forEach((element) => {
        cachedTags[element.value] = element.label;
      });
      custom_tags.forEach((element) => {
        cachedTags[element.value] = element.label;
      });
      result.success('Success', {
        grades: grades,
        subjects: subjects,
        tags: custom_tags,
        delivery: general.delivery,
        company: general.company,
        notify: general.notify,
      });
      return result;
    }
    // Nếu không tìm thấy dữ liệu trong cache thì lấy từ server
    let systemConfigResponse = await Service.invokeGetSystemConfig();
    log.trace(tag, 'initialize Config domain -> system config invoke');
    if (!Service.isSuccess(systemConfigResponse)) {
      result.failed('Lỗi lấy thông tin system-config', {
        navigateUrl: '/login',
      });
      return result;
    }
    let tags = [],
      company = [];
    let notify, delivery;
    let systemConfig = systemConfigResponse.data?.data?.config || false;
    if (systemConfig) {
      grades = [];
      subjects = [];
      custom_tags = [];
      systemConfig.forEach((element) => {
        if (element.type == 'NOTIFY' && (!notify || notify.id < element.id)) {
          notify = element;
        } else if (element.key == 'DELIVERY') {
          delivery = JSON.parse(element.value);
        } else if (element.type == 'LOGO' || element.type == 'general_info') {
          company.push(element);
        } else if (element.type == 'LABEL') {
          tags[element.key] = element.value;
          if (element.key.startsWith('grade')) {
            grades.push({
              value: element.key,
              label: element.value,
            });
          } else if (element.key.startsWith('subject')) {
            subjects.push({
              value: element.key,
              label: element.value,
            });
          } else {
            custom_tags.push({
              value: element.key,
              label: element.value,
            });
          }
        }
      });
      if (userState.company_code) {
        await cache.setCacheItem(cacheItemKeyGrades, grades);
        await cache.setCacheItem(cacheItemKeySubjects, subjects);
        await cache.setCacheItem(cacheItemKeyTags, custom_tags);
        await cache.setCacheItem(cacheItemKeyGeneral, {
          delivery: delivery,
          notify: notify,
          company: company,
        });
      }

      result.success('', {
        grades: grades,
        subjects: subjects,
        tags: custom_tags,
        delivery: delivery,
        company: company,
        notify: notify,
      });
    }

    log.info(tag, 'initialize Config domain -> system config OK');
    return result;
  };

  const domainInterfaces = useRef({
    init,
  });
  return [configContext, domainInterfaces.current];
}
export default useConfig;
