// libb
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, message, Modal } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import templatePath from "../../../../assets/docx/templete.docx";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import ButtonGroup from "antd/es/button/button-group";
// components
function KelolaPermohonanSurat() {
  // atributes modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDownload, setdataDownload] = useState(false);
  const isConfirmDownload = (data) => {
    setIsModalOpen(true);
    setdataDownload(data);

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
      title: "NIK",
      width: 100,
      dataIndex: "nik",
      key: "nik",
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

    // {
    //   title: "Status",
    //   width: 120,
    //   dataIndex: "status_permohonan",
    //   key: "status_permohonan",
    //   render: (status) => (
    //     <p>
    //       {parseInt(status) === 1 ? "Sudah di approve" : "Belum di approve"}
    //     </p>
    //   ),
    // },
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
        </div>
      ),
    },
  ];
  let value = {
    namaLengkap: "Robetson",
    tempatLahir: "kediri",
    tanggalLahir: "18 - mei - 1999",
    jenisKelamin: "Laki-Laki",
    statusPerkawinan: "Lajang",
    NIK: "6214141414535",
    KK: "547548",
    agama: "Katholik",
    pekerjaan: "software developer",
    alamatTinggal: "JL. Temanggung Tilung ",
    jenisSurat: "surat rekomendasi kerja",
    RT: "001",
    RW: "002",
    currentTime: "18 - mei - 2023",
  };
  // functions

  // async function generateDocument(dataDocx) {
  //   // return <PDFDocument data={dataDocx} />;
  //   try {
  //     let response = await fetch(templatePath);
  //     let data = await response.arrayBuffer();
  //     let zip = PizZip(data);
  //     let templateDoc = new Docxtemplater(zip, {
  //       paragraphLoop: true,
  //       linebreaks: true,
  //       syntax: {
  //         allowUnopenedTag: true,
  //       },
  //     });
  //     templateDoc.render(dataDocx);
  //     let generatedDoc = templateDoc.getZip().generate({
  //       type: "blob",
  //       mimeType:
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       compression: "DEFLATE",
  //     });

  //     saveAs(
  //       generatedDoc,
  //       `Surat Pengantar - ${dataDocx.jenis_surat}-${dataDocx.nama}.docx`
  //     );
  //     message.success("Berhasil mengunduh surat");
  //   } catch (error) {
  //     message.error("Error", JSON.stringify(error));
  //     console.log("Error: " + error);
  //   }
  // }

  // async function generatePDF() {
  //   return (
   
  //   );
  // }

  const handleGetDataPermohonanSurat = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPendudukByRT.php?rt=${user.rt}`
        : `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPenduduk.php`;
    try {
      const response = await axiosInstance.get(url);
      setdataPemohonSurat(
        response.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
    } catch (error) {}
  };
  useEffect(() => {
    handleGetDataPermohonanSurat();
  }, []);
  return (
    <div className="mx-20">
      <Header
        style={{
          position: "sticky",
          top: 0,
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
      <Content className="p-6  bg-white min-h-[40rem]">
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
          key={dataDownload?.id_penduduk}
          title="Apakah anda data sudah sesuai? "
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
              <Button
                block
                className="bg-pink-400 px-4 text-white mt-6 hover:bg-blusky hover:border flex justify-center items-center"
              >
                <Link state={dataDownload} to="/Dashboard/Kelola-surat/pdf">
                  Lihat pdf
                </Link>
              </Button>
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
      </>
    </div>
  );
}

export default KelolaPermohonanSurat;
