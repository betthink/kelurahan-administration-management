// libb
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
// components
import { axiosInstance } from "../../../lib/axios";
function KelolaPermohonanSurat() {

  const columnPermohonanSurat = [
    {
      title: "Id",
      width: 50,
      dataIndex: "id_pemohon",
      key: "id_pemohon",
    },
    {
      title: "Nama Pemohon",
      width: 100,
      dataIndex: "nama_pemohon",
      key: "nama_pemohon",
    },
    {
      title: "NIK",
      width: 100,
      dataIndex: "nik",
      key: "nik",
    },

    {
      title: "Jenis Surat",
      width: 100,
      dataIndex: "jenis_surat",
      key: "jenis_surat",
    },
    {
      title: "Tanggal Permohonan",
      width: 70,
      dataIndex: "tanggal_permohonan",
      key: "tanggal_permohonan",
    },
    {
      title: "Status Permohonan",
      width: 50,
      dataIndex: "status_permohonan",
      key: "status_permohonan",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 50,
      render: () => (
        <div className="flex text-white gap-3">
          <Button className="bg-darksky text-white " type="default">
            <Link className="">Unduh</Link>
          </Button>
        </div>
      ),
    },
  ];
  // variables --
  const [dataPemohonSurat, setdataPemohonSurat] = useState([]);
  // functions --
  const handleGetDataPermohonanSurat = async () => {
    try {
      const response = await axiosInstance.get(
        `/administrasikelurahan/src/api/fetchDataPermohonanSurat.php`
      );
      console.log({ data: response.data });
      setdataPemohonSurat(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    handleGetDataPermohonanSurat();
  }, []);
  return (
    <div className="mx-20">
      <Header
        style={{
          backgroundColor: "white",
          position: "sticky",
          top: 20,
          margin: "16px 0",
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
            { title: <Link to={"/kelolaSurat"}>Kelola Permohonan Surat</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Permohonan Surat</Breadcrumb.Item>
        </Breadcrumb>
      </Header>

      <Content>
        <Table
          dataSource={dataPemohonSurat}
          columns={columnPermohonanSurat}
          pagination={{ pageSize: 5 }}
          // loading={setTimeout}
          // scroll={{
          //   x: 1000,
          // }}
          // sticky
        />
      </Content>
    </div>
  );
}

export default KelolaPermohonanSurat;
