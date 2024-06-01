// libb
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Table, Modal } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { MdDownload } from "react-icons/md";
import ModalCofirmPersetujuan from "./components/ModalCofirmPersetujuan";
import ModalConfirmTTDRW from "./components/ModalConfirmTTDRW";
//  import { PDFDocument } from "pdf-lib";
// lib docx
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import ConvertApi from "convertapi-js";
import { Link } from "react-router-dom";
// import ConvertApi from "convertapi";
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
const docxTemplates = {
  1: require(`../../../../assets/docx/templete/1.docx`),
  2: require(`../../../../assets/docx/templete/2.docx`),
  3: require(`../../../../assets/docx/templete/3.docx`),
  4: require(`../../../../assets/docx/templete/4.docx`),
  5: require(`../../../../assets/docx/templete/5.docx`),
  6: require(`../../../../assets/docx/templete/6.docx`),
  7: require(`../../../../assets/docx/templete/7.docx`),
  8: require(`../../../../assets/docx/templete/8.docx`),
  9: require(`../../../../assets/docx/templete/9.docx`),
  10: require(`../../../../assets/docx/templete/10.docx`),
};
// components
function KelolaPermohonanSurat() {
  // atributes modal
  const [dataReady, setDataReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirmSurat, setisModalConfirmSurat] = useState(false);
  const [isMOdalConfirmRW, setisMOdalConfirmRW] = useState(false);
  const [dataConfirm, setdataConfirm] = useState(false);
  const [userAdmin, setuserAdmin] = useState([]);
  const [dataDownload, setdataDownload] = useState({});
  const [dataSurat, setDataSurat] = useState({});
  const [dataPemohonSurat, setdataPemohonSurat] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  const isConfirmDownload = (data) => {
    setIsModalOpen(true);
    setdataDownload(data);
  };
  const handleIsConfirmPersetujuan = (data) => {
    setisModalConfirmSurat(true);
    setdataConfirm(data);
  };
  const handleConfirmRW = (data) => {
    setisMOdalConfirmRW(true);
    setdataConfirm(data);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const rtAdmin = userAdmin?.find(
    (item) => item.id_admin === dataDownload?.rt_verifikator
  )?.username;
  const rwAdmin = userAdmin?.find(
    (item) => item.id_admin === dataDownload?.rw_verifikator
  )?.username;
  // handle download surat
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
  // generate file docx

  async function generateDocument(data) {
    try {
      // Pastikan userAdmin sudah di-load
      if (!userAdmin || userAdmin.length === 0) {
        console.error("Data userAdmin belum tersedia.");
        return;
      }

      const docxFilePath = docxTemplates[data?.id_surat];
      if (!docxFilePath) {
        console.error(
          "File template untuk id_surat yang diberikan tidak ditemukan."
        );
        return;
      }

      const content = await new Promise((resolve, reject) => {
        loadFile(docxFilePath, (error, content) => {
          if (error) {
            reject(error);
          } else {
            resolve(content);
          }
        });
      });

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      const formattedDate = formatDate(); // Mendapatkan tanggal saat ini

      doc.render({
        nama: data?.nama,
        jenis_kelamin: data?.jenis_kelamin,
        tempat_lahir: data?.tempat_lahir,
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
        adminrt: rtAdmin,
        adminrw: rwAdmin || "Data admin RW tidak tersedia",
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
        umur_lainnya: getAgeFromBirthdate(data?.tanggal_lahir_2nd),
        waktu_pergi: data?.waktu_pergi,
        nomor_akta_cerai: data?.nomor_akta_cerai,
      });

      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const fileName = `${data?.nama}-${data?.nama_surat}.docx`;
      saveAs(out, fileName);
    } catch (error) {
      console.error("Error generating document:", error);
    }
  }
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
      dataIndex: "nama_surat",
      key: "nama_surat",
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
      render: (data) => {
        return user.role === "adminRW" ? (
          <span
            className={`
          ${
            data.persetujuan_rw == 1
              ? "text-green-500 bg-green-100"
              : "text-red-400 bg-red-200"
          } p-1 rounded-sm w-fit `}
          >
            {data.persetujuan_rw == 1 ? "Disetujui" : "Belum"}
          </span>
        ) : (
          <span
            className={`
          ${
            data.status_permohonan == 1
              ? "text-green-500 bg-green-100"
              : "text-red-400 bg-red-200"
          } p-1 rounded-sm w-fit `}
          >
            {data.status_permohonan == 1 ? "Disetujui" : "Belum"}
          </span>
        );
      },
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
          {user?.role === "adminRW" ? (
            <Button
              onClick={() => handleConfirmRW(data)}
              className="bg-violet-600 hover:bg-white hover:border-pink-400 text-white "
              type="default"
            >
              Persetujuan RW
            </Button>
          ) : (
            <Button
              onClick={() => handleIsConfirmPersetujuan(data)}
              className="bg-blusky hover:bg-white hover:border-pink-400 text-white "
              type="default"
            >
              Persetujuan RT
            </Button>
          )}
        </div>
      ),
    },
  ];
  const handleGetDataPermohonanSurat = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPendudukByRT.php?rt=${user.rt}`
        : user.role == "adminRW"
        ? `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPendudukByRW.php?rw=${user.rw}`
        : `/administrasikelurahan/src/api/fetchDataPermohonanSuratJoinPenduduk.php`;
    try {
      const response = await axiosInstance.get(url);
      setdataPemohonSurat(
        response.data.map((item, index) => {
          return { ...item, key: parseInt(index) };
        })
      );
      setDataReady(true)
    } catch (error) {
      throw error;
    }
  };
  const handleGetAdmin = async () => {
    try {
      const url =
        "/administrasikelurahan/src/api/admin/fetchaAllAccountAdmin.php";
      const response = await axiosInstance.get(url);
      const data = response.data;
      setuserAdmin(data);
    } catch (error) {
      throw error;
    }
  };
  // data surat
  const formattedDate = formatDate();
  useEffect(() => {
    const updatedDataSurat = {
      id_surat: dataDownload?.id_surat,
      nama: dataDownload?.nama,
      jenis_kelamin: dataDownload?.jenis_kelamin,
      tempat_lahir: dataDownload?.tempat_lahir,
      tanggal_lahir: dataDownload?.tanggal_lahir,
      status_diri: dataDownload?.status_diri,
      agama: dataDownload?.agama,
      pekerjaan: dataDownload?.pekerjaan,
      noktp: dataDownload?.nomor_telp,
      nokk: dataDownload?.no_kk,
      alamat: dataDownload?.alamat,
      rt: dataDownload?.rt,
      rw: dataDownload?.rw,
      now: formattedDate,
      adminrt: rtAdmin,
      adminrw: rwAdmin || "rw belum verifikasi",
      nama_lain: dataDownload?.nama_lain,
      tempat_lahir_2nd: dataDownload?.tempat_lahir_2nd,
      tanggal_lahir_2nd: dataDownload?.tanggal_lahir_2nd,
      agama_2nd: dataDownload?.agama_2nd,
      pendidikan_terakhir: dataDownload?.pendidikan_terakhir,
      pekerjaan_2nd: dataDownload?.pekerjaan_2nd,
      alamat_pekerjaan: dataDownload?.alamat_pekerjaan,
      letak_object_tanah: dataDownload?.letak_object_tanah,
      suku: dataDownload?.suku,
      bangsa: dataDownload?.bangsa,
      jenis_usaha: dataDownload?.jenis_usaha,
      nama_anak: dataDownload?.nama_anak,
      jurusan_anak: dataDownload?.jurusan_anak,
      penghasilan_kotor: dataDownload?.penghasilan_kotor,
      pengeluaran: dataDownload?.pengeluaran,
      nim: dataDownload?.nim,
      penghasilan_bersih: dataDownload?.penghasilan_bersih,
      nama_ayah: dataDownload?.nama_ayah,
      nama_ibu: dataDownload?.nama_ibu,
      pekerjaan_ayah: dataDownload?.pekerjaan_ayah,
      pekerjaan_ibu: dataDownload?.pekerjaan_ibu,
      jalan: dataDownload?.jalan,
      kecamatan: dataDownload?.kecamatan,
      kota: dataDownload?.kota,
      provinsi: dataDownload?.provinsi,
      waktu_cerai: dataDownload?.waktu_cerai,
      umur: getAgeFromBirthdate(dataDownload?.tanggal_lahir),
      umur_lainnya: getAgeFromBirthdate(dataDownload?.tanggal_lahir_2nd),
      waktu_pergi: dataDownload?.waktu_pergi,
      nomor_akta_cerai: dataDownload?.nomor_akta_cerai,
    };
    setDataSurat(updatedDataSurat);
  }, [dataDownload, formattedDate]);
useEffect(()=> {
handleGetDataPermohonanSurat()
handleGetAdmin()
},[] )
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
          // key={dataDownload?.key}
          title="Apakah  data sudah sesuai? "
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button
              key="download"
              onClick={() => generateDocument(dataDownload)}
              block
              disabled={!dataReady}
              className="bg-green-600 px-4 text-white mt-6 hover:bg-white hover:border flex justify-center items-center"
            >
              Unduh
            </Button>,
            <Button
              key="lihat"
              block
              disabled={!dataReady}
              className="bg-blue-600 px-4 text-white mt-6 hover:bg-white hover:border flex justify-center items-center"
            >
              <Link to={urlSurat[dataDownload.id_surat]} state={dataSurat}>
                Lihat
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
              {dataDownload.nama_surat}
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
        {/* modal persetujuan */}
        <ModalConfirmTTDRW
          isOpen={isMOdalConfirmRW}
          handleOpen={setisMOdalConfirmRW}
          dataConfirm={dataConfirm}
        />
      </>
    </div>
  );
}

export default KelolaPermohonanSurat;
