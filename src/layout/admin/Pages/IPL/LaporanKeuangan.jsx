import {
  Breadcrumb,
  Button,
  Modal,
  Form,
  Input,
  message as mes,
  List,
  Avatar,
  Skeleton,
  Divider,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { MdAttachMoney } from "react-icons/md";
import { formatAngka } from "../../../../utils/formatAngkaUang";
import InfiniteScroll from "react-infinite-scroll-component";

export default function LaporanKeuangan() {
  const [dataPemasukan, setdataPemasukan] = useState(0);
  const [dataPengeluaran, setdataPengeluaran] = useState(0);
  const [dataRiwayatTransaksi, setdataRiwayatTransaksi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const dataLoc = location.state;
  const rt = user.rt === "" ? dataLoc.rt : user.rt;

  //   handle modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   get data keuangan
  const handleGetPemasukan = async () => {
    const url = `/administrasikelurahan/src/api/ipl/total-pemasukan-keuangan-by-rt.php?rt=${rt}`;
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pembayaran || 0;
      if (response.status === 200) {
        setdataPemasukan(data);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleGetpengeluaran = async () => {
    const url = `/administrasikelurahan/src/api/ipl/total-pengeluaran-keuangan-by-rt.php?rt=${rt}`;
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pengeluaran || 0;
      if (response.status === 200) {
        setdataPengeluaran(data);
      }
    } catch (error) {
      throw error;
    }
  };
  //   let totalPemasukan = dataPemasukan;
  //   let totalPengeluaran = dataPengeluaran[0]?.total_jumlah_pengeluaran;
  let totalSisa = dataPemasukan - dataPengeluaran;
  const totalPemasukan = formatAngka(dataPemasukan);
  const totalPengeluaran = formatAngka(dataPengeluaran);
  totalSisa = formatAngka(totalSisa);
  //   form handler

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //   card items
  const cardData = [
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-l from-green-300 to-green-400",
      text: (
        <span>
          Total pemasukan Rp.
          {totalPemasukan}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-l from-red-500 to-red-400",
      text: (
        <span>
          Total pengeluaran Rp.
          {totalPengeluaran}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-r from-primary_blue to-cyan-400",
      text: (
        <span>
          Sisa Keuangan Rp.
          {totalSisa}
        </span>
      ),
    },
  ];
  //   handle kirim pemasukan
  const handleKirimPengeluaran = async (v) => {
    const url =
      "/administrasikelurahan/src/post/ipl/tambah-transaksi-pengeluaran.php";
    try {
      const response = await axiosWithMultipart({
        method: "post",
        data: {
          verifikator: user.username,
          rt: user.rt,
          jumlah_transaksi: v.jumlah_transaksi,
        },
        url,
      });
      const data = response.data;
      console.log(data);
      const { value, message } = data;
      if (value === 1) {
        mes.success(message);
        window.location.reload();
      }
    } catch (error) {
      throw error;
    }
  };

  // atributes history
  const [loading, setLoading] = useState(false);
  const handleGetRiwayatTransaksi = async () => {
    if (loading) {
      return;
    }
    const url = `/administrasikelurahan/src/api/ipl/riwayat-transaksi-keuangan-ipl-by-rt.php?rt=${rt}`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (response.status === 200) {
      setdataRiwayatTransaksi(data.slice().reverse());
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetPemasukan();
    handleGetpengeluaran();
    handleGetRiwayatTransaksi();
  }, []);
  return (
    <div className=" md:mx-20">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
        className="hidden header-breadcrump bg-white items-center md:flex mt-5 "
      >
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },

            {
              title: "Laporan keuangan",
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
        <div className="flex gap-6 justify-between items-center">
          <span className="text-blusky">RT</span>

          <span className="text-green-600 font-bold text-xl">
            {dataLoc ? dataLoc.rt : rt}
          </span>
        </div>
      </Header>
      <Content className="mt-5 bg-white p-10">
        {user.role === "admin" ? (
          <div className="w-full flex  my-6 ">
            <Button
              onClick={showModal}
              className="flex  border-green-600 bg-green-400  text-white hover:bg-white  py-4 justify-between items-center "
            >
              Masukkan Pengeluaran
            </Button>
          </div>
        ) : null}

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4  md:h-56 lg:h-56 text-secondary">
          {cardData.map((item, i) => (
            <div
              key={i}
              className={`${item.bgColor} rounded-md p-8 text-lg capitalize flex justify-between `}
            >
              <p className="max-w-[10rem]"> {item.text} </p>
              {item.icon}
            </div>
          ))}
        </div>

        {/* history */}
        <div
          className="mt-6"
          id="scrollableDiv"
          style={{
            height: 400,
            overflow: "auto",
            padding: "0 16px",
            border: "1px solid rgba(140, 140, 140, 0.35)",
          }}
        >
          <InfiniteScroll
            dataLength={dataRiwayatTransaksi.length}
            next={handleGetRiwayatTransaksi}
            hasMore={dataRiwayatTransaksi.length < 1}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1,
                }}
                active
              />
            }
            // endMessage={<Divider plain>Semua data sudah di tampilkan</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={dataRiwayatTransaksi}
              renderItem={(item, i) => (
                <List.Item key={i}>
                  <List.Item.Meta
                    avatar={<span className="text-blusky">{i + 1}</span>}
                    title={
                      <div className="flex gap-5 w-56 justify-between ">
                        <span>{item?.nama ? "Nama Penduduk" : "Nama pengguna"} </span>
                        <span>: </span>
                        <span className="font-semibold text-blusky">
                          {item?.nama ? item?.nama : "Admin"}
                        </span>
                      </div>
                    }
                    description={
                      <div className="flex gap-5 w-56 justify-between ">
                        <span>Waktu transaksi: </span>
                        <span className="font-semibold">
                          {item.waktu_verifikasi}
                        </span>
                      </div>
                    }
                  />
                  <div className="flex flex-col justify-end">
                    <span className="font-bold text-lg">
                      {item.jenis_transaksi}
                    </span>
                    <span
                      className={`${
                        item.jenis_transaksi === "pengeluaran"
                          ? "text-red-600"
                          : "text-green-600"
                      } text-right`}
                    >
                      Rp.{item && formatAngka(item.jumlah_transaksi)}
                    </span>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </Content>
      <>
        <Modal
          title="Masukkan jumlah pengeluaran "
          open={isModalOpen}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleKirimPengeluaran}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="jumlah_transaksi"
              name="jumlah_transaksi"
              rules={[
                {
                  required: true,
                  message: "Masukan jumlah transaksi!",
                },
                {
                  pattern: /^[0-9]*$/,
                  message: "Hanya masukkan angka!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button block className="bg-success text-white" htmlType="submit">
                Masukkan
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
}
