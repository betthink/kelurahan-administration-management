import { Breadcrumb, Button, Table } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTampilkanData from "../posyandu/components/ModalTampilkanData";
import ModalPersetujuanAkun from "./components/Modal/ModalPersetujuanAkun";

export default function VerifikasiPenduduk() {
  const [data, setData] = useState([]);
  const [openDetail, setopenDetail] = useState(null);
  const [dataDetail, setdataDetail] = useState(null);
  // atributes modal
  const [IsModalConfirmPersetujuanAkun, setIsModalConfirmPersetujuanAkun] = useState(false);
  const [dataConfirm, setdataConfirm] = useState(false);

  const handleGetPendudukRegister = async () => {
    const url = `/administrasikelurahan/src/api/penduduk/fetch_register_penduduk.php`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    setData(
     data.map((item, index) => {
        return { ...item, key: index.toString() };
      })
    );
  };
  const handleOpenDetail = async (item) => {
    setdataDetail(item);
    setopenDetail(true);
  };
  const handleCancel = () => {
    setopenDetail(false);
  };

  //   is Confirm

  const handleIsConfirmPersetujuan = (data) => {
    setIsModalConfirmPersetujuanAkun(true);
    setdataConfirm(data);
  };
  // column
  const columnPenduduk = [
    {
      title: "Nama pendaftar",
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
      title: "Nomor Telpon",
      width: 100,
      dataIndex: "nomor_telp",
      key: "nomor_telp",
    },
    {
      title: "Status ",
      width: 50,
      dataIndex: "valid",
      key: "valid",
      render: (data) => (
        <span
          className={`
            ${
              data == 1
                ? "text-green-500 bg-green-100  "
                : "text-red-400 bg-red-200 "
            } p-1 rounded-sm w-fit `}
        >
          {data == 1 ? "Disetujui" : "Belum"}
        </span>
      ),
    },

    {
      title: "#",
      key: "action",
      fixed: "right",
      width: 100,
      render: (data) => (
        <div className="flex text-white gap-3">
          <Button
            onClick={() => handleOpenDetail(data)}
            className="bg-green-600 hover:bg-white hover:border-green-600 text-white "
            type="default"
          >
            Detail
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

  useEffect(() => {
    handleGetPendudukRegister();
  }, []);
  return (
    <section className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          className=""
          items={[
            { title: "Admin" },
            { title: <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link> },
          ]}
        />
      </Header>
      <Table columns={columnPenduduk} dataSource={data} />
      <ModalTampilkanData
        data={dataDetail}
        isOpen={openDetail}
        onCancel={handleCancel}
        title={
          <p>
            Detail data
            <span className="text-red-700">{dataDetail?.nama}</span>
          </p>
        }
      />

      {/* modal persetujuan */}
      <ModalPersetujuanAkun
        isOpen={IsModalConfirmPersetujuanAkun}
        handleOpen={setIsModalConfirmPersetujuanAkun}
        dataConfirm={dataConfirm}
      />
    </section>
  );
}
