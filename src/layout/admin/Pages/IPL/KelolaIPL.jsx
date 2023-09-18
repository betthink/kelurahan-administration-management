import React from "react";
import { Breadcrumb, theme, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";

function KelolaIPL() {
  const columns = [
    {
      title: "Id",
      render: (text) => (
        <div className=" p-2 justify-self-center  self-center">{text}</div>
      ),
      dataIndex: "Id",
      key: "Id",
      fixed: "left",
      width: 20,
    },
    {
      title: "Nama Kepala Keluarga",
      dataIndex: "nama",
      key: "nama",
      width: 100,
    },
    {
      title: "NIK",

      dataIndex: "NIK",
      key: "NIK",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 50,
    },
    {
      title: "Status Pembayaran",
      dataIndex: "StatusPembayaran",
      key: "StatusPembayaran",
      width: 100,

      filters: [
        { text: "Lunas", value: true },
        { text: "Belum", value: false },
      ],
      onFilter: (value, record) => {
        return record.StatusPembayaran === value;
      },
    },

    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 70,
      render: () => (
        <div className="flex text-white gap-3">
          <Button className="bg-manggo">
            <Link to={"/VerifikasiPembayaran"}>detail</Link>
          </Button>
          <Button className="bg-darksky text-white " type="default">
            <Link to={"/VerifikasiPembayaran"} className="">
              verifikasi
            </Link>
          </Button>
        </div>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    const status = [true, false];
    const randomIndex = Math.floor(Math.random() * status.length);
    const randomStatus = status[randomIndex];
    data.push({
      key: i,
      Id: i + 1,
      nama: `Edward ${i}`,
      NIK: `  ${Math.random()}`,
      Status: `Tetap`,
      StatusPembayaran: randomStatus ? "Lunas" : "Belum",
    });
  }

  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          className=""
          items={[
            { title: "Home" },
            { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },
          ]}
        />
      </Header>
      <Content className="p-6 bg-white ">
        <Table
          pagination={{ pageSize: 5 }}
          columns={columns}
          dataSource={data}
          // loading={setTimeout}
          scroll={{
            x: 1500,
          }}
          summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
      </Content>
    </div>
  );
}

export default KelolaIPL;
