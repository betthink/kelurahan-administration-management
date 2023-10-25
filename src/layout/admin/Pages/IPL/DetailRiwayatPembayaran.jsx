import { Breadcrumb, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function DetailRiwayatPembayaran() {
  const [dataRiwayatPembayaran, setdataRiwayatPembayaran] = useState([]);
  const location = useLocation();
  const prevPageState = location.state.data;
  const columnRiwayatPembayaran = [
    {
      title: "ID pembayaran",
      dataIndex: "id_pembayaran",
      key: "id_pembayaran",
      fixed: "left",
      //   width: 2,
    },
    {
      title: "Waktu pembayaran",
      dataIndex: "waktu_pembayaran",
      key: "waktu_pembayaran",
      //   width: 10,
    },
    {
      title: "Waktu verifikasi",
      dataIndex: "waktu_verifikasi",
      key: "waktu_verifikasi",
      //   width: 10,
    },
    {
      title: "metode",
      dataIndex: "metode",
      key: "metode",
      render: (data) => <span>{data}</span>,
      //   width: 10,
    },
    {
      title: "Jumlah pembayaran",
      dataIndex: "jumlah_pembayaran",
      key: "jumlah_pembayaran",
      render: (data) => <span>{`Rp.${data}`}</span>,
      //   width: 10,
    },
    {
      title: "Status",
      dataIndex: "jumlah_pembayaran",
      key: "jumlah_pembayaran",
      //   width: 10,
      render: (data) => (
        <span className={`${data > 0 ? "text-green-500" : "text-red-700"}  font-bold text-base`}>
          {" "}
          {parseInt(data) > 0 ? "Lunas" : "Terhutang"}{" "}
        </span>
      ),
    },
  ];
  const handleGetRiwayatPembayaran = async () => {
    const url = `/administrasikelurahan/src/api/fetchDataRiwayatPembayaranByIduser.php?id_user=${prevPageState.id_user}`;
    try {
      const res = await axiosInstance.get(url);
      const { status, data } = res;
      if (status === 200) {
        setdataRiwayatPembayaran(
          data.map((item, index) => {
            return {
              ...item,
              key: index.toString(),
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetRiwayatPembayaran();
  }, []);
  return (
    <div className="md:mx-20">
      <Header
        style={{
          position: "sticky",
          top: 20,
          zIndex: 99,
        }}
        className="hidden  bg-white items-center md:flex mt-5 "
      >
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },

            {
              title: (
                <Link to={"/VerifikasiPembayaran"}>
                  Detail Riwayat Pembayaran
                </Link>
              ),
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
      </Header>
      <Content className="p-6 bg-white min-h-[40rem]">
        <Table
          dataSource={dataRiwayatPembayaran}
          columns={columnRiwayatPembayaran}
        />
      </Content>
    </div>
  );
}