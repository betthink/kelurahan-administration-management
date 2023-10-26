import { Breadcrumb, Button, Space, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTambahPeserta from "./components/ModalTambahPeserta";

const InformasiPosyandPage = () => {
  const [dataPosyandu, setdataPosyandu] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  function handleOpenModal() {
    setisOpenModal(true);
  }

  const column = [
    {
      title: "ID",
      key: "id_imunisasi",
      dataIndex: "id_imunisasi",
    },
    {
      title: "Orang Tua / Wali  ",
      key: "wali_peserta",
      dataIndex: "wali_peserta",
    },
    {
      title: "Nama Peserta",
      key: "nama_peserta",
      dataIndex: "nama_peserta",
    },
    {
      title: "Tahapan Vaksin",
      key: "tahap_vaksin",
      dataIndex: "tahap_vaksin",
    },
    {
      title: "Aksi",
      key: "action",
      render: () => <Button>Ubah Tahapan</Button>,
    },
  ];
  async function handleGetDataPesertaPosyandu() {
    const url = `/administrasikelurahan/src/api/fetchDataPesertaPosyandu.php`;
    try {
      const res = await axiosInstance.get(url);
      const { status, data } = res;
      if (status === 200) {
        setdataPosyandu(
          data.map((item, i) => {
            return { ...item, key: i.toString() };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetDataPesertaPosyandu();
  }, []);
  return (
    <div className="mx-20 h-screen">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/kelolaPosyandu"}>Kelola Posyandu</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
        </Breadcrumb>
        <div>Layanan POSYANDU</div>
      </Header>
      <Content className=" items-center">
        <Space className="justify-between w-full bg-white py-6 px-10">
          <ButtonGroup className="justify-between w-full flex ">
            <Button>
              <Link to="/Dashboard/Informasi-vaksin">Lihat vaksin</Link>
            </Button>
            <Button onClick={() => handleOpenModal()}>
              Tambah peserta imunisasi
            </Button>
          </ButtonGroup>
        </Space>
        <Table dataSource={dataPosyandu} columns={column} />
      </Content>
      <>
        <ModalTambahPeserta
          onCancel={() => setisOpenModal(false)}
          isOpen={isOpenModal}
        />
      </>
    </div>
  );
};

export default InformasiPosyandPage;
