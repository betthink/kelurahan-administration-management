import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Button, Space } from "antd";
// import { StyleSheet } from "@react-pdf/renderer";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
// import TambahPenduduk from "./TambahPenduduk";
import { Header, Content } from "antd/es/layout/layout";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
import { axiosInstance } from "../../../lib/axios";
function KelolaPenduduk() {
  const columns = [
    {
      title: "Id",
      width: 50,
      dataIndex: "id_penduduk",
      key: "id_penduduk",
      fixed: "left",
    },
    {
      title: "Nama",
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
      title: "NO. KK",
      dataIndex: "no_kk",
      key: "3",
      width: 150,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "1",
      width: 150,
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
      width: 150,
    },
    {
      title: "Nomor Telp",
      dataIndex: "nomor_telp",
      key: "2",
      width: 150,
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggal_lahir",
      key: "4",
      width: 150,
    },
    {
      title: "Tempat Lahir",
      dataIndex: "tempat_lahir",
      key: "8",
      width: 150,
    },
    {
      title: "Darah",
      dataIndex: "darah",
      key: "5",
      width: 70,
    },
    {
      title: "Status Tinggal",
      dataIndex: "status_tinggal",
      key: "6",
      width: 130,
    },
    {
      title: "Status Penduduk",
      dataIndex: "status_diri",
      key: "7",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 200,
      render: () => (
        <div className="flex text-white gap-3">
          <Button className="bg-manggo">
            <Link>Edit</Link>
          </Button>
          <Button className="bg-darksky text-white " type="default">
            <Link className="">Hapus</Link>
          </Button>
        </div>
      ),
    },
  ];
  const [dataPenduduk, setdataPenduduk] = useState([]);

  const handleGetDataPenduduk = async () => {
    try {
      const response = await axiosInstance.get(
        `/administrasikelurahan/src/api/fetchDataPenduduk.php`
      );
      setdataPenduduk(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // download page as pdf atribute
  // const pdfRef = useRef();
  // const handleDownloadPage = () => {
  //   const input = pdfRef.current;
  //   html2canvas(input).then((canvas) => {
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("l", "px", "a4", true);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = canvas.width;
  //     const imgHeight = canvas.height;
  //     const ratio = Math.min(pdfWidth / imgWidth / pdfHeight / imgHeight);
  //     const imgX = (pdfWidth - imgWidth * ratio) / 2;
  //     const imgY = 30;
  //     pdf.addImage(
  //       imgData,
  //       "PNG",
  //       imgX,
  //       imgY,
  //       imgWidth * ratio,
  //       imgHeight * ratio
  //     );
  //     pdf.save("Data Penduduk.pdf");
  //   });
  // };

  useEffect(() => {
    handleGetDataPenduduk();
  }, []);
  return (
    <div className="mx-20">
      {/* path */}
      <Header
        style={{
          backgroundColor: "white",
          margin: "16px 0",
          position: "sticky",
          top: 20,
          zIndex: 99,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link> },
          ]}
        ></Breadcrumb>
        <Button
          // onClick={showModal}
          className="flex flex-row   cursor-pointer bg-blusky text-white items-center "
          type="default"
        >
          <Link className="pr-1" to={"/TambahPenduduk"}>
            Tambah Penduduk
          </Link>
          <PlusOutlined />
        </Button>
      </Header>
      <Content
        style={{ position: "sticky", top: 400 }}
        className="p-6 bg-white min-h-[460px]"
      >
        {/* tabel */}
        <Table
          // ref={tableRef}
          columns={columns}
          dataSource={dataPenduduk}
          pagination={{ pageSize: 5 }}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          // summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
        <Space>
          <Button
            // onClick={handleDownloadPage}
            type="primary"
            className="bg-purp"
          >
            Download
          </Button>
        </Space>
      </Content>
    </div>
  );
}

export default KelolaPenduduk;
