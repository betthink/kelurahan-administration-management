import React from "react";
import { Breadcrumb, theme } from "antd";
import { Link } from "react-router-dom";
function KelolaInformasiPosyandu() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div className="mx-20">
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          { title: "Admin" },
          { title: <Link to={"/kelolaPosyandu"}>Kelola Posyandu</Link> },
        ]}
      >
        <Breadcrumb.Item>Admin</Breadcrumb.Item>
        <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
      </Breadcrumb>
      <div className="p-6 min-h-[800px] bg-white">Posyandu</div>
    </div>
  );
}

export default KelolaInformasiPosyandu;
