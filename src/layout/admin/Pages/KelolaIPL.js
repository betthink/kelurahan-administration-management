import React from "react";
import { Breadcrumb, theme, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";

function KelolaIPL() {
  const columns = [
    {
      title: "Id",
      width: 8,
      dataIndex: "Id",
      key: "Id",
      fixed: "left",
    },
    {
      title: "Nama Kepala Keluarga",
      width: 20,
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIK",
      width: 20,
      dataIndex: "NIK",
      key: "NIK",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 20,
    },
    {
      title: "Status Pembayaran",
      dataIndex: "StatusPembayaran",
      key: "StatusPembayaran",
      width: 20,
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
      width: 14,
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
