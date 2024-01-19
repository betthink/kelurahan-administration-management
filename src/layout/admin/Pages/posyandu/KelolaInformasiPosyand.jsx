import { Breadcrumb, Button, Space, Table, message as mes } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTambahPeserta from "./components/ModalTambahPeserta";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import ModalUpdateTahapanVaksin from "./components/ModalUpdateTahapanVaksin";
import { useSelector } from "react-redux";

const KelolaInformasiPosyand = () => {
  const [dataPosyandu, setdataPosyandu] = useState([]);
  const [isOpenModal, setisOpenModal] = useState(false);
  const [isOpen, setIsopen] = useState(false);
  const [jenisVaksin, setjenisVaksin] = useState([]);
  const [idImunisasi, setidImunisasi] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  function handleOpenModal(id) {
    // setisOpenModal(true);
    // setisOpenModal(true)
    setIsopen(true);
    setidImunisasi(id);
  }
  function handleOpenTambahPeserta() {
    setisOpenModal(true);
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
  const columns = [
    // ... Kolom umum di sini
    {
      title: "Orang Tua / Wali",
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
  ];

  if (user.role !== "super_admin") {
    columns.push({
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
    });
  }

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
      <Header
        style={{
          position: "sticky",
          top: 0,
        }}
        className="header-breadcrump border-b"
      >
        <Breadcrumb
          items={[
            { title: "Admin" },
            {
              title: (
                <Link to={"/Dashboard/Informasi-PosyandPage"}>
                  Kelola Posyandu
                </Link>
              ),
            },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
        </Breadcrumb>
        {/* <div>Layanan POSYANDU</div> */}
      </Header>
      <Content className=" items-center">
        <Space className="justify-between w-full bg-white py-6 px-10">
          <ButtonGroup className="justify-between w-full flex ">
            <Button>
              <Link to="/Dashboard/Informasi-vaksin">Lihat vaksin</Link>
            </Button>
            {user.role !== "super_admin" ? (
              <Button onClick={() => handleOpenTambahPeserta()}>
                Tambah peserta imunisasi
              </Button>
            ) : null}
          </ButtonGroup>
        </Space>
        <Table dataSource={dataPosyandu} columns={columns} />
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
