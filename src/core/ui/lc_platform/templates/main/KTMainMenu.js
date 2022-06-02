import React, { useMemo } from 'react';
import { Layout, Space } from 'antd';

import useConfig from 'core/modules/config/domain/ConfigDomain';
import { KTBodyText } from 'core/ui/common/atoms/typo/text/KTBodyText';
import cssStyle from './KTMainLayout.module.css';
import KTMainMenuItems from './KTMainMenuItems';
import KTLogo from 'core/ui/common/atoms/icon/KTLogo';

const { Sider } = Layout;
export const KTMainMenu = ({
  loading,
  menuCollapsed,
  subscription,
  items,
  ...others
}) => {
  const [config, configDomain] = useConfig();

  return useMemo(() => {
    let subscriptionName = 'Phiên bản test';
    let theme = 'light';
    let logo = '';

    let icon = '';

    const mode = menuCollapsed ? 'icon' : 'logo';

    return (
      <Sider
        width={250}
        theme={theme}
        breakpoint="xxl"
        trigger={null}
        collapsible
        collapsedWidth={56}
        collapsed={menuCollapsed}
        className={cssStyle['main-menu']}
        style={{ userSelect: 'none' }}
      >
        <KTLogo
          theme={theme}
          mode={mode}
          logo={logo}
          icon={icon}
          className={cssStyle['menu-logo']}
        />
        <div
          style={{
            height: `calc(100vh - ${menuCollapsed ? 128 : 205}px)`,
            overflow: 'auto',
            margin: '12px -15px 0px -15px',
          }}
        >
          <KTMainMenuItems
            menus={items}
            theme={theme}
            collapsed={menuCollapsed}
          />
        </div>
        <div>
          <Space
            // direction="vertical"
            size={16}
            style={{
              width: menuCollapsed ? 'auto' : 219,
            }}
          >
            {!menuCollapsed && (
              <KTBodyText theme={theme} size={4}>
                {`Bạn đang ở ${subscriptionName}`}
              </KTBodyText>
            )}
            {!menuCollapsed && (
              <KTBodyText theme={theme} size={6}>
                Khaothi.online © 2020.
                <br />
                Copyright by FPT Information System
              </KTBodyText>
            )}
            <div>&nbsp;</div>
          </Space>
        </div>
      </Sider>
    );
  }, [items, menuCollapsed, subscription, config, configDomain]);
};

// export default KTMainMenu;
