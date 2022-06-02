import PropTypes from 'prop-types';
import qs from 'qs';
import React, { useMemo, useEffect } from 'react';
import { Layout } from 'antd';
import log from './KTListLayoutLogger';
import {
  KTListLayoutType,
  KTSearchPanel,
  KTListContent,
  KTListHeader,
  KTListSider,
} from 'core/ui/common/templates/list/KTListControls';
import useKTListLayout from './KTListLayoutDomain';
import cssListLayout from 'core/ui/common/templates/list/KTListLayout.module.less';
import { get } from 'lodash';
import { useHistory, useLocation } from 'react-router';

const tag = 'KTListLayout';
const { Header, Content } = Layout;

const KTListLayout = ({
  name = '',
  syncToUrl = false,
  hasQuery,
  children,
  defaultSearchCollapsed = undefined,
}) => {
  const history = useHistory();
  const location = useLocation();
  const [listLayoutState, domain] = useKTListLayout();

  const key = name ? `kt.layout.${name}` : '';

  useEffect(() => {
    if (key) {
      const searchQueries = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      log.info(tag, `key changed`);
      domain.initLayoutForContext(key, {
        searchQueries,
        searchCollapsed: defaultSearchCollapsed,
      });
      log.trace(tag, 'domain init success', key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, domain]);

  useEffect(() => {
    if (syncToUrl) {
      const searchQueries = get(listLayoutState, 'searchQueries', {});
      if (Object.keys(searchQueries).length) {
        const search = qs.stringify(searchQueries, {
          encode: false,
        });
        history.replace({
          pathname: location.pathname,
          search,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncToUrl, listLayoutState]);

  const headerPanel = useMemo(() => {
    return children.find(
      (child) => child.props.__typeof == KTListLayoutType.HeaderPanel,
    );
  }, [children]);

  const contentPanel = useMemo(() => {
    return children.find(
      (child) => child.props.__typeof == KTListLayoutType.ContentPanel,
    );
  }, [children]);
  const searchPanel = useMemo(() => {
    return children.find(
      (child) => child.props.__typeof == KTListLayoutType.SearchPanel,
    );
  }, [children]);

  return useMemo(() => {
    const headerClassName = `${cssListLayout['site-layout-background']} ${cssListLayout['header']}`;
    const contentClassName = [
      cssListLayout['site-layout-background'],
      cssListLayout['content'],
      hasQuery ? cssListLayout['has-query'] : '',
    ];

    const layoutClassName = [
      cssListLayout['list-layout'],
      hasQuery ? 'KTListLayout-has-query' : 'KTListLayout-no-query',
      listLayoutState && listLayoutState.searchCollapsed
        ? 'KTListLayout-search-collapsed'
        : 'KTListLayout-search-expanded',
    ];

    log.trace(tag, 'render: KTListLayout');
    return (
      <Layout id="KTListLayout" className={layoutClassName}>
        <Layout className={cssListLayout['site-layout-background']}>
          <Header className={headerClassName}>{headerPanel}</Header>
          <Content id="KTListLayout-content" className={contentClassName}>
            {contentPanel}
          </Content>
        </Layout>
        <KTListSider>{searchPanel}</KTListSider>
      </Layout>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerPanel, contentPanel, searchPanel, hasQuery]);
};

KTListLayout.Header = KTListHeader;

KTListLayout.Search = KTSearchPanel;

KTListLayout.Content = KTListContent;

KTListLayout.propTypes = {
  name: PropTypes.string,
  children: PropTypes.array,
  syncToUrl: PropTypes.bool,
};

KTListLayout.defaultProps = {
  name: '',
  children: [],
  syncToUrl: false,
};

export { KTListLayout };
