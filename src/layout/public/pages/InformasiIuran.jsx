import { Button, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import NavigatorBar from "../components/NavigatorBar";
import { useSelector } from "react-redux";
import { formatAngka } from "../../../utils/formatAngkaUang";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";

export default function InformasiIuran() {
  // variables
  const [dataRiwayatPembayaran, setdataRiwayatPembayaran] = useState([]);
  const lastData = dataRiwayatPembayaran[dataRiwayatPembayaran?.length - 1];
  const user = useSelector((state) => state.userReducer.value);
  // console.log(user);
  // table column
  const columnRiwayatPembayaran = [
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
      dataIndex: "jumlah_transaksi",
      key: "jumlah_transaksi",
      render: (data) => <span>{`Rp.${data && formatAngka(data)}`}</span>,
      //   width: 10,
    },
    {
      title: "Status",
      dataIndex: "jumlah_transaksi",
      key: "jumlah_transaksi",
      //   width: 10,
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
  ];
  const otherDate = new Date(); // Misalnya, tanggal saat ini
  const otherYear = otherDate.getFullYear();
  const otherMonth = otherDate.getMonth() + 1;
  const parts = lastData?.waktu_pembayaran.split("-");
  // function
  async function handleGetIpl() {
    const url = `/administrasikelurahan/src/api/ipl/riwayat-pembayaran-by-iduser.php?id_user=${user.id}`;
    try {
      const res = await axiosInstance.get(url);
      const { status, data } = res;
      const valid = data.filter((item) => item.verifikator !== null);
      if (status === 200) {
        setdataRiwayatPembayaran(
          valid.map((item, index) => {
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
  }
  useEffect(() => {
    handleGetIpl();
  }, []);
  if (parts !== "undefined") {
    const yearMatch = parseInt(parts?.[0]) === otherYear;
    const monthMatch = parseInt(parts?.[1]) === otherMonth;

    // Jika tahun dan bulan sama, kembalikan true
    const isMatch = yearMatch && monthMatch;

    return (
      <section className="overflow-y-auto">
        <NavigatorBar />
        <div className="container mt-10">
          <Header className="bg-white text-lg font-bold md:mx-10 md:pt-20 md:px-10  w-full p-0 flex items-center justify-between">
            <div>
              <span>Riwayat Pembayaran</span>
              <div className="">
                <span>Status : </span>{" "}
                <span
                  className={`${isMatch ? "text-green-500" : "text-red-700"}`}
                >
                  {" "}
                  {isMatch ? "Lunas" : "Belum Lunas"}
                </span>
              </div>
            </div>
            <Button
              className="flex my-2 flex-row self-end  cursor-pointer bg-third hover:text-third hover:bg-white  hover:border-third text-white items-center "
              type="default"
            >
              <Link className="" to={"/Upload-bukti"}>
                upload bukti pembayaran
              </Link>
              <PlusOutlined />
            </Button>
          </Header>
          <Content className="md:mx-20 mt-6 md:pt-20 overflow-x-auto">
            <Table
              dataSource={dataRiwayatPembayaran}
              columns={columnRiwayatPembayaran}
            />
          </Content>
        </div>
      </section>
    );
  } else {
    return (
      <section className="">
        <NavigatorBar />
        <Header className="bg-white text-lg font-bold mx-10 pt-20  ">
          <div>loading</div>
        </Header>
      </section>
    );
  }
}
