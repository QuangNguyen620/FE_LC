import { useCallback, useRef } from 'react';
import log from '../ModuleLogger';

import { parseAccessToken } from 'core/utils/sso';
import DomainResponse from 'core/common/DomainBase';
import Service from '../service/UserApiService';
import {
  UserContext,
  UserActionList,
  UserActions,
  UserInitalState,
} from '../store/UserStore';
import { createSlice, useDispatch, useStore } from 'core/store/store';

const tag = 'UserDomain';

function useUser() {
  const userContext = useStore()[UserContext];
  const dispatcher = useDispatch();

  const verifyAndInitUser = useCallback(
    async (accessToken) => {
      log.info(tag, 'initialize domain');
      let result = new DomainResponse();

      // verify user logic
      let subscriptionVersion = '';
      let tokenInfo = parseAccessToken(accessToken);
      if (!tokenInfo) {
        log.trace(tag, 'Lỗi lấy thông tin từ token');
        result.failed('Lỗi lấy thông tin từ token');
        return result;
      }
      let currentVersion =
        localStorage.getItem('subscription_version') || false;

      if (
        !currentVersion ||
        tokenInfo.subscriptions.indexOf(currentVersion) === -1
      ) {
        subscriptionVersion = tokenInfo.subscriptions[0];
        log.info(tag, subscriptionVersion);
      }
      let userResponse = await Service.invokeGetUserInfo();

      if (!Service.isSuccess(userResponse)) {
        log.trace(tag, 'Lỗi lấy thông tin người dùng');
        result.failed('Lỗi lấy thông tin người dùng', {
          navigateUrl: '/login',
          userResponse: userResponse.data,
        });
        return result;
      }

      createSlice(dispatcher, UserContext, UserActions, {
        ...UserInitalState,
        ...userResponse.data.data.user,
      });
      log.trace(tag, 'Success');
      result.success('Sucecss');

      return result;
    },
    [dispatcher],
  );
  const initUser = useCallback(
    async (user) => {
      log.info(tag, 'initialize domain');
      let result = new DomainResponse();

      createSlice(dispatcher, UserContext, UserActions, {
        ...UserInitalState,
        ...user,
      });
      log.trace(tag, 'Success');
      result.success('Sucecss');
      return result;
    },
    [dispatcher],
  );

  const updateUser = useCallback(
    async (user) => {
      log.info(tag, 'initialize domain');
      let result = new DomainResponse();

      dispatcher({
        slice: UserContext,
        type: UserActionList.UpdateContext,
        data: user,
      });
      log.trace(tag, 'Success');
      result.success('Sucecss');
      return result;
    },
    [dispatcher],
  );

  const DomainInterface = useRef({
    initUser,
    updateUser,
    verifyAndInitUser,
  });
  return [userContext, DomainInterface.current];
}
export default useUser;
