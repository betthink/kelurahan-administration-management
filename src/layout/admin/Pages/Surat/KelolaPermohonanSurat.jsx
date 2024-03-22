// libb
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, Modal } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import ModalCofirmPersetujuan from "./components/ModalCofirmPersetujuan";

// components
function KelolaPermohonanSurat() {
  // atributes modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmSurat, setisModalConfirmSurat] = useState(false);
  const [dataConfirm, setdataConfirm] = useState(false);
  const [dataDownload, setdataDownload] = useState(false);
  const isConfirmDownload = (data) => {
    setIsModalOpen(true);
    setdataDownload(data);
  };
  const handleIsConfirmPersetujuan = (data) => {
    setisModalConfirmSurat(true);
    setdataConfirm(data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [dataPemohonSurat, setdataPemohonSurat] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  // column ------------------------------
  const columnPermohonanSurat = [
    {
      title: "Nama Pemohon",
      width: 100,
      dataIndex: "nama",
      key: "nama",
    },

    {
      title: "Jenis Surat",
      width: 100,
      dataIndex: "jenis_surat",
      key: "jenis_surat",
    },
    {
      title: "Tanggal Permohonan",
      width: 70,
      dataIndex: "tanggal_permohonan",
      key: "tanggal_permohonan",
    },
    {
      title: "Nomor Telp",
      width: 50,
      dataIndex: "nomor_telp",
      key: "nomor_telp",
    },
    {
      title: "Status",
      width: 50,
      key: "isSetuju",
      render: (data) => (
        <span
          className={`
            ${
              data.status_permohonan == 1
                ? "text-green-500 bg-green-100  "
                : "text-red-400 bg-red-200 "
            } p-1 rounded-sm w-fit `}
        >
          {data.status_permohonan == 1 ? "Disetujui" : "Belum"}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (data) => (
        <div className="flex text-white gap-3">
          <Button
            onClick={() => isConfirmDownload(data)}
            className="bg-green-600 hover:bg-white hover:border-green-600 text-white "
            type="default"
          >
            <MdDownload />
          </Button>
          <Button
            onClick={() => handleIsConfirmPersetujuan(data)}
            className="bg-blusky hover:bg-white hover:border-pink-400 text-white "
            type="default"
          >
            Persetujuan
          </Button>
        </div>
      ),
    },
  ];
  // functions

  const handleGetDataPermohonanSurat = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPendudukByRT.php?rt=${user.rt}`
        : `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPenduduk.php`;
    try {
      const response = await axiosInstance.get(url);
      setdataPemohonSurat(
        response.data.map((item, index) => {
          return { ...item, key: parseInt(index) };
        })
      );
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    handleGetDataPermohonanSurat();
  }, []);
  return (
    <div className="mx-20">
      <Header
        style={{
          position: "sticky",
          // top: 0,
        }}
        className="header-breadcrump border-b-2"
      >
        <Breadcrumb
          items={[{ title: "Admin" }, { title: "Kelola Permohonan Surat" }]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Permohonan Surat</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className=" bg-white min-h-[40rem]">
        <div className="min-w-full bg-white p-10 overflow-x-auto  rounded-md mb-10">
          <Table
            columns={columnPermohonanSurat}
            dataSource={dataPemohonSurat}
          />
        </div>
      </Content>
      {/* modal */}
      <>
        <Modal
          key={dataDownload?.key}
          title="Apakah  data sudah sesuai? "
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button
              block
              className="bg-green-600 px-4 text-white mt-6 hover:bg-white hover:border flex justify-center items-center"
            >
              <Link state={dataDownload} to="/Dashboard/Kelola-surat/pdf">
                Lihat surat
              </Link>
            </Button>,
          ]}
        >
          <div className="grid grid-cols-2 border p-3 gap-3">
            <span>Nama</span>
            <p className="text-blusky font-semibold ">{dataDownload.nama}</p>
            <span>NIK</span>
            <p className="text-blusky font-semibold ">{dataDownload.nik}</p>
            <span>No KK</span>
            <p className="text-blusky font-semibold ">{dataDownload.no_kk}</p>
            <span>Jenis kelamin</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.jenis_kelamin}
            </p>
            <span>Jenis surat</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.jenis_surat}
            </p>
            <span>Pekerjaan</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.pekerjaan}
            </p>
            <span>Tanggal lahir</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.tanggal_lahir}
            </p>
            <span>Tempat lahir</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.tempat_lahir}
            </p>
            <span>Tanggal permohonan</span>
            <p className="text-blusky font-semibold ">
              {dataDownload.tanggal_permohonan}
            </p>
          </div>
        </Modal>

        {/* modal persetujuan */}
        <ModalCofirmPersetujuan
          isOpen={isModalConfirmSurat}
          handleOpen={setisModalConfirmSurat}
          dataConfirm={dataConfirm}
        />
      </>
    </div>
  );
}

export default KelolaPermohonanSurat;
