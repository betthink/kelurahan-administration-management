import { Breadcrumb, Button, Card, Modal, Table, message as mes } from "antd";
import { Header, Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import ButtonGroup from "antd/es/button/button-group";
import { TiDocumentText } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";
import { formatAngka } from "../../../../utils/formatAngkaUang";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";

export default function VerifikasiPembayaranTransfer() {
  const user = useSelector((state) => state.userReducer.value);
  const [dataTranser, setdataTranser] = useState([]);
  const [dataModal, setdataModal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (data) => {
    // console.log(data);
    setdataModal(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleGetPembayaranTransfer = async () => {
    const url = `/administrasikelurahan/src/api/ipl/list-pembayaran-metode-transfer-by-rt.php?rt=${user.rt}`;
    try {
      const res = await axiosInstance.get(url);
      const { data } = res;
       const valid = data.filter((item) => item.verifikator === null);
      //   console.log(data);
      setdataTranser(
        valid.map((item, i) => {
          return { ...item, key: i.toString() };
        })
      );
    } catch (error) {
      throw error;
    }
  };

  const handleTransfer = async (id_pembayaran) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin memverifikasi pembayaran transfer ini?"
    );
    // console.log(user);return
    if (confirmed) {
      const url = `/administrasikelurahan/src/post/ipl/verifikasi-pembayaran-transfer.php`;
      try {
        const res = await axiosWithMultipart({
          method: "post",
          url,
          data: {
            verifikator: user?.username,
            id_pembayaran,
          },
        });
        const { value, message } = res.data;
        // console.log(data);
        if (value == 1) {
          mes.success(message);
          window.location.reload();
        } else {
          mes.success(message);
        }
      } catch (error) {
        // Tangani kesalahan di sini
      }
    } else {
      // Jika pengguna membatalkan konfirmasi, tidak ada tindakan yang diambil
    }
  };

  // kolom
  const column = [
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
      title: "Waktu pembayaran",
      width: 100,
      dataIndex: "waktu_pembayaran",
      key: "waktu_pembayaran",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 160,
      render: (item) => (
        <ButtonGroup>
          <>
            <Button
              onClick={() => showModal(item)}
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
                  <span> Tanggal transaksi </span>
                  <p className="text-green-600 ">
                    {dataModal?.waktu_pembayaran}
                  </p>
                  <span> Total transaksi </span>
                  <p className="text-green-600 ">
                    Rp.{" "}
                    {dataModal !== null &&
                      formatAngka(dataModal?.jumlah_transaksi)}
                  </p>
                  <span>Nomor ktp </span>
                  <p className="text-green-600 ">{dataModal?.nik}</p>
                </div>
              </Card>
            </Modal>
          </>

          <Button
            onClick={() => handleTransfer(item?.id_pembayaran)}
            className="border-none text-manggo flex"
            type="default"
          >
            <TiDocumentText size={22} />
            <p>Verifikasi</p>
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    handleGetPembayaranTransfer();
  }, []);
  return (
    <section className="mx-20">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
        className="header-breadcrump hidden md:flex border-b-2"
      >
        <Breadcrumb
          className=""
          items={[
            { title: "Admin" },
            { title: <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link> },
            { title: <p>Daftar Belum Lunas</p> },
          ]}
        />
      </Header>
      <Content className="p-6 bg-white min-h-[30rem]">
        <Table columns={column} dataSource={dataTranser} />
      </Content>

      <Modal></Modal>
    </section>
  );
}
