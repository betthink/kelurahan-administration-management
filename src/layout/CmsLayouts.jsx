import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";

const CmsLayouts = () => {
  const { Sider, Content } = Layout;
  const user = useSelector((state) => state.userReducer.value);
  const getItem = (label, key, icon, path) => {
    return {
      label,
      key,
      icon,
      path,
    };
  };
  const atributeMenu = [
    {
      link: "/Dashboard/Landingpage",
      title: "Dashboard",
      icon: PieChartOutlined,
    },
    {
      link: "/Dashboard/Kelola-Penduduk",
      title: "Kelola Penduduk",
      icon: TeamOutlined,
    },
    {
      link: "/Dashboard/Kelola-IPL",
      title: "Kelola IPL",
      icon: DesktopOutlined,
    },
    {
      link: "/Dashboard/kelola-Surat",
      title: "kelola Surat",
      icon: UserOutlined,
    },
    {
      link: "/Dashboard/Informasi-PosyandPage",
      title: "kelola PosyandPage",
      icon: TeamOutlined,
    },
  ];
  const menuItems = [
    ...atributeMenu.map((item, i) =>
      getItem(<Link to={item.link}>{item.title}</Link>, i + 1, <item.icon />, [
        getItem(i, i),
        getItem(i, i),
      ])
    ),
    user.role === "super_admin"
      ? getItem(
          <Link to={"/Dashboard/Kelola-Admin"}>Kelola Admin</Link>,
          "sub3",
          <TeamOutlined />,
          [getItem("a", "7"), getItem("b", "9")]
        )
      : null,
  ];

  const onClick = (e) => {
    console.log("click", e);
  };
  // state
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        className="ant-menu "
        theme="dark"
        style={{
          // backgroundColor: "#475be8",
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          width: collapsed ? "80px" : "200px",
          transition: "width 2s ease",
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["0"]}
          // mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout
        className={` site-layout`}
        style={
          !collapsed
            ? { marginLeft: "200px", transition: "margin-left 0.5s ease" }
            : { transition: "margin-left 0.2s ease", marginLeft: "0" }
        }
      >
        <div className="w-full px-4 py-6 bg-white flex justify-end">
          <div className="flex items-center gap-4">
            <span>{user?.username}</span>

            <Avatar
            className="cursor-pointer"
              size={40}
              style={{
                backgroundColor: "#475be8",
              }}
              icon={<UserAddOutlined />}
            />
          </div>
        </div>
        <Content
          className={` site-layout `}
          style={{
            margin: "0 16px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Mantap corp 😁 ©2023 Created by Robetsn
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CmsLayouts;
