import { Button, Spin, Table } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Content } from "antd/es/layout/layout";
import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import { TiDocumentText } from "react-icons/ti";
import { Link } from "react-router-dom";

export default function AdminIplViews({ loading, data }) {
  const columnIPL = [
    {
      title: "Nama kepala keluarga",
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
      title: "Status tinggal",
      width: 100,
      dataIndex: "status_tinggal",
      key: "status_tinggal",
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 160,
      render: (item) => (
        <ButtonGroup>
          <Button className="border-none text-success">
            <Link
              className="flex justify-center items-center "
              state={{ data: item }}
              to={"DetailRiwayatPembayaran"}
            >
              <CgDetailsMore size={22} className="" />
              <p>Detail pembayaran</p>
            </Link>
          </Button>
          <Button className="border-none text-manggo" type="default">
            <Link
              state={{ data: item }}
              to={"Verifikasi-Pembayaran"}
              className=" flex justify-center items-center"
            >
              <TiDocumentText size={22} />
              <p>Verifikasi</p>
            </Link>
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  return (
    <Content className="p-6 bg-white min-h-[40rem]">
      {loading ? (
        <div className=" flex flex-col mt-[10rem] justify-center w-full items-center ">
          <Spin />
        </div>
      ) : (
        <div className="min-w-full bg-white p-10  rounded-md mb-10 overflow-x-auto">
          <Table columns={columnIPL} dataSource={data} />
        </div>
      )}
    </Content>
  );
}
