import React, { useEffect, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { Menu } from 'antd';

const { SubMenu } = Menu;

let rootSubMenuKeys = [];

const matchingUrl = (url, currentPath) => {
  const m = matchPath(currentPath, {
    path: url,
    exact: true,
    strict: false,
  });

  return !!m;
};

const matchingOtherUrls = (otherUrls = [], currentPath) => {
  if (Array.isArray(otherUrls) && otherUrls.length) {
    const isMatch = otherUrls.find((url) => {
      return matchingUrl(url, currentPath);
    });

    return isMatch;
  }

  return false;
};

const KTMainMenuItems = ({ theme, menus, collapsed }) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [side_menus, setSideMenu] = useState([]);
  if (rootSubMenuKeys == null) {
    rootSubMenuKeys = menus
      .map((item) =>
        Array.isArray(item.children) && item.children.length > 0
          ? item.url
          : null,
      )
      .filter((item) => !!item);
  }

  useEffect(() => {
    // if (!selectedKeys.length) {
    let new_menus = [];
    menus.forEach((item) => {
      if (Array.isArray(item.children)) {
        const sub_menu_items = item.children.map((subMenu) => {
          return (
            <Menu.Item key={subMenu.url} icon={subMenu.icon}>
              <Link to={subMenu.url}>{subMenu.name}</Link>
            </Menu.Item>
          );
        });

        new_menus.push(
          <SubMenu key={item.url} icon={item.icon} title={item.name}>
            {sub_menu_items}
          </SubMenu>,
        );
        const matching = item.children.find(
          (item) =>
            item.url === window.location.pathname ||
            (item.otherUrls &&
              item.otherUrls.includes(window.location.pathname)) ||
            matchingOtherUrls(item.otherUrls, window.location.pathname),
        );
        if (matching) {
          setSelectedKeys([...[matching.url]]);
          setOpenKeys([...[item.url]]);
        }
      } else {
        new_menus.push(
          <Menu.Item key={item.url} icon={item.icon}>
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>,
        );
        if (
          item.url === window.location.pathname ||
          (item.otherUrls &&
            item.otherUrls.includes(window.location.pathname)) ||
          matchingOtherUrls(item.otherUrls, window.location.pathname)
        ) {
          setSelectedKeys([...[item.url]]);
        }
      }
    });
    setSideMenu(new_menus);

    // }
  }, [menus]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubMenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys && keys.length === 1 ? keys : [keys.pop()]);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // const onSelectItem = ({ item, key, keyPath, selectedKeys }) => {
  //   // setSelectedKeys([key]);
  //   console.log(key);
  // };

  // const side_menus = menus.map((menu) => {
  //   if (menu.children) {
  //     const sub_menu_items = menu.children.map((subMenu) => {
  //       return (
  //         <Menu.Item key={subMenu.url} icon={subMenu.icon}>
  //           <Link to={subMenu.url}>{subMenu.name}</Link>
  //         </Menu.Item>
  //       );
  //     });

  //     return (
  //       <SubMenu key={menu.url} icon={menu.icon} title={menu.name}>
  //         {sub_menu_items}
  //       </SubMenu>
  //     );
  //   }

  //   return (
  //     <Menu.Item key={menu.url} icon={menu.icon}>
  //       <Link to={menu.url}>{menu.name}</Link>
  //     </Menu.Item>
  //   );
  // });
  if (side_menus.length == 0) {
    return <></>;
  }
  if (collapsed) {
    return (
      <Menu
        key={selectedKeys.length}
        className="menu-sidebar"
        onOpenChange={onOpenChange}
        defaultSelectedKeys={selectedKeys}
        mode="inline"
        theme={theme}
      >
        {side_menus}
      </Menu>
    );
  }

  return (
    <Menu
      key={selectedKeys.length}
      className="menu-sidebar"
      mode="inline"
      onOpenChange={onOpenChange}
      defaultSelectedKeys={selectedKeys}
      openKeys={openKeys}
      theme={theme}
    >
      {side_menus}
    </Menu>
  );
};

export default KTMainMenuItems;
