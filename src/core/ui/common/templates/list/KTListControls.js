import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo } from 'react';
import { Layout } from 'antd';
import { ArrowRightOutlined, SearchOutlined } from '@ant-design/icons';
import { KTButton } from 'core/ui/common/atoms/button';
import { KTPageHeader } from 'core/ui/common/organisms/KTPageHeader';
import useKTListLayout from './KTListLayoutDomain';
import cssListLayout from 'core/ui/common/templates/list/KTListLayout.module.less';
import log from './KTListLayoutLogger';
import { useTranslation } from 'react-i18next';
const tag = 'KTListControls'; // tên file
const { Sider } = Layout;

export const KTToggleSearchButton = () => {
  const { t } = useTranslation();
  const [listLayout, domain] = useKTListLayout();

  const toggleSearch = useCallback(() => {
    if (listLayout) {
      domain.toggleSearch();
    }
  }, [listLayout, domain]);

  return useMemo(() => {
    log.trace(tag, 'render: KTToggleSearchButton');
    const searchCollapsed = listLayout?.searchCollapsed || false;
    return (
      <KTButton type="secondary" onClick={toggleSearch}>
        {searchCollapsed
          ? t('base.actions.search')
          : t('base.actions.collapseSearch')}
        {searchCollapsed ? <SearchOutlined /> : <ArrowRightOutlined />}
      </KTButton>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listLayout?.searchCollapsed, toggleSearch]);
};

export const KTListLayoutType = Object.freeze({
  SearchPanel: 'KTListSearch',
  ContentPanel: 'KTListContent',
  HeaderPanel: 'KTListHeader',
});

export const KTListHeader = (props) => {
  log.trace(tag, 'render: KTListHeader');
  return (
    <KTPageHeader {...props}>
      {props.children}
      {(!props.hasOwnProperty('showSearch') || props.showSearch == true) && (
        <KTToggleSearchButton />
      )}
    </KTPageHeader>
  );
};

KTListHeader.propTypes = {
  __typeof: PropTypes.string,
};
KTListHeader.defaultProps = {
  __typeof: KTListLayoutType.HeaderPanel,
};

export const KTSearchPanel = (props) => {
  log.trace(tag, 'render: KTSearchPanel');
  return <Fragment>{props.children}</Fragment>;
};

KTSearchPanel.propTypes = {
  __typeof: PropTypes.string,
};
KTSearchPanel.defaultProps = {
  __typeof: KTListLayoutType.SearchPanel,
};

export const KTListContent = (props) => {
  log.trace(tag, 'render: KTListContent');
  return <Fragment>{props.children}</Fragment>;
};

KTListContent.propTypes = {
  __typeof: PropTypes.string,
};
KTListContent.defaultProps = {
  __typeof: KTListLayoutType.ContentPanel,
};

export const KTListSider = (props) => {
  const listLayout = useKTListLayout()[0];
  return useMemo(() => {
    const searchCollapsed = listLayout ? listLayout.searchCollapsed : true;
    const className = `${cssListLayout['sider']} ${
      searchCollapsed ? cssListLayout['sider-collapsed'] : ''
    }`;

    log.trace(tag, 'render: KTListSider -> ' + searchCollapsed);
    return (
      <Sider
        collapsed={searchCollapsed}
        collapsible={true}
        theme={'light'}
        trigger={null}
        width={256}
        collapsedWidth={0}
        className={className}
        style={{
          overflow: 'auto',
          height: 'calc(100vh - 112px)',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
      >
        {props.children}
      </Sider>
    );
  }, [listLayout, props.children]);
};

// export { KTListHeader, KTListSider, KTListContent, KTSearchPanel, KTListLayoutType };
