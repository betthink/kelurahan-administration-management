// Layout untuk CMS
import React from "react";
import { Layout } from "antd";
import { Outlet, Routes } from "react-router-dom";

const { Header, Content } = Layout;

const PublicLayout = () => {
  return (
    <Layout className="h-screen bg-darkgreen ">
      <Header className=" flex flex-row justify-between text-white">
        <div className="">Logo</div>
        <div className="">Mode</div>
      </Header>
      <Content>
       
      </Content>
    </Layout>
  );
};

export default PublicLayout;
