import { Breadcrumb } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import { Link } from 'react-router-dom';

export default function KelolaImunisasi() {
  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            {
              title: (
                <Link to={"/KelolaImunisasi"}>Kelola Imunisasi</Link>
              ),
            },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
    </div>
  );
}
