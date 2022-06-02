import React, { useMemo, useState } from 'react';
import { Menu, Button, Divider } from 'antd';
import { Link, Route } from 'react-router-dom';
import {
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
  LaptopOutlined,
  NotificationOutlined,
  CreditCardOutlined,
  PicLeftOutlined,
  FileTextOutlined,
  SearchOutlined,
  FileProtectOutlined,
  FileSearchOutlined,
  BankOutlined,
} from '@ant-design/icons';
import cssLayout from '../LCMainLayout.module.less';
import '../../../../../../assets/less/LC-common.less';
import log from '../LCMainLayoutLogger';
// import { KTLogo } from 'core/ui';
// import ic_VN from 'assets/img/brand/ic_VN.svg';
// import ic_EN from 'assets/img/brand/ic_EN.svg';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import { useA00Domain } from '../domains/CommonDomain_CM';
const tag = 'AMMainSidebar';

const { SubMenu } = Menu;

const CMMainSidebar = (props) => {
  const [selectedKey, setSelectedKey] = React.useState([]);
  const [, loginDomain] = useA00Domain();

  function handleClick(e) {
    console.log('click', e);
  }
  const language = useMultiLanguage();
  const [menuLanguageVisible, setMenuVisible] = useState(false);
  const handleVisibleChange = (flag) => {
    setMenuVisible(flag);
  };

  const menuSelectHandler = (event) => {
    console.log(event);
  };

  return useMemo(() => {
    const storybookEnabled =
      process.env.REACT_APP_STORYBOOK_ENABLE == 'true' || false;
    log.trace(tag, 'render:', storybookEnabled);

    return (
      <div id="custom-sidebar" div style={{ width: '100%', height: '100%' }}>
        <div className={cssLayout['sidebar-menu-wrapper']}>
          <Menu onClick={handleClick} mode="inline">
            <SubMenu
              key="root1"
              icon={<SettingOutlined />}
              title="Quản Trị Hệ Thống"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item
                  className="sub-menu-item"
                  key="sub1.1"
                  onClick={menuSelectHandler}
                >
                  <a>Option 1</a>
                </Menu.Item>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root2"
              icon={<LaptopOutlined />}
              title="Quản Lý Tác Vụ"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root2-sub1"
                  title="Phê Duyệt Tác Vụ"
                >
                  <Menu.Item key="root2-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root3"
              icon={<NotificationOutlined />}
              title="Thông Báo"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root3-sub1"
                  title="Phê Duyệt Tác Vụ"
                >
                  <Menu.Item key="root2-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root4"
              icon={<PicLeftOutlined />}
              title="Quản Lý Hợp Đồng Mua Bán"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root4-sub1"
                  title="Ký Hợp Đồng Mua Bán"
                >
                  <Menu.Item key="root4-sub1.1">
                    <Link to="/cm-home/contract-buyer/">Bên mua</Link>
                  </Menu.Item>
                  <Menu.Item key="root4-sub1.2">
                    <Link to="/cm-home/contract-seller/">Bên bán</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="root4-sub2"
                  title="Ký phụ lục chỉnh sửa Hợp đồng mua bán"
                >
                  <Menu.Item key="root4-sub2.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root5"
              icon={<CreditCardOutlined />}
              title="Quản Lý L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub1"
                  title="Quản Lý Draft L/C"
                >
                  <Menu.Item key="root5-sub1.1">Option 1</Menu.Item>
                </SubMenu>
                <Menu.Item key="root5-sub2">
                  <Link to="/cm-home/lc-request-manage">
                    Quản Lý Đề Nghị Phát Hành L/C
                  </Link>
                </Menu.Item>

                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub3"
                  title="Quản Lý Đề Nghị Tu Chỉnh L/C"
                >
                  <Menu.Item key="root5-sub3.1">Option 1</Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub4"
                  title="Thông Báo Báo Giá UPAS L/C"
                >
                  <Menu.Item key="root5-sub4.1">Option 1</Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub5"
                  title="Thông Báo Phát Hành L/C"
                >
                  <Menu.Item key="root5-sub5.1">Option 1</Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub6"
                  title="Thông BáoTu Chỉnh L/C"
                >
                  <Menu.Item key="root5-sub6.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root6"
              icon={<FileTextOutlined />}
              title="Quản lý Chứng từ Xuất Trình"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root6-sub1"
                  title="Option"
                >
                  <Menu.Item key="root6-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root7"
              icon={<FileSearchOutlined />}
              title="Quản lý Chứng từ Xuất Trình"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root7-sub1"
                  title="Option"
                >
                  <Menu.Item key="root7-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root8"
              icon={<FileProtectOutlined />}
              title="Truy Vấn Hóa Đơn Thuế"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root8-sub1"
                  title="Option"
                >
                  <Menu.Item key="root8-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root9"
              icon={<ProfileOutlined />}
              title="Truy Vấn Vận Đơn "
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root9-sub1"
                  title="Option"
                >
                  <Menu.Item key="root9-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root10"
              icon={<SearchOutlined />}
              title="Tra Cứu"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="root10-sub1"
                  title="Option"
                >
                  <Menu.Item key="root10-sub1.1">Option 1</Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>
            <SubMenu
              key="root11"
              icon={<BankOutlined />}
              title="Quản lý Doanh Nghiệp"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root11-sub1">
                  <Link to="/cm-home/view-corporate/">Hồ sơ doanh nghiệp</Link>
                </Menu.Item>
                <Menu.Item key="root11-sub2">
                  <Link to="/cm-home/corporate-user-manage">
                    Quản lý người dùng doanh nghiệp
                  </Link>
                </Menu.Item>
              </Menu>
            </SubMenu>
          </Menu>
        </div>
        <div>
          <Divider
            style={{
              marginBottom: '15px',
            }}
          />
          <Button
            justify="center"
            align="middle"
            type="danger"
            icon={<LogoutOutlined />}
            style={{
              width: '75%',
              marginLeft: '12%',
              marginRight: '10%',
              height: '40px',
            }}
            onClick={loginDomain.logoutHandler}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  }, [language, menuLanguageVisible]);
};

export default CMMainSidebar;
