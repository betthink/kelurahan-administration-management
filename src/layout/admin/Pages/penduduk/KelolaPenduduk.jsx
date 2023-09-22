// lib
import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Button, Space, Input, message as mes } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Header, Content } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
// components

function KelolaPenduduk() {
  // variables --
  const { Search } = Input;
  const columns = [
    {
      title: "Id",
      width: 50,
      dataIndex: "id_penduduk",
      key: "id_penduduk",
      fixed: "left",
    },
    {
      title: "Nama",
      width: 100,
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIK",
      width: 100,
      dataIndex: "nik",
      key: "nik",
    },
    {
      title: "NO. KK",
      dataIndex: "no_kk",
      key: "no_kk",
      width: 150,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
      width: 150,
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
      width: 150,
    },
    {
      title: "Nomor Telp",
      dataIndex: "nomor_telp",
      key: "nomor_telp",
      width: 150,
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggal_lahir",
      key: "tanggal_lahir",
      width: 150,
    },
    {
      title: "Tempat Lahir",
      dataIndex: "tempat_lahir",
      key: "tempat_lahir",
      width: 150,
    },
    {
      title: "Darah",
      dataIndex: "darah",
      key: "darah",
      width: 70,
    },
    {
      title: "Status Tinggal",
      dataIndex: "status_tinggal",
      key: "status_tinggal",
      width: 130,
    },
    {
      title: "Status Penduduk",
      dataIndex: "status_diri",
      key: "status_diri",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: (data) => (
        <div className="flex text-white gap-3">
          <Button className="bg-manggo">
            <Link state={{ data }} to={"/Dashboard/Update-Penduduk"}>
              Edit
            </Link>
          </Button>
          <Button
            onClick={() => handleDeletePenduduk(data.id_penduduk)}
            className="bg-darksky text-white "
            type="default"
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];
  const [dataPenduduk, setdataPenduduk] = useState([]);
  // functions --
  const handleGetDataPenduduk = async () => {
    try {
      const response = await axiosInstance.get(
        `/administrasikelurahan/src/api/fetchDataPenduduk.php`
      );
      setdataPenduduk(
        response.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const onSearch = (value) => console.log(value);
  const handleDeletePenduduk = async (id) => {
    console.log(id);
    const res = await axiosInstance(
      "/administrasikelurahan/src/delete/delDataPenduduk.php",
      {
        method: "post",
        data: {
          id_penduduk: id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { value, message } = res.data;
    if (value === 1) {
      mes.success(message);
      window.location.reload();
    } else {
      mes.error(message);
    }
  };
  useEffect(() => {
    handleGetDataPenduduk();
  }, []);
  return (
    <div className="mx-20">
      {/* path */}
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
            placeholder="Cari penduduk ..."
            onSearch={onSearch}
            // enterButton
          />
        </div>

        <Button
          // onClick={showModal}
          className="flex flex-row   cursor-pointer bg-blusky text-white items-center "
          type="default"
        >
          <Link className="pr-1" to={"/Dashboard/Tambah-Penduduk"}>
            Tambah Penduduk
          </Link>
          <PlusOutlined />
        </Button>
      </Header>
      <Content
        style={{ position: "sticky", top: 400 }}
        className="p-6 bg-white min-h-[460px]"
      >
        {/* tabel */}
        <Table
          key={dataPenduduk.id_penduduk}
          columns={columns}
          dataSource={dataPenduduk}
          pagination={{ pageSize: 5 }}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          // summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
        <Space>
          <Button
            // onClick={handleDownloadPage}
            type="primary"
            className="bg-purp"
          >
            Download
          </Button>
        </Space>
      </Content>
    </div>
  );
}

export default KelolaPenduduk;
