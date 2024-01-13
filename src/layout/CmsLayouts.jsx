import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  DesktopOutlined,
  DownOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { PiBookThin } from "react-icons/pi";
import { Avatar, Button, Dropdown, Layout, Menu, Space } from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../app/feature/user/userSlice";

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
      title: "Kelola penduduk",
      icon: TeamOutlined,
    },
    {
      link: "/Dashboard/Kelola-IPL",
      title: "Kelola IPL",
      icon: DesktopOutlined,
    },
    {
      link: "/Dashboard/kelola-Surat",
      title: "Kelola surat",
      icon: UserOutlined,
    },
    {
      link: "/Dashboard/Informasi-PosyandPage",
      title: "Kelola posyandu",
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
  // state
  const [collapsed, setCollapsed] = useState(false);
  const items = [
   
    {
      key: "3",
      danger: true,
      label: (
        <a onClick={handleLogOut}
        >
         Log out
        </a>
      ),
    },
   
  ];
  useEffect(() => {}, []);
  return (
    <>
      <Layout className="w-full ">
        <Header
          className="flex min-h-[3rem] py-6 bg-secondary justify-between w-full items-center text-four sticky z-10
       "
        >
          {/* logo */}
          <div className="flex gap-2 items-center ">
            <PiBookThin className="text-third" size={30} />
            <span className="text-third font-bold text-3xl ">Kelurahan</span>
          </div>
          <Dropdown
            trigger={["click"]}
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar
                  className="bg-manggo  align-middle"
                  size="large"
                >
                 <UserOutlined style={{ fontSize: '1.2rem' }}/>
                </Avatar>
                <span className="text-manggo font-semibold capitalize ">{user?.username}</span>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Layout className="w-full bg-secondary flex">
          <Sider
            className="ant-menu transition-all sticky"
            theme="light"
            style={{
              backgroundColor: "#FCFCFC",
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
              width: collapsed ? "80px" : "350px",
            }}
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
            
              defaultSelectedKeys={["0"]}
              mode="inline"
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Content
              className="site-layout "
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
              ©2023 Created by Ade
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CmsLayouts;
