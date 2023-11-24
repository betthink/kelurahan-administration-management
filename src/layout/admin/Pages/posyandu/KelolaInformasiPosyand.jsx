import { Breadcrumb, Button, Space, Table, message as mes } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTambahPeserta from "./components/ModalTambahPeserta";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import ModalUpdateTahapanVaksin from "./components/ModalUpdateTahapanVaksin";

const KelolaInformasiPosyand = () => {
  const [dataPosyandu, setdataPosyandu] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [jenisVaksin, setjenisVaksin] = useState([]);
  const [idImunisasi, setidImunisasi] = useState([]);
  function handleOpenModal(id) {
    setIsopen(true);
    setidImunisasi(id);
  }

  async function handleGetJenisVaksin() {
    const url = `/administrasikelurahan/src/api/fetchDataVaksin.php`;
    try {
      const res = await axiosInstance.get(url);
      const { data, status } = res;
      if (status === 200) {
        setjenisVaksin(data.map((item) => item.jenis_vaksin));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePeserta(id) {
    const url = `/administrasikelurahan/src/delete/delDataPesertaPosyandu.php`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "post",
        data: {
          id_imunisasi: id,
        },
      });
      const { data, status } = res;
      if (status === 200) {
        mes.info(data.message);
        window.location.reload();
      } else {
        mes.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
      render: (data) => (
        <ButtonGroup className="flex gap-1 ">
          <Button
            onClick={() => handleOpenModal(data.id_imunisasi)}
            className="  bg-success text-white"
          >
            Ubah Tahapan
          </Button>
          <Button
            onClick={() => handleDeletePeserta(data.id_imunisasi)}
            className="px-3 bg-danger text-white"
          >
            Hapus
          </Button>
        </ButtonGroup>
      ),
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
    handleGetJenisVaksin();
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
      {/* modal add peserta */}
      <>
        <ModalTambahPeserta
          dataJenisVaksin={jenisVaksin}
          onCancel={() => setisOpenModal(false)}
          isOpen={isOpenModal}
        />
      </>
      {/* modal update tahapan vaksin */}
      <>
        <ModalUpdateTahapanVaksin
          idImunisasi={idImunisasi}
          onCancel={() => setIsopen(false)}
          isOpen={isOpen}
          dataJenisVaksin={jenisVaksin}
        />
      </>
    </div>
  );
};

export default KelolaInformasiPosyand;
