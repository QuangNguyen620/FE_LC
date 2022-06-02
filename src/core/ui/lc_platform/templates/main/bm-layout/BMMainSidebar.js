/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';
import { Menu, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';
import {
  LogoutOutlined,
  ContainerOutlined,
  EditOutlined,
  MailOutlined,
  CopyOutlined,
  LaptopOutlined,
  BookOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons';
import cssLayout from '../LCMainLayout.module.less';
import '../../../../../../assets/less/LC-common.less';
import log from '../LCMainLayoutLogger';

import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import { useA00Domain } from '../domains/CommonDomain_BM';
const tag = 'BMMainSidebar';

const { SubMenu } = Menu;

const CMMainSidebar = (props) => {
  const [, loginDomain] = useA00Domain();

  function handleClick(e) {
    console.log('click', e);
  }
  const language = useMultiLanguage();
  const [menuLanguageVisible, setMenuVisible] = useState(false);

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
              icon={<ContainerOutlined />}
              title="Phát hành L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  key="root1-sub1"
                  className="sub-menu-item"
                  title="Draft L/C"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root1-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Yêu cầu tạo Draft L/C</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root1-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Draft L/C</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root1-sub1.3"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Mẫu Draft L/C</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>
                <Menu.Item
                  className="sub-menu-item"
                  key="root1-sub2"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Đề nghị phát hành L/C</Link>
                </Menu.Item>
                <Menu.Item
                  className="sub-menu-item"
                  key="root1-sub3"
                  onClick={menuSelectHandler}
                >
                  <Link to="">L/C phát hành</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root2"
              icon={<EditOutlined />}
              title="Tu chỉnh L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  key="root2-sub1"
                  className="sub-menu-item"
                  title="Draft tu chỉnh L/C"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root2-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Yêu cầu tạo Draft tu chỉnh L/C</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root2-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Draft tu chỉnh L/C</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>
                <Menu.Item
                  className="sub-menu-item"
                  key="root2-sub2"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Đề nghị tu chỉnh L/C</Link>
                </Menu.Item>
                <Menu.Item
                  className="sub-menu-item"
                  key="root2-sub3"
                  onClick={menuSelectHandler}
                >
                  <Link to="">L/C tu chỉnh</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root3"
              icon={<MailOutlined />}
              title="Thông báo L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  key="root3-sub1"
                  className="sub-menu-item"
                  title="L/C phát hành"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Danh sách L/C nhận từ ngân hàng phát hành
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Thông báo L/C đến doanh nghiệp bên bán</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <SubMenu
                  key="root3-sub2"
                  className="sub-menu-item"
                  title="L/C tu chỉnh"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub2.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Danh sách L/C tu chỉnh nhận từ ngân hàng phát hành
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub2.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Thông báo L/C tu chỉnh đến doanh nghiệp bên bán
                      </Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root4"
              icon={<CopyOutlined />}
              title="Bộ chứng từ"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                {/* <SubMenu
                  key="root3-sub1"
                  className="sub-menu-item"
                  title="L/C phát hành"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Danh sách L/C nhận từ ngân hàng phát hành
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Thông báo L/C đến doanh nghiệp bên bán</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <SubMenu
                  key="root3-sub2"
                  className="sub-menu-item"
                  title="L/C tu chỉnh"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub2.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Danh sách L/C tu chỉnh nhận từ ngân hàng phát hành
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root3-sub2.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">
                        Thông báo L/C tu chỉnh đến doanh nghiệp bên bán
                      </Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu> */}
              </Menu>
            </SubMenu>

            <SubMenu
              key="root5"
              icon={<LaptopOutlined />}
              title="Tài trợ L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  key="root5-sub1"
                  className="sub-menu-item"
                  title="Quản lý hạn mức tài trợ"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="/bm-home/funding-limit-management-funding-bank">
                        Ngân hàng tài trợ
                      </Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="/bm-home/funding-limit-management-release-bank">
                        Ngân hàng phát hành
                      </Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <Menu.Item
                  className="sub-menu-item"
                  key="root5-sub2"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Yêu cầu tài trợ từ doanh nghiệp</Link>
                </Menu.Item>

                <SubMenu
                  key="root5-sub3"
                  className="sub-menu-item"
                  title="Đề nghị tài trợ liên ngân hàng"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub3.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng tài trợ</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub3.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng phát hành</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <Menu.Item
                  className="sub-menu-item"
                  key="root5-sub4"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Báo giá UPAS L/C cho doanh nghiệp</Link>
                </Menu.Item>

                <SubMenu
                  key="root5-sub5"
                  className="sub-menu-item"
                  title="Danh sách L/C tài trợ"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub5.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng phát hành</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub5.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng tài trợ</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <SubMenu
                  key="root5-sub6"
                  className="sub-menu-item"
                  title="Ủy quyền tài trợ"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub6.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng phát hành</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root5-sub6.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng tài trợ</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root6"
              icon={<DollarCircleOutlined />}
              title="Thanh toán L/C"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  key="root6-sub1"
                  className="sub-menu-item"
                  title="Chấp nhận thanh toán"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root6-sub1.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="#">Ngân hàng phát hành</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root6-sub1.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng xuất trình</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <SubMenu
                  key="root6-sub2"
                  className="sub-menu-item"
                  title="Yêu cầu hoàn trả"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root6-sub2.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng xuất trình</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root6-sub2.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Ngân hàng tài trợ</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>

                <Menu.Item
                  className="sub-menu-item"
                  key="root6-sub3"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Tình trạng thanh toán</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root7"
              icon={<BookOutlined />}
              title="Quản lý điện"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item
                  className="sub-menu-item"
                  key="root7-sub1"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Điện gửi</Link>
                </Menu.Item>

                <Menu.Item
                  className="sub-menu-item"
                  key="root7-sub2"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Điện nhận</Link>
                </Menu.Item>

                <SubMenu
                  key="root7-sub3"
                  className="sub-menu-item"
                  title="Báo cáo điện"
                >
                  <Menu
                    onClick={handleClick}
                    style={{ width: '100%' }}
                    mode="vertical"
                  >
                    <Menu.Item
                      className="sub-menu-item"
                      key="root7-sub3.1"
                      onClick={menuSelectHandler}
                    >
                      <Link to="#">Báo cáo tổng hợp</Link>
                    </Menu.Item>
                    <Menu.Item
                      className="sub-menu-item"
                      key="root7-sub3.2"
                      onClick={menuSelectHandler}
                    >
                      <Link to="">Báo cáo chi tiết</Link>
                    </Menu.Item>
                  </Menu>
                </SubMenu>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root8"
              icon={<BookOutlined />}
              title="Truy vấn"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item
                  className="sub-menu-item"
                  key="root8-sub1"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Vận đơn</Link>
                </Menu.Item>

                <Menu.Item
                  className="sub-menu-item"
                  key="root8-sub2"
                  onClick={menuSelectHandler}
                >
                  <Link to="">Hóa đơn thuế</Link>
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
            onClick={(_e) => {
              loginDomain.logoutHandler();
            }}
          >
            Đăng xuất
          </Button>
        </div>
      </div>
    );
  }, [language, menuLanguageVisible]);
};

export default CMMainSidebar;
