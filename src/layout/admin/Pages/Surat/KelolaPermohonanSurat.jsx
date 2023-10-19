// libb
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, message } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import templatePath from "../../../../assets/docx/templete.docx";

// components
function KelolaPermohonanSurat() {
  const [valueSurat, setvalueSurat] = useState({});
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
  const columnPermohonanSurat = [
    {
      title: "Id",
      width: 50,
      dataIndex: "id_pemohon",
      key: "id_pemohon",
    },
    {
      title: "Nama Pemohon",
      width: 100,
      dataIndex: "nama_pemohon",
      key: "nama_pemohon",
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
      title: "Status Permohonan",
      width: 50,
      dataIndex: "status_permohonan",
      key: "status_permohonan",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 50,
      render: () => (
        <div className="flex text-white gap-3">
          <Button
            onClick={() => generateDocument(value, templatePath)}
            className="bg-darksky text-white "
            type="default"
          >
            Unduh
            {/* <Link className="">Unduh</Link> */}
          </Button>
        </div>
      ),
    },
  ];
  // variables --
  const [dataPemohonSurat, setdataPemohonSurat] = useState([]);
  // functions --
  const handleGetDataPermohonanSurat = async () => {
    try {
      const response = await axiosInstance.get(
        `/administrasikelurahan/src/api/fetchDataPermohonanSurat.php`
      );
      setdataPemohonSurat(
        response.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
    } catch (error) {}
  };

  async function generateDocument(value, templatePath) {
    try {
      let response = await fetch(templatePath);
      let data = await response.arrayBuffer();
      let zip = PizZip(data);
      let templateDoc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        syntax: {
          allowUnopenedTag: true,
        },
      });
      templateDoc.render(value);
      let generatedDoc = templateDoc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
      });

      saveAs(generatedDoc, `Surat Pengantar ${value.namaLengkap}.docx`);
      message.success("Berhasil mengunduh surat");
    } catch (error) {
      message.error("Error", JSON.stringify(error));
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    handleGetDataPermohonanSurat();
  }, []);
  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/kelolaSurat"}>Kelola Permohonan Surat</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Permohonan Surat</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className="p-6 bg-white min-h-[40rem]">
        <Table
          key={dataPemohonSurat?.id_pemohon}
          dataSource={dataPemohonSurat}
          columns={columnPermohonanSurat}
          pagination={{ pageSize: 5 }}
          // loading={setTimeout}
          // scroll={{
          //   x: 1000,
          // }}
          // sticky
        />
      </Content>
    </div>
  );
}

export default KelolaPermohonanSurat;
