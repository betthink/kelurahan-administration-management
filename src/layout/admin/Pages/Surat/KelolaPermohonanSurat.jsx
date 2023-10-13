// libb
import React, { useEffect, useState, Component } from "react";
import { Breadcrumb, Button, Table } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import templatePath from "../../../../assets/docx/simple.docx";
let resume = {
  name: {
    first: "Robet",
    last: "son",
  },
  personalSummary:
    "Hi i'm John, a software engineer passionate about building well...software",
  jobTitle: "Software Engineer",
  contact: {
    address: "Lagos, Nigeria",
    phone: "08123456789",
    email: "johndoe@gmail.com",
  },
  meta_details: {
    dateOfBirth: "24th June, 1995",
    stateOfOrigin: "Enugu",
    lga: "Oji-River",
    gender: "Male",
    maritalStatus: "Single",
    religion: "Christian",
  },
  workExperience: [
    {
      nameOfOrg: "Acme Inc.",
      position: "Software Developer",
      from: "July, 2022",
      to: "Present",
    },
  ],
  education: [
    {
      name: "Creation Academy",
      location: "Earth",
      type: "Primary",
      qualificationObtained: "Elementary School Certificate",
      started: "18th Feb, 2017",
      finished: "6th July, 2022",
    },
  ],
  referees: [
    {
      name: "Big man",
      nameOfOrg: "Big man Inc",
      position: "Big man position",
      contact: "bigman@verybig.com",
    },
  ],
};
// components
function KelolaPermohonanSurat() {
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
            onClick={() => generateDocument(resume, templatePath)}
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

  // generate file docx
  // in src/index.js

  async function generateDocument(resume, templatePath) {
    // load the document template into docxtemplater
    try {
      let response = await fetch(templatePath);
      let data = await response.arrayBuffer();

      let zip = PizZip(data);

      let templateDoc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      templateDoc.render(resume);

      let generatedDoc = templateDoc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
      });

      saveAs(generatedDoc, `${resume.name.first}'s resume.docx`);
    } catch (error) {
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
