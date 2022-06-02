import React from 'react';
import { Divider, PageHeader, Tabs } from 'antd';
import { KTGuideButtons } from 'core/ui/common/molecules/KTGuideButtons';
import cssStyle from './KTPageHeader.module.less';
import { KTHeading } from '../atoms/typo/heading';
import KTTagQuery from '../atoms/tag/kt-tag-query';
import { useHistory, useLocation } from 'react-router';
const { TabPane } = Tabs;

export const KTPageHeader = React.memo(
  ({
    title,
    children,
    query,
    onQueryClose,
    tabs,
    tabIndex,
    onTabChange,
    guides = {},
    subTitle,
    onBack = false,
  }) => {
    const history = useHistory();
    const location = useLocation();

    if (!onBack) {
      onBack = false;
    }

    const footer =
      tabs || query ? (
        <>
          {tabs && (
            <>
              <Tabs
                className={cssStyle['tabs']}
                defaultActiveKey={tabIndex}
                onChange={(activeKey) => {
                  history.replace({
                    pathname: location.pathname,
                    search: null,
                  });
                  onTabChange(activeKey);
                }}
              >
                {tabs.map((tabItem) => (
                  <TabPane {...tabItem} />
                ))}
              </Tabs>
              <Divider className={cssStyle.divider} />
            </>
          )}
          {query && (
            <KTTagQuery
              id="KTListLayout_query"
              onClose={onQueryClose}
              className={[cssStyle['tags'], tabs ? cssStyle['has-tabs'] : '']}
              query={query}
            />
          )}
        </>
      ) : null;

    return (
      <PageHeader
        className={[cssStyle['page-header'], tabs ? 'has-tabs' : '']}
        onBack={onBack}
        title={
          <KTHeading simple level={5}>
            {title}
          </KTHeading>
        }
        subTitle={<KTGuideButtons {...guides} subTitle={subTitle} />}
        extra={children}
        footer={footer}
      />
    );
  },
);
