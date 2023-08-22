import React, { useState } from "react";
import { Breadcrumb, theme, Space, Table, Tag, Switch, Button } from "antd";
import { Link } from "react-router-dom";
function KelolaPenduduk() {
  const columns = [
    {
      title: "Id",
      width: 50,
      dataIndex: "Id",
      key: "Id",
      fixed: "left",
    },
    {
      title: "Nama",
      width: 100,
      dataIndex: "name",
      key: "name",
    },
    {
      title: "NIK",
      width: 100,
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Alamat",
      dataIndex: "address",
      key: "1",
      width: 150,
    },
    {
      title: "Nomor Telp",
      dataIndex: "address",
      key: "2",
      width: 150,
    },
    {
      title: "NO. KK",
      dataIndex: "address",
      key: "3",
      width: 150,
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "address",
      key: "4",
      width: 150,
    },
    {
      title: "Darah",
      dataIndex: "address",
      key: "5",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "6",
      width: 100,
    },
    {
      title: "Status Penduduk",
      dataIndex: "address",
      key: "7",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: () => (
        <div className="flex text-white gap-3">
          <Button className="bg-manggo">
            <Link>Edit</Link>
          </Button>
          <Button className="bg-darksky text-white " type="default">
            <Link className="">Hapus</Link>
          </Button>
       
        
        </div>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      Id: i + 1,
      address: `London Park no. ${i}`,
    });
  }

  return (
    <div>
      {/* path */}
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          { title: "Admin" },
          { title: <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link> },
        ]}
      ></Breadcrumb>
      <div className="p-6 bg-white min-h-[460px]">
        <Space>
          <Button
            className="flex flex-row  self-end mb-6 cursor-pointer hover:bg-blusky hover:text-white"
            type="default"
          >
            <Link to={"/TambahPenduduk"}>Tambah</Link>
          </Button>
        </Space>
        {/* tabel */}
        <Table
          columns={columns}
          dataSource={data}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          summary={() => <Table.Summary fixed={"top" ? "top" : "bottom"} />}
          sticky
        />
      </div>
    </div>
  );
}

export default KelolaPenduduk;
