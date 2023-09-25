import { Breadcrumb, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Link } from "react-router-dom";

export default function InformasiIuran() {
  // variables
  const [dataIuran, setdataIuran] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const columns = [
    {
      title: "Id",
      render: (text) => (
        <div className=" p-2 justify-self-center  self-center">{text}</div>
      ),
      dataIndex: "id_ipl",
      key: "id_ipl",
      fixed: "left",
      width: 20,
    },
    {
      title: "Nama Kepala Keluarga",
      dataIndex: "nama_kepala_keluarga",
      key: "nama",
      width: 100,
    },
    {
      title: "NIK",

      dataIndex: "nik",
      key: "NIK",
      width: 100,
    },

    {
      title: "Status Pembayaran",
      dataIndex: "status_ipl",
      key: "StatusPembayaran",
      width: 100,

      filters: [
        { text: "Lunas", value: true },
        { text: "Belum", value: false },
      ],
      onFilter: (value, record) => {
        return record.StatusPembayaran === value;
      },
    },
  ];
  // function
  async function handleGetIpl() {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataVerifikasiPembayaran.php"
      );
      setdataIuran(res.data);
      setisLoading(false);
    } catch (error) {}
  }
  useEffect(() => {
    handleGetIpl();
  }, []);
  return (
    <section className="mx-20 pt-20">
      <Header className="bg-white">Infromasi Iuran</Header>
      <Content>
        <Table
          dataSource={dataIuran}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 7 }}
          sticky
        />
      </Content>
    </section>
  );
}
