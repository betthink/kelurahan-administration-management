import React, { useEffect, useState } from "react";
import { Breadcrumb, theme, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ButtonGroup from "antd/es/button/button-group";

function KelolaIPL() {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const columns = [
    {
      title: "Id",
      render: (text) => (
        <div className=" p-2 justify-self-center  self-center">{text}</div>
      ),
      dataIndex: "id_ipl",
      key: "id_ipl",
      fixed: "left",
      width: 20,
    },
    {
      title: "Nama Kepala Keluarga",
      dataIndex: "nama_kepala_keluarga",
      key: "nama",
      width: 100,
    },
    {
      title: "NIK",

      dataIndex: "nik",
      key: "NIK",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status_tinggal",
      key: "Status",
      width: 50,
    },
    {
      title: "Status Pembayaran",
      dataIndex: "status_ipl",
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
        <ButtonGroup>
          <Button className="bg-manggo text-white">
            <Link to={"/VerifikasiPembayaran"}>detail</Link>
          </Button>
          <Button className="bg-darksky text-white " type="default">
            <Link to={"/VerifikasiPembayaran"} className="">
              verifikasi
            </Link>
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  const handleGetDataIPL = async () => {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataVerifikasiPembayaran.php"
      );
      setdata(res.data);
      setisLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleGetDataIPL();
  }, []);
  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          className=""
          items={[
            { title: "Home" },
            { title: <Link to={"KelolaIPL"}>Kelola IPL</Link> },
          ]}
        />
      </Header>
      <Content className="p-6 bg-white min-h-[40rem]">
        <Table
          pagination={{ pageSize: 5 }}
          columns={columns}
          dataSource={data}
          loading={isLoading}
          // scroll={{
          //   x: 1500,
          // }}
          summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
      </Content>
    </div>
  );
}

export default KelolaIPL;
