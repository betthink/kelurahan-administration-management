import { Breadcrumb, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

const InformasiPosyandPage = () => {
  return (
    <div className="mx-20 h-screen">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/kelolaPosyandu"}>Kelola Posyandu</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className=" items-center flex flex-row justify-around">
        <Space className="bg-purp p-6 text-white">
          <Link to={"/Dashboard/KelolaInformasiVaksinSPage"}>
            Infromasi Pengguna posyandu
          </Link>
        </Space>
        <Space className="bg-purp p-6 text-white">
          <Link to={"/Dashboard/Informasi-vaksin"}>
            Infromasi vaksin Vaksin
          </Link>
        </Space>
      </Content>
    </div>
  );
};

export default InformasiPosyandPage;
