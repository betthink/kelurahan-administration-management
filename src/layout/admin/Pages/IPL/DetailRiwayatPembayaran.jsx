import { Breadcrumb, Button, Card, Modal, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { formatAngka } from "../../../../utils/formatAngkaUang";

export default function DetailRiwayatPembayaran() {
  const location = useLocation();
  const prevPageState = location.state.data;
  const [dataRiwayatPembayaran, setdataRiwayatPembayaran] = useState([]);
  const [dataModal, setdataModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (data) => {
    setdataModal(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columnRiwayatPembayaran = [
    {
      title: "Waktu pembayaran",
      dataIndex: "waktu_pembayaran",
      key: "waktu_pembayaran",
    },
    {
      title: "Verifikator",
      dataIndex: "verifikator",
      key: "verifikator",
    },
    {
      title: "Waktu verifikasi",
      dataIndex: "waktu_verifikasi",
      key: "waktu_verifikasi",
    },
    {
      title: "metode",
      dataIndex: "metode",
      key: "metode",
      render: (data) => <span>{data}</span>,
    },
    {
      title: "Jumlah pembayaran",
      dataIndex: "jumlah_transaksi",
      key: "jumlah_transaksi",
      render: (data) => (
        <span>{`Rp.${data !== null ? formatAngka(data) : 0}`}</span>
      ),
    },

    {
      title: "Status",
      dataIndex: "jumlah_transaksi",
      key: "jumlah_transaksi",
      render: (data) => (
        <div
          className={`p-1 rounded items-center justify-center flex w-fit ${
            data > 0 ? "bg-green-100" : "bg-red-200"
          }`}
        >
          <span
            className={`${
              data > 0 ? "text-green-500" : "text-red-700"
            }  font-bold text-base`}
          >
            {parseInt(data) > 0 ? "Lunas" : "Terhutang"}
          </span>
        </div>
      ),
    },
    {
      title: "#",
      key: "action",
      render: (data) => (
        <>
          <Button
            onClick={() => showModal(data)}
            className="text-primary_green"
          >
            Detail
          </Button>
          <Modal
            title={<p className="font-bold text-xl">{dataModal?.nama}</p>}
            width={600}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={false}
          >
            {dataModal?.foto === "" ? (
              <div className="grid grid-cols-2">
                <span>Metode pembayaran </span>
                <p className="text-green-600 ">{dataModal?.metode}</p>
                <span> Tanggal transaksi </span>
                <p className="text-green-600 ">{dataModal?.waktu_pembayaran}</p>
                <span> Verifikasi </span>
                <p className="text-green-600 ">{dataModal?.verifikator}</p>
                <span> Total transaksi </span>
                <p className="text-green-600 ">
                  Rp.{" "}
                  {dataModal !== null &&
                    formatAngka(dataModal?.jumlah_transaksi)}
                </p>

                <span>Waktu verifikasi </span>
                <p className="text-green-600 ">{dataModal?.waktu_verifikasi}</p>
                <span>Nomor ktp </span>
                <p className="text-green-600 ">{dataModal?.nik}</p>
              </div>
            ) : (
              <Card
                className="w-full  justify-center flex flex-col"
                // hoverable

                cover={
                  <section className="">
                    <img
                      className="w-full max-w-[200px] h-fit my-10 mx-auto "
                      style={{
                        // width: 200,
                        objectFit: "cover",
                      }}
                      alt={`${dataModal?.nama}`}
                      src={`http://localhost/administrasikelurahan/src/upload/${dataModal?.nama}/${dataModal?.waktu_pembayaran}/${dataModal?.foto}`}
                    />
                  </section>
                }
              >
                <div className="grid grid-cols-2">
                  <span>Metode pembayaran </span>
                  <p className="text-green-600 ">{dataModal?.metode}</p>
                  <span> Tanggal transaksi </span>
                  <p className="text-green-600 ">
                    {dataModal?.waktu_pembayaran}
                  </p>
                  <span> Verifikasi </span>
                  <p className="text-green-600 ">{dataModal?.verifikator}</p>
                  <span> Total transaksi </span>
                  <p className="text-green-600 ">
                    Rp.{" "}
                    {dataModal !== null &&
                      formatAngka(dataModal?.jumlah_transaksi)}
                  </p>

                  <span>Waktu verifikasi </span>
                  <p className="text-green-600 ">
                    {dataModal?.waktu_verifikasi}
                  </p>
                  <span>Nomor ktp </span>
                  <p className="text-green-600 ">{dataModal?.nik}</p>
                </div>
              </Card>
            )}
          </Modal>
        </>
      ),
    },
  ];

  const handleGetRiwayatPembayaran = async () => {
    const url = `/administrasikelurahan/src/api/ipl/riwayat-pembayaran-by-iduser.php?id_user=${prevPageState.id_user}`;
    try {
      const res = await axiosInstance.get(url);
      const { status, data } = res;
      if (status === 200) {
           const valid = data.filter((item) => item.verifikator !== null);
        setdataRiwayatPembayaran(
          valid.map((item, index) => {
            return {
              ...item,
              key: parseInt(index),
            };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const dataindex = dataRiwayatPembayaran[dataRiwayatPembayaran?.length - 1];
  const otherDate = new Date(); // Misalnya, tanggal saat ini
  const otherYear = otherDate.getFullYear();
  const otherMonth = otherDate.getMonth() + 1;
  const parts = dataindex?.waktu_pembayaran.split("-");
  useEffect(() => {
    handleGetRiwayatPembayaran();
  }, []);
  if (parts !== "undefined") {
    const yearMatch = parseInt(parts?.[0]) === otherYear;
    const monthMatch = parseInt(parts?.[1]) === otherMonth;
    const isMatch = yearMatch && monthMatch;
    return (
      <div className="md:mx-20">
        <Header
          style={{
            position: "sticky",
            top: 20,
            zIndex: 99,
          }}
          className="hidden md:justify-between bg-white items-center md:flex mt-5 "
        >
          <Breadcrumb
            items={[
              { title: "Admin" },
              { title: <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link> },

              {
                title: (
                  <Link to={"/Dashboard/Kelola-IPL/DetailRiwayatPembayaran"}>
                    Detail Riwayat Pembayaran
                  </Link>
                ),
              },
            ]}
            style={{
              margin: "16px 0",
            }}
          />
          <div className="">
            <span>Status : </span>{" "}
            <span
              className={`${
                isMatch ? "text-green-500" : "text-red-700"
              } font-bold text-lg underline`}
            >
              {" "}
              {isMatch ? "Lunas" : "Belum Lunas"}
            </span>
          </div>
        </Header>
        <Content className="p-6 bg-white min-h-[40rem]">
          <Table
            dataSource={dataRiwayatPembayaran}
            columns={columnRiwayatPembayaran}
          />
        </Content>
      </div>
    );
  } else {
    return (
      <div className="md:mx-20">
        <Header
          style={{
            position: "sticky",
            top: 20,
            zIndex: 99,
          }}
          className="hidden md:justify-between bg-white items-center md:flex mt-5 "
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
        <p>Loading...</p>
      </div>
    );
  }
}
