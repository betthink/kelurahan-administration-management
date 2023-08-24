import React, { useState } from "react";
import { Breadcrumb, theme, Modal, Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import TambahPenduduk from "./TambahPenduduk";
import { Header, Content } from "antd/es/layout/layout";
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
  // modal atribute
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-20">
      {/* path */}
      <Header
        style={{
          backgroundColor: "white",
          margin: "16px 0",
          position: "sticky",
          top: 20,
          zIndex: 99,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumb
        
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link> },
          ]}
        ></Breadcrumb>
        <Button
          // onClick={showModal}
          className="flex flex-row   cursor-pointer bg-blusky text-white items-center "
          type="default"
        >
          <Link className="pr-1" to={"/TambahPenduduk"}>
            Tambah Penduduk
          </Link>
          <PlusOutlined />
        </Button>
      </Header>
      <Content style={{position: 'sticky', top: 400}} className="p-6 bg-white min-h-[460px]">
        {/* modall */}

        <Modal
          width={1600}
          bodyStyle={{ height: 700 }}
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <TambahPenduduk />
        </Modal>

        {/* tabel */}
        <Table
          columns={columns}
          dataSource={data}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
      </Content>
    </div>
  );
}

export default KelolaPenduduk;
