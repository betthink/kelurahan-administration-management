import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  SettingOutlined,
  SmileOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Space } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../app/feature/user/userSlice";

const CmsLayouts = () => {
  const [openLogOut, setopenLogOut] = useState(false);
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
      getItem(<Link to={item.link}>{item.title}</Link>, `${i}`, <item.icon />, [
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  const handleOpenLogOut = () => {
    console.log("cliked");
    setopenLogOut((prev) => !prev);
  };

  // state
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {}, []);
  return (
    <>
      <Layout className="w-full ">
        <Header
          className="flex min-h-[3rem] py-6 bg-darkpurp justify-between w-full items-center text-white sticky z-10
       "
        >
          <div className="demo-logo-vertical">
            <SmileOutlined style={{ fontSize: "30px" }} />
          </div>
          <div className="flex  items-center gap-6 relative">
            <Button
              onClick={handleOpenLogOut}
              className="border-none flex items-center justify-center"
            >
              <Avatar shape="square" size={36} icon={<UserOutlined />} />
            </Button>

            <span className="flex gap-3 justify-center  ">
              <p>{user?.username} </p>
              <p>{user?.role} </p>
            </span>
          </div>
        </Header>
        <Layout className="w-full bg-purp flex">
          <Sider
            className="ant-menu transition-all sticky"
            theme="dark"
            style={{
              backgroundColor: "#6a58ba",
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
              width: collapsed ? "80px" : "300px",
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              activeBarBorderWidth
              // theme="dark"
              defaultSelectedKeys={["0"]}
              mode="inline"
              items={menuItems}
            />
          </Sider>
          <Layout className={` site-layout relative `}>
            <Content
              className="site-layout "
              style={{
                margin: "0 16px",
              }}
            >
              {openLogOut ? (
                <button
                  className="top-20 right-2 absolute p-2 bg-darkpurp rounded text-white text-lg border-none  cursor-pointer"
                  onClick={handleLogOut}
                >
                  Log out
                </button>
              ) : null}
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
      </Layout>
    </>
  );
};

export default CmsLayouts;
