import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Search from "antd/es/input/Search";
import { Header } from "antd/es/layout/layout";
import React from "react";
import { Link } from "react-router-dom";

export default function KelolaAdminRT() {
  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <div className="flex flex-row  justify-between items-center">
          <Breadcrumb
            className="w-full"
            items={[
              { title: "Admin" },
              { title: <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link> },
            ]}
          />
          <Search
            // onChange={handleChange}
            placeholder="Cari penduduk ..."
            // onSearch={handleSearch}
            // enterButton
          />
        </div>

        <Button
          // onClick={showModal}
          className="flex flex-row   cursor-pointer bg-blusky text-white items-center "
          type="default"
        >
          <Link className="pr-1" to={"/Dashboard/Tambah-Penduduk"}>
            Tambah Admin Baru
          </Link>
          <PlusOutlined />
        </Button>
      </Header>
    </div>
  );
}
