import { PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Space, Table, message as mes } from "antd";
import Search from "antd/es/input/Search";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ButtonGroup from "antd/es/button/button-group";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";

export default function KelolaAdminRT() {
  const [dataAccountAdmin, setdataAccountAdmin] = useState([]);
  const columnDataAdmin = [
    {
      title: "ID",
      key: "id_admin",
      dataIndex: "id_admin",
      width: 50,
    },
    {
      title: "Username",
      key: "username",
      dataIndex: "username",
      width: 50,
    },
    {
      title: "password",
      key: "password",
      dataIndex: "password",
      width: 50,
    },
    {
      title: "RT",
      key: "rt",
      dataIndex: "rt",
      width: 50,
    },
    {
      title: "RW",
      key: "rw",
      dataIndex: "rw",
      width: 50,
    },
    {
      title: "Waktu Registrasi",
      key: "waktu_registrasi",
      dataIndex: "waktu_registrasi",
      width: 50,
    },
    {
      title: "Action",
      key: "action",
      width: 40,
      fixed: "right",
      render: (data) => (
        <ButtonGroup className="flex gap-3">
          <Button className="bg-manggo text-white">
            <Link to="/Dashboard/Kelola-Admin/UpdateAkunAdmin" state={{ data }}>
              Edit
            </Link>
          </Button>
          <Button
            onClick={() => handleDeleteAdminById(data.id_admin)}
            className="bg-purp  text-white"
          >
            Hapus
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const handleGetDataAdmin = async () => {
    const url = `administrasikelurahan/src/api/fetchAccountAdminRT.php`;
    try {
      const res = await axiosInstance.get(url);
      const { status, data } = res;
      if (status === 200) {
        setdataAccountAdmin(
          data.map((item, index) => {
            return { ...item, key: index.toString() };
          })
        );
      }
    } catch (error) {}
  };
  const handleDeleteAdminById = async (id) => {
    try {
      const res = await axiosWithMultipart({
        url: `/administrasikelurahan/src/delete/delDataAkunAdmin.php`,
        method: "POST",
        data: {
          id_admin: id,
        },
      });
      const { value, message } = res.data;
      console.log(res);
      if (value === 1) {
        mes.success(message);
        window.location.reload();
      } else {
        mes.error(message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGetDataAdmin();
  }, []);
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
            placeholder="Cari Admin ..."
            // onSearch={handleSearch}
          />
        </div>

        <Button
          // onClick={showModal}
          className="flex flex-row   cursor-pointer bg-blusky text-white items-center "
          type="default"
        >
          <Link className="pr-1" to={"/Dashboard/Kelola-Admin/Tambah-Admin"}>
            Tambah Admin Baru
          </Link>
          <PlusOutlined />
        </Button>
      </Header>
      <Content
        style={{ position: "sticky", top: 400 }}
        className="p-6 bg-white min-h-[40rem]"
      >
        {/* tabel */}
        <Table
          key={dataAccountAdmin.id_admin}
          columns={columnDataAdmin}
          dataSource={dataAccountAdmin}
          pagination={{ pageSize: 5 }}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          sticky
        />
        <Space>
          <Button type="primary" className="bg-purp">
            Download
          </Button>
        </Space>
      </Content>
    </div>
  );
}
