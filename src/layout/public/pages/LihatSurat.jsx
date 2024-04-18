import React, { useEffect, useState } from "react";
import NavigatorBar from "../components/NavigatorBar";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Button, Card, List } from "antd";

// docx
// lib docx
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const docxTemplates = {
  1: require(`../../../assets/docx/templete/1.docx`),
  2: require(`../../../assets/docx/templete/2.docx`),
  3: require(`../../../assets/docx/templete/3.docx`),
  4: require(`../../../assets/docx/templete/4.docx`),
};

export default function LihatSuratPage() {
  const user = useSelector((data) => data.userReducer.value);
  const [userAdmin, setuserAdmin] = useState([]);
  const [datapermohonanSurat, setdatapermohonanSurat] = useState([]);
  const handleGetAllPermohonan = async () => {
    const url = `/administrasikelurahan/src/api/surat/surat-by-user.php?id_user=${user.id}`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    // console.log(data);
    if (response.status === 200) {
      setdatapermohonanSurat(data);
    }
  };

    function formatDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = date.toLocaleDateString("id-ID", options);
      return formattedDate.replace(/\//g, "-"); // Mengganti tanda "/" menjadi "-"
    }
  function generateDocument(data) {
    // return console.log(
    //   userAdmin.find((item) => item.id_admin === data?.rt_verifikator).username
    // );
    const docxFilePath = docxTemplates[data?.id_surat];

    if (!docxFilePath) {
      console.error("File template for the given id_surat not found.");
      return;
    }

    loadFile(docxFilePath, function (error, content) {
      if (error) {
        throw error;
      }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Di sini Anda bisa menambahkan logika lain sesuai kebutuhan
      const formattedDate = formatDate(new Date()); // Mendapatkan tanggal saat ini

      doc.render({
        nama: data?.nama,
        jenis_kelamin: data?.jenis_kelamin,
        tempatlahir: data?.tempat_lahir,
        tanggal_lahir: data?.tanggal_lahir,
        status_diri: data?.status_diri,
        agama: data?.agama,
        pekerjaan: data?.pekerjaan,
        noktp: data?.nomor_telp,
        nokk: data?.no_kk,
        alamat: data?.alamat,
        rt: data?.rt,
        rw: data?.rw,
        now: formattedDate,
        adminrt: userAdmin.find(
          (item) => item.id_admin === data?.rt_verifikator
        )?.username,
      });

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      // Output the document using Data-URI
      saveAs(out, `${data?.nama}-${data?.nama_surat}.docx`);
    });
  }
  const handleGetAdmin = async () => {
    try {
      const url =
        "/administrasikelurahan/src/api/admin/fetchaAllAccountAdmin.php";
      const response = await axiosInstance.get(url);
      const data = response.data;
      setuserAdmin(data);
      // console.log(data);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
      handleGetAllPermohonan();
    handleGetAdmin();
  }, []);
  return (
    <section className="">
      <NavigatorBar />
      <div className="container">
        <Header className="bg-white text-lg font-bold md:mx-10 md:pt-20 md:px-10  w-full p-0">
          <span>Lihat surat</span>
          <div className="">
            <span>Status : </span>{" "}
          </div>
        </Header>
        <Content className="md:mx-20 mt-6 md:pt-20 overflow-x-auto">
          <List
            grid={{
              gutter: 16,
              column: 2,
            }}
            dataSource={datapermohonanSurat}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.nama_surat}>
                  <div className="flex justify-between ">
                    <span>{item.tanggal_permohonan}</span>
                    <Button
                      onClick={() => generateDocument(item)}
                      disabled={
                        item.status_permohonan && item.persetujuan_rw !== "1"
                      }
                      className="bg-green-600 text-white hover:bg-white !hover:border-green-600 !hover:text-green-600"
                    >
                      unduh
                      {/* <Link state={{ data: item }} to="/Kelola-surat/pdf">
                        Lihat
                      </Link> */}
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </div>
    </section>
  );
}
