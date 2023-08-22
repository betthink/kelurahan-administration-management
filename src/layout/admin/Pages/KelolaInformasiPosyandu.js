import React from "react";
import { Breadcrumb , theme} from "antd";
import { Link } from "react-router-dom";
function KelolaInformasiPosyandu() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
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
      <div
        style={{
          padding: 24,
          minHeight: 460,
          background: colorBgContainer,
        }}
      >
        Bill is a cat.
      </div>
    </div>
  );
}

export default KelolaInformasiPosyandu;
