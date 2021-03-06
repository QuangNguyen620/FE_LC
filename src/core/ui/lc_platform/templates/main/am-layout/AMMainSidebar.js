import React, { useMemo, useState } from 'react';
import { Menu, Button, Divider, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  SettingOutlined,
  ContainerOutlined,
  LogoutOutlined,
  FireOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BlockOutlined,
  BellOutlined,
  DiffOutlined,
  FolderOpenOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import cssLayout from '../LCMainLayout.module.less';
import '../../../../../../assets/less/LC-common.less';
import { useTranslation } from 'react-i18next';
import log from '../LCMainLayoutLogger';
import useMultiLanguage from 'core/hooks/UseMultiLanguage';
import { useA00Domain } from '../domains/CommonDomain_AM';
const tag = 'AMMainSidebar';
const { SubMenu } = Menu;
const AMMainSidebar = (props) => {
  const [, loginDomain] = useA00Domain();
  const { t } = useTranslation();
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
              icon={<UserOutlined />}
              title={t('amsidebar.menu.quan_ly_nguoi_dung')}
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <SubMenu
                  className="sub-menu-item"
                  key="sub1"
                  title={t('amsidebar.menu.quan_ly_nguoi_dung_doanh_nghiep')}
                >
                  <Menu.Item key="sub1.2">
                    <Link to="/home/corporate-customer">
                      {t('amsidebar.menu.quan_ly_khach_hang_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sub1.3">
                    <Link to="/home/corporate-user">
                      {t('amsidebar.menu.quan_ly_nguoi_dung_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sub1.4">
                    <Link to="/home/corporate-account">
                      {t('amsidebar.menu.quan_ly_tai_khoan_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="sub2"
                  title={t('amsidebar.menu.quan_ly_nguoi_dung_ngan_hang')}
                >
                  <Menu.Item key="sub2.1">
                    <Link to="/home/bank-fpt-admin-manage-user">
                      {t('amsidebar.menu.admin_ngan_hang')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="sub2.2">
                    <Link to=""> {t('amsidebar.menu.user_ngan_hang')}</Link>
                  </Menu.Item>
                </SubMenu>
                <Menu.Item key="sub3">
                  <Link to="/home/bank-fpt-admin-manage-user">
                    {t('amsidebar.menu.fpt_quan_tri')}
                  </Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root2"
              icon={<UsergroupAddOutlined />}
              title={t('amsidebar.menu.quan_ly_nhom_nguoi_dung')}
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root2-sub1">
                  <Link to="/home/admin-corporate-group">
                    {t('amsidebar.menu.nhom_nguoi_dung_doanh_nghiep')}
                  </Link>
                </Menu.Item>

                <Menu.Item key="root2-sub2">
                  <Link to="/home/bank-fpt-admin-manage">
                    {t('amsidebar.menu.nhom_nguoi_dung_ngan_hang')}
                  </Link>
                </Menu.Item>
                <Menu.Item key="root2-sub3">
                  <Link to="/home/bank-fpt-admin-manage">
                    {t('amsidebar.menu.mhom_nguoi_dung_fpt_quan_tri')}
                  </Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root3"
              icon={<BlockOutlined />}
              title={t('amsidebar.menu.quan_ly_dien_gui_nhan')}
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root3-sub1">
                  <Link to="">{t('amsidebar.menu.bieu_mau_dien')}</Link>
                </Menu.Item>

                <Menu.Item key="root3-sub2">
                  <Link to="">{t('amsidebar.menu.bao_cao_dien')}</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root4"
              icon={<BellOutlined />}
              title={t('amsidebar.menu.quan_ly_thong_bao')}
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root4-sub1">
                  <Link to="">{t('amsidebar.menu.bieu_mau_thong_bao')}</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root5"
              icon={<DiffOutlined />}
              title={t('amsidebar.menu.quan_ly_goi_dich_vu')}
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
                  title="Qu???n L?? D???ch V??? Ng??n H??ng"
                >
                  <Menu.Item key="root5-sub1.1">
                    <Link to="">
                      {t('amsidebar.menu.quan_ly_xep_hang_ngan_hang')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="root5-sub1.2">
                    <Link to="/home/fee-bank-manage">
                      {t('amsidebar.menu.danh_muc_loai_phi_ngan_hang')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="root5-sub1.3">
                    <Link to="/home/fee-bank-rule">
                      {t('amsidebar.menu.quy_tac_tinh_phi_ngan_hang')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="root5-sub1.4">
                    <Link to="">
                      {t('amsidebar.menu.quan_ly_thu_phi_ngan_hang')}
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  className="sub-menu-item"
                  key="root5-sub2"
                  title="Qu???n L?? D???ch V??? Doanh Nghi???p"
                >
                  <Menu.Item key="root5-sub2.1">
                    <Link to="">
                      {t('amsidebar.menu.danh_muc_loai_phi_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="root5-sub2.2">
                    <Link to="">
                      {t('amsidebar.menu.quy_tac_tinh_phi_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="root5-sub2.3">
                    <Link to="">
                      {t('amsidebar.menu.quan_ly_thu_phi_doanh_nghiep')}
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root6"
              icon={<ContainerOutlined />}
              title="B??o C??o"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root6-sub1">
                  <Link to="">{t('amsidebar.menu.B??o c??o ngu???i d??ng')}</Link>
                </Menu.Item>

                <Menu.Item key="root6-sub2">
                  <Link to="">B??o C??o H???p ?????ng ??i???n T???</Link>
                </Menu.Item>
                <Menu.Item key="root6-sub3">
                  <Link to="">B??o C??o LC</Link>
                </Menu.Item>
                <SubMenu
                  className="sub-menu-item"
                  key="root6-sub4"
                  title="B??o C??o C??ng N???"
                >
                  <Menu.Item key="root6-sub4.1">
                    <Link to="">C??ng N??? Th??nh Vi??n</Link>
                  </Menu.Item>
                  <Menu.Item key="root6-sub4.2">
                    <Link to="">C??ng N??? Nh?? Cung C???p</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root7"
              icon={<FireOutlined />}
              title="Qu???n Tr??? R???i Ro"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root7-sub1">
                  <Link to="">Thi???t L???p Ti??u Ch?? AML</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root8"
              icon={<FolderOpenOutlined />}
              title="Danh M???c D??? Li???u Chung"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root8-sub1">
                  <Link to="">{t('amsidebar.menu.quan_ly_bieu_mau')}</Link>
                </Menu.Item>
                <Menu.Item key="root8-sub2">
                  <Link to="">{t('amsidebar.menu.quan_ly_chi_nhanh')}</Link>
                </Menu.Item>
                <Menu.Item key="root8-sub3">
                  <Link to="">{t('amsidebar.menu.quan_ly_phong_ban')}</Link>
                </Menu.Item>
                <Menu.Item key="root8-sub4">
                  <Link to="">
                    {t('amsidebar.menu.danh_muc_loai_chung_tu')}
                  </Link>
                </Menu.Item>
                <Menu.Item key="root8-sub5">
                  <Link to="/home/fee-transaction">
                    {t('amsidebar.menu.danh_muc_loai_giao_dich')}
                  </Link>
                </Menu.Item>
                <Menu.Item key="root8-sub6">
                  <Link to="">{t('amsidebar.menu.phan_loai_lc')}</Link>
                </Menu.Item>
                <Menu.Item key="root8-sub7">
                  <Link to="">{t('amsidebar.menu.quan_ly_thong_tin_fpt')}</Link>
                </Menu.Item>
                <Menu.Item key="root8-sub8">
                  <Link to="">
                    {t('amsidebar.menu.dinh_nghia_ma_loi_he_thong')}
                  </Link>
                </Menu.Item>
                <Menu.Item key="root8-sub13">
                  <Link to="/home/fee-transaction">
                    {t('amsidebar.menu.danh_muc_loai_giao_dich_tinh_phi')}
                  </Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root9"
              icon={<MenuOutlined />}
              title="Qu???n L?? Job"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root9-sub1">
                  <Link to="">Danh S??ch Job</Link>
                </Menu.Item>
                <Menu.Item key="root9-sub2">
                  <Link to="">B??o C??o Job</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>

            <SubMenu
              key="root10"
              icon={<SettingOutlined />}
              title="Qu???n Tr??? H??? Th???ng"
              className="root-menu-item"
            >
              <Menu
                onClick={handleClick}
                style={{ width: '100%' }}
                mode="vertical"
              >
                <Menu.Item key="root10-sub1">
                  <Link to="">C???u H??nh SLA</Link>
                </Menu.Item>
                <Menu.Item key="root10-sub2">
                  <Link to="">Ph?? Duy???t T??c V???</Link>
                </Menu.Item>
                <Menu.Item key="root10-sub2">
                  <Link to="">Qu???n L?? C???u H??nh H??? Th???ng</Link>
                </Menu.Item>
                <Menu.Item key="root10-sub2">
                  <Link to="">Qu???n L?? T??? Ch???c K???t N???i</Link>
                </Menu.Item>
                <Menu.Item key="root10-sub2">
                  <Link to="">Tin T???c V?? ??i???u Kho???n ??i???u Ki???n</Link>
                </Menu.Item>
              </Menu>
            </SubMenu>
          </Menu>
        </div>
        <div className="sidebar-footer">
          <Divider
            style={{
              marginBottom: '15px',
            }}
          />

          <Button
            icon={<LogoutOutlined />}
            className={'logout-btn'}
            onClick={(e) => loginDomain.logoutHandler()}
          >
            ????ng xu???t
          </Button>
        </div>
      </div>
    );
  }, [language, menuLanguageVisible]);
};

export default AMMainSidebar;
