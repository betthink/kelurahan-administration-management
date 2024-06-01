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
  5: require(`../../../assets/docx/templete/5.docx`),
  6: require(`../../../assets/docx/templete/6.docx`),
  7: require(`../../../assets/docx/templete/7.docx`),
  8: require(`../../../assets/docx/templete/8.docx`),
  9: require(`../../../assets/docx/templete/9.docx`),
  10: require(`../../../assets/docx/templete/10.docx`),
};

export default function LihatSuratPage() {
  const user = useSelector((data) => data.userReducer.value);
  const [userAdmin, setuserAdmin] = useState([]);
  const [datapermohonanSurat, setdatapermohonanSurat] = useState([]);
  const handleGetAllPermohonan = async () => {
    const url = `/administrasikelurahan/src/api/surat/surat-by-user.php?id_user=${user.id}`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (response.status === 200) {
      setdatapermohonanSurat(data);
    }
  };

  function formatDate() {
    const date = new Date(); // Membuat objek Date saat ini
    const day = date.getDate(); // Mendapatkan tanggal
    const month = date.getMonth() + 1; // Mendapatkan bulan (dalam JavaScript, bulan dimulai dari 0)
    const year = date.getFullYear(); // Mendapatkan tahun
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const formattedDate = `${day} ${monthNames[month - 1]} ${year}`;
    return formattedDate;
  }
  function getAgeFromBirthdate(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  function generateDocument(data) {
    // console.log(data);
    // return;

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
      const formattedDate = formatDate(); // Mendapatkan tanggal saat ini
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
        adminrw: userAdmin.find(
          (item) => item.id_admin === data?.rw_verifikator
        )?.username,
        nama_lain: data?.nama_lain,
        tempat_lahir_2nd: data?.tempat_lahir_2nd,
        tanggal_lahir_2nd: data?.tanggal_lahir_2nd,
        agama_2nd: data?.agama_2nd,
        pendidikan_terakhir: data?.pendidikan_terakhir,
        pekerjaan_2nd: data?.pekerjaan_2nd,
        alamat_pekerjaan: data?.alamat_pekerjaan,
        letak_object_tanah: data?.letak_object_tanah,
        suku: data?.suku,
        bangsa: data?.bangsa,
        jenis_usaha: data?.jenis_usaha,
        nama_anak: data?.nama_anak,
        jurusan_anak: data?.jurusan_anak,
        penghasilan_kotor: data?.penghasilan_kotor,
        pengeluaran: data?.pengeluaran,
        nim: data?.nim,
        penghasilan_bersih: data?.penghasilan_bersih,
        nama_ayah: data?.nama_ayah,
        nama_ibu: data?.nama_ibu,
        pekerjaan_ayah: data?.pekerjaan_ayah,
        pekerjaan_ibu: data?.pekerjaan_ibu,
        jalan: data?.jalan,
        kecamatan: data?.kecamatan,
        kota: data?.kota,
        provinsi: data?.provinsi,
        waktu_cerai: data?.waktu_cerai,
        umur: getAgeFromBirthdate(data?.tanggal_lahir),
        umur_lainya: getAgeFromBirthdate(data?.tanggal_lahir_2nd),
        waktu_pergi: data?.waktu_pergi,
        nomor_akta_cerai: data?.nomor_akta_cerai,
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
      // console.log(data);
      setuserAdmin(data);
      // console.log(data);
    } catch (error) {
      throw error;
    }
  };
  const formattedDate = formatDate();

  const urlSurat = {
    1: "/surat-domisili/pdf",
    2: "/surat-sktm/pdf",
    3: "/surat-pernyataan-gaib/pdf",
    4: "/surat-pernyataan-tidak-ada-bangunan/pdf",
    5: "/surat-keterangan-belum-menikah/pdf",
    6: "/surat-skkb/pdf",
    7: "/surat-pernyataan-penghasil/pdf",
    8: "/surat-beda-nama/pdf",
    9: "/surat-sktm-siswa/pdf",
    10: "/surat-pernyataan-janda-duda/pdf",
  };
  function datasurat(datas) {
    const rtAdmin = userAdmin?.find(
      (item) => item.id_admin === datas?.rt_verifikator
    )?.username;
    const rwAdmin = userAdmin?.find(
      (item) => item.id_admin === datas?.rw_verifikator
    )?.username;
    const data = {
      id_surat: datas?.id_surat,
      nama: datas?.nama,
      jenis_kelamin: datas?.jenis_kelamin,
      tempat_lahir: datas?.tempat_lahir,
      tanggal_lahir: datas?.tanggal_lahir,
      status_diri: datas?.status_diri,
      agama: datas?.agama,
      pekerjaan: datas?.pekerjaan,
      noktp: datas?.nomor_telp,
      nokk: datas?.no_kk,
      alamat: datas?.alamat,
      rt: datas?.rt,
      rw: datas?.rw,
      now: formattedDate,
      adminrt: rtAdmin,
      adminrw: rwAdmin || "rw belum verifikasi",
      nama_lain: datas?.nama_lain,
      tempat_lahir_2nd: datas?.tempat_lahir_2nd,
      tanggal_lahir_2nd: datas?.tanggal_lahir_2nd,
      agama_2nd: datas?.agama_2nd,
      pendidikan_terakhir: datas?.pendidikan_terakhir,
      pekerjaan_2nd: datas?.pekerjaan_2nd,
      alamat_pekerjaan: datas?.alamat_pekerjaan,
      letak_object_tanah: datas?.letak_object_tanah,
      suku: datas?.suku,
      bangsa: datas?.bangsa,
      jenis_usaha: datas?.jenis_usaha,
      nama_anak: datas?.nama_anak,
      jurusan_anak: datas?.jurusan_anak,
      penghasilan_kotor: datas?.penghasilan_kotor,
      pengeluaran: datas?.pengeluaran,
      nim: datas?.nim,
      penghasilan_bersih: datas?.penghasilan_bersih,
      nama_ayah: datas?.nama_ayah,
      nama_ibu: datas?.nama_ibu,
      pekerjaan_ayah: datas?.pekerjaan_ayah,
      pekerjaan_ibu: datas?.pekerjaan_ibu,
      jalan: datas?.jalan,
      kecamatan: datas?.kecamatan,
      kota: datas?.kota,
      provinsi: datas?.provinsi,
      waktu_cerai: datas?.waktu_cerai,
      umur: getAgeFromBirthdate(datas?.tanggal_lahir),
      umur_lainnya: getAgeFromBirthdate(datas?.tanggal_lahir_2nd),
      waktu_pergi: datas?.waktu_pergi,
      nomor_akta_cerai: datas?.nomor_akta_cerai,
    };
    return data;
  }
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
                      // onClick={() => generateDocument(item)}
                      disabled={
                        item.status_permohonan && item.persetujuan_rw !== "1"
                      }
                      className="bg-green-600 text-white hover:bg-white !hover:border-green-600 !hover:text-green-600"
                    >
                      <Link
                        state={datasurat(item)}
                        to={urlSurat[item.id_surat]}
                      >
                        Lihat
                      </Link>
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
