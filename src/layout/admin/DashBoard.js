import React, { useState } from "react";
import {
  // useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import KelolaPenduduk from "./Pages/KelolaPenduduk";
import KelolaIPL from "./Pages/KelolaIPL";
import KelolaPermohonanSurat from "./Pages/KelolaPermohonanSurat";
import KelolaInformasiPosyandu from "./Pages/KelolaInformasiPosyandu";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import TambahPenduduk from "./Pages/TambahPenduduk";
import VerifikasiPembayaran from "./Pages/VerifikasiPembayaran";

function DashBoard() {
  const { Header, Footer, Sider, Content } = Layout;
  const getItem = (label, key, icon, path) => {
    return {
      label,
      key,
      icon,
      path,
    };
  };

  const menuItems = [
    getItem(<Link to={"/"}>Dashboard</Link>, "1", <PieChartOutlined />),
    getItem(
      <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link>,
      "10",
      <TeamOutlined />
    ),
    getItem(
      <Link to={"/KelolaIPL"}>Kelola IPL</Link>,
      "2",
      <DesktopOutlined />
    ),
    getItem(
      <Link to={"/KelolaSurat"}>Kelola Surat</Link>,
      "sub1",
      <UserOutlined />,
      [getItem("Tom", "3"), getItem("Bill", "4")]
    ),
    getItem(
      <Link to={"/KelolaPosyandu"}>Kelola Posyandu</Link>,
      "sub2",
      <TeamOutlined />,
      [getItem("Team 1", "6"), getItem("Team 2", "8")]
    ),
  ];
  // all path ========================
  const rootPath = [
    {
      path: "/",
      exact: true,
      main: () => <div></div>,
    },
    {
      path: "/KelolaPenduduk",

      main: () => <KelolaPenduduk />,
    },
    {
      path: "/KelolaIPL",
      main: () => <KelolaIPL />,
    },
    {
      path: "/kelolaSurat",
      main: () => <KelolaPermohonanSurat />,
    },
    {
      path: "/kelolaPosyandu",
      main: () => <KelolaInformasiPosyandu />,
    },
    {
      path: "/TambahPenduduk",
      main: () => <TambahPenduduk />,
    },
    {
      path: "/VerifikasiPembayaran",
      main: () => <VerifikasiPembayaran />,
    },
  ];
  // state
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Router>
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
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menuItems}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Routes>
              {rootPath.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  // exact={route.exact}
                  element={<route.main />}
                />
              ))}
            </Routes>
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
    </Router>
  );
}

export default DashBoard;
