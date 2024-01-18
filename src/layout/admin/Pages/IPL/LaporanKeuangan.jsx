import { Breadcrumb, Button, Modal, Form, Input, message as mes } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { MdAttachMoney } from "react-icons/md";
import { formatAngka } from "../../../../utils/formatAngkaUang";

export default function LaporanKeuangan() {
  const [dataPemasukan, setdataPemasukan] = useState(0);
  const [dataPengeluaran, setdataPengeluaran] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  //   handle modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //   get data keuangan
  const handleGetPemasukan = async () => {
    const url = "/administrasikelurahan/src/api/ipl/total-keuangan.php";
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pembayaran;
      if (response.status === 200) {
        setdataPemasukan(data);
      }
    } catch (error) {
      throw error;
    }
  };
  const handleGetpengeluaran = async () => {
    const url =
      "/administrasikelurahan/src/api/ipl/total-transaksi-pengeluaran.php";
    try {
      const response = await axiosInstance.get(url);
      const data = response.data[0].total_jumlah_pengeluaran;
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
      bgColor: "bg-gradient-to-r from-primary_blue to-blue-400",
      text: (
        <span>
          Total pemasukan Rp.
          {totalPemasukan}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-r from-primary_pink to-pink-400",
      text: (
        <span>
          Total pengeluaran Rp.
          {totalPengeluaran}
        </span>
      ),
    },
    {
      icon: <MdAttachMoney size={28} />,
      bgColor: "bg-gradient-to-r from-primary_green to-cyan-400",
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
      "/administrasikelurahan/src/post/ipl/tambah-transaksi-pemasukan.php";
    try {
      const response = await axiosWithMultipart({
        method: "post",
        data: {
          verifikator: user.username,
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
  useEffect(() => {
    handleGetPemasukan();
    handleGetpengeluaran();
  }, []);
  return (
    <div className=" md:mx-20">
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
              title: "Laporan keuangan",
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
      </Header>
      <Content className="mt-5 bg-white p-10">
        <div className="w-full flex  my-6 ">
          <Button
            onClick={showModal}
            className="flex  border-green-600 bg-green-400  text-white hover:bg-white  py-4 justify-between items-center "
          >
            Masukkan Pengeluaran
          </Button>
        </div>
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
