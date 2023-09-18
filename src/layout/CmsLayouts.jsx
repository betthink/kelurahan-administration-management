import React, { useState } from "react";
import {  Link,  Outlet } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Footer } from "antd/es/layout/layout";

const CmsLayouts = () => {
  const { Sider, Content } = Layout;
  const getItem = (label, key, icon, path) => {
    return {
      label,
      key,
      icon,
      path,
    };
  };
  const menuItems = [
    getItem(
      <Link to={"/Dashboard/Landingpage"}>Dashboard</Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem(
      <Link to={"/Dashboard/Kelola-Penduduk"}>Kelola Penduduk</Link>,
      "2",
      <TeamOutlined />
    ),
    getItem(
      <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link>,
      "3",
      <DesktopOutlined />
    ),
    getItem(
      <Link to={"/Dashboard/kelola-Surat"}>Kelola Surat</Link>,
      "sub1",
      <UserOutlined />,
      [getItem("Tom", "4"), getItem("Bill", "4")]
    ),
    getItem(
      <Link to={"/Dashboard/Informasi-PosyandPage"}>Kelola Posyandu</Link>,
      "sub2",
      <TeamOutlined />,
      [getItem("Team 1", "6"), getItem("Team 2", "8")]
    ),
  ];
  // state
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        style={{
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
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout
        className={` site-layout`}
        style={
          !collapsed
            ? { marginLeft: "200px", transition: "margin-left 0.5s ease" } // Tambahkan transisi ketika tidak collapsed
            : { transition: "margin-left 0.2s ease", marginLeft: "0" }
        }
      >
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
