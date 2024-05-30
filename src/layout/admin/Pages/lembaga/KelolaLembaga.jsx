import { Breadcrumb, Button, Table, message as mes } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTambahPeserta from "./components/ModalTambahPeserta";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";

const KelolaLembaga = () => {
  const [dataLembaga, setdataLembaga] = useState([]);
  const [isOpen, setIsopen] = useState(false);
  const [isOpenModal, setisOpenModal] = useState(false);
  const user = useSelector((state) => state.userReducer.value);
  function handleOpenModal(id) {
    setIsopen(true);
  }
  function handleOpenTambahPeserta() {
    setisOpenModal(true);
  }
  async function handleGetLembaga() {
    const url = `/administrasikelurahan/src/api/lembaga/fetch_all_lembaga.php`;
    try {
      const res = await axiosInstance.get(url);
      const { data, status } = res;
      if (status === 200) {
        setdataLembaga(
          data.map((item, index) => {
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
  }

  async function handleDeleteLembaga(id) {
    const url = `/administrasikelurahan/src/delete/delete-lembaga.php`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "post",
        data: {
          id,
        },
      });
      const { data, status } = res;
      if (status === 200) {
       await mes.info(data.message);
        window.location.reload();
      } else {
        mes.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const columns = [
    {
      title: "RT",
      key: "rt",
      dataIndex: "rt",
    },
    {
      title: "RW",
      key: "rw",
      dataIndex: "rw",
    },
    {
      title: "Aksi",
      key: "action",
      render: (data) => (
        <ButtonGroup className="flex gap-1 ">
          <Button
            onClick={() => handleDeleteLembaga(data?.id)}
            className="px-3 bg-danger text-white"
          >
            Hapus
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  useEffect(() => {
    handleGetLembaga();
  }, []);
  return (
    <div className="mx-20 h-screen">
      <Header
        style={{
          position: "sticky",
          // top: 0,
        }}
        className="header-breadcrump justify-between 0 w-full border-b"
      >
        <Breadcrumb
          className="w-full"
          items={[
            { title: "Admin" },
            {
              title: (
                <Link to={"/Dashboard/Kelola-Lembaga"}>Kelola Lembaga</Link>
              ),
            },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Lembaga</Breadcrumb.Item>
        </Breadcrumb>
        {/* <div>Layanan POSYANDU</div> */}
        <ButtonGroup className="  flex gap-3 ">
          <Button className="bg-purp text-white">
            <Link to="/Dashboard/Tambah-Lembaga">Tambah Lembaga</Link>
          </Button>
          {user.role !== "super_admin" ? (
            <Button onClick={() => handleOpenTambahPeserta()}>
              Tambah Lembaga
            </Button>
          ) : null}
        </ButtonGroup>
      </Header>

      <Content className=" items-center">
        <div className="min-w-full bg-white p-10 overflow-x-auto  rounded-md mb-10">
          <Table dataSource={dataLembaga} columns={columns} />
        </div>
      </Content>
      {/* modal add peserta */}
      <>
        <ModalTambahPeserta
          dataJenisVaksin={dataLembaga}
          onCancel={() => setisOpenModal(false)}
          isOpen={isOpenModal}
        />
      </>
    </div>
  );
};

export default KelolaLembaga;
