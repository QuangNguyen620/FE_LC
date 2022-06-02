import { PropTypes } from 'prop-types';
import ReactGA from 'react-ga';
import React, { useMemo, useEffect, Suspense } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import routes from 'app/AppRoutes';

import { IntlProvider } from '@ant-design/pro-table';
import intlProvider_vi_VN from './locales/intlProvider_vi_VN';
import default_vi_VN from 'antd/lib/locale/vi_VN';
import custom_vi_VN from './locales/custom_vi_VN';

import { mergeDeep } from 'core/utils/object';
import { KTLoadingTemplate } from 'core/ui/common/templates/loading/KTLoading';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';

const log = logger.getLogger('Auth');
const tag = 'App';
prefix.apply(log);
const trackingId = process.env.REACT_APP_GA_CODE || 'UA-xxxxx-1';

ReactGA.initialize(trackingId);
ReactGA.set({ page: '/' });
class GAListener extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidMount() {
    let location = this.context.router?.history?.location || false;
    if (location) {
      this.sendPageView(location);
      this.context.router.history.listen(this.sendPageView);
    }
  }

  sendPageView(location) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

const vi_VN = mergeDeep(default_vi_VN, custom_vi_VN);

const App = (props) => {
  const history = useHistory();
  const lang = useMultiLanguage();
  // clean up controller
  let isSubscribed = true;

  useEffect(() => {
    // định nghĩa hàm thay thế khi load component
    const componentDidMount = async () => {
      if (!isSubscribed) {
        return;
      }
      log.info(
        tag,
        `Initialize application with path: ${history.location.pathname}`,
      );
      const public_routes = routes.filter((route) => route.isPublic);
      const isPublicRoute =
        public_routes.findIndex((route) =>
          history.location.pathname.startsWith(route),
        ) > -1;

      if (!isPublicRoute) {
        // logic xử lý authen
      }
    };
    log.trace(tag, `Initialize application -> componentDidMount`);
    componentDidMount();
    return () => {
      log.trace(tag, `Exit application -> componentDidUnMount`);
      isSubscribed = false;
    };
  }, []);

  return useMemo(() => {
    return (
      <ConfigProvider locale={vi_VN}>
        <IntlProvider value={{ intl: intlProvider_vi_VN, valueTypeMap: {} }}>
          <GAListener>
            <Suspense fallback={<KTLoadingTemplate />}>
              <Switch>
                {routes.map((route, idx) => {
                  if (route.layout) {
                    return (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={(props) => (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        )}
                      />
                    );
                  }
                  return null;
                })}
              </Switch>
            </Suspense>
          </GAListener>
        </IntlProvider>
      </ConfigProvider>
    );
  }, [lang]);
};

export default App;
