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
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";

// components
function KelolaPermohonanSurat() {
  const [dataPemohonSurat, setdataPemohonSurat] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  // column ------------------------------
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
    {
      title: "RT",
      width: 50,
      dataIndex: "rt",
      key: "rt",
    },
    {
      title: "RW",
      width: 50,
      dataIndex: "rw",
      key: "rw",
    },
    {
      title: "Status",
      width: 120,
      dataIndex: "status_permohonan",
      key: "status_permohonan",
      render: (status) => (
        <p>
          {parseInt(status) === 1 ? "Sudah di approve" : "Belum di approve"}
        </p>
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
            onClick={() => generateDocument(data)}
            className="bg-darksky text-white "
            type="default"
          >
            Unduh
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

  async function generateDocument(dataDocx) {
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
      templateDoc.render(dataDocx);
      let generatedDoc = templateDoc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        compression: "DEFLATE",
      });

      saveAs(
        generatedDoc,
        `Surat Pengantar - ${dataDocx.jenis_surat}-${dataDocx.nama}.docx`
      );
      message.success("Berhasil mengunduh surat");
    } catch (error) {
      message.error("Error", JSON.stringify(error));
      console.log("Error: " + error);
    }
  }

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
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: "Kelola Permohonan Surat" },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Permohonan Surat</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className="p-6 bg-white min-h-[40rem]">
        <div className="min-w-full bg-white p-10 overflow-x-auto  rounded-md mb-10">
          <table className="w-full ">
            <thead className=" border-b   ">
              <tr className="text-xs  ">
                {/* <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  ID
                </th> */}
                <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  Nama Pemohon
                </th>

                <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  Jenis surat
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  Tanggal permohonan
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  Nomor Telp
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  RT
                </th>
                {/* <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                  Status Persetujuan
                </th> */}

                <th className="py-2 whitespace-nowrap px-4 font-normal text-center ">
                  Unduh
                </th>
              </tr>
            </thead>
            <tbody>
              {dataPemohonSurat.map((item, i) => (
                <tr
                  className={`${
                    i % 2 === 0 ? "bg-primary" : "bg-secondary"
                  } text-four `}
                  key={i}
                >
                  {/* <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.id_pemohon}
                  </td> */}
                  <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.nama}
                  </td>

                  <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.jenis_surat}
                  </td>
                  <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.tanggal_permohonan}
                  </td>
                  <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.nomor_telp}
                  </td>
                  <td className="py-2 whitespace-nowrap px-4 text-start ">
                    {item.rt}
                  </td>
                  {/* <td className="py-2 whitespace-nowrap px-4 text-start ">
                    <p
                      className={`${
                        item.status_permohonan === 1
                          ? "bg-green-200 text-green-600"
                          : "bg-red-200 text-red-600"
                      } p-1 rounded-sm`}
                    >
                      {item.status_permohonan === 1
                        ? "Sudah di approve"
                        : "Belum di approve"}
                    </p>
                  </td> */}

                  <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                    <Button
                      onClick={() => generateDocument(item)}
                      className="border-none text-green-600 flex"
                      type="default"
                    >
                      <MdDownload size={22} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </div>
  );
}

export default KelolaPermohonanSurat;
