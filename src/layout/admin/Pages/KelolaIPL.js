import React from "react";
import { Breadcrumb, theme, Table, Button } from "antd";
import { Link } from "react-router-dom";
function KelolaIPL() {
  const columns = [
    {
      title: "Id",
      width: 50,
      dataIndex: "Id",
      key: "Id",
      fixed: "left",
    },
    {
      title: "Nama Kepala Keluarga",
      width: 100,
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "NIK",
      width: 100,
      dataIndex: "NIK",
      key: "NIK",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: 150,
    },
    {
      title: "Status Pembayaran",
      dataIndex: "StatusPembayaran",
      key: "StatusPembayaran",
      width: 150,
    },

    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 80,
      render: () => (
        <div className="flex text-white gap-3">
          <Button className="bg-manggo">
            <Link>detail</Link>
          </Button>
          <Button className="bg-darksky text-white " type="default">
            <Link className="">verifikasi</Link>
          </Button>
        </div>
      ),
    },
  ];
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i,
      Id: i + 1,
      nama: `Edward ${i}`,
      NIK: `32 ${i}`,
      Status: `Edward ${i}`,
      StatusPembayaran: `Edward ${i}`,
      StatusPembayaran: `London Park no. ${i}`,
    });
  }
  return (
    <div>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          { title: "Admin" },
          { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },
        ]}
      ></Breadcrumb>
      <div className="p-6 bg-white min-h-[800px]">
        <Table
          scroll={{
            x: 1500,
          }}
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default KelolaIPL;
