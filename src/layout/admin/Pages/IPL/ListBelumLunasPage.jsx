import { Breadcrumb, Button, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function ListBelumLunasPage() {
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const dataRoute = location.state;
  const rt = user.rt == "" ? dataRoute.rt : user.rt;
  const [data, setData] = useState([]);
  const column = [
    {
      title: "Nama",
      width: 100,
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "#",
      width: 100,
      key: "action",
      render: (data) => (
        <Button className="bg-purp text-white hover:bg-white hover:border-purp">
          <Link
            state={{ data: data }}
            to={"/Dashboard/Kelola-IPL/DetailRiwayatPembayaran"}
          >
            Lihat Riwayat
          </Link>
        </Button>
      ),
    },
  ];
  const handleGetListPembayaranBelumLunas = async () => {
    const url = `/administrasikelurahan/src/api/ipl/list-belum-lunas-by-rt.php?rt=${rt}`;

    try {
      const response = await axiosInstance.get(url);
      const data = response.data;
      setData(
        data.map((item, index) => {
          return {
            ...item,
            key: parseInt(index),
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  };
  const belumLunas = data?.filter((item) => item.status === "belum lunas");
  useEffect(() => {
    handleGetListPembayaranBelumLunas();
  }, []);
  return (
    <section className="mx-20">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 99,
        }}
        className="header-breadcrump hidden md:flex border-b-2"
      >
        <Breadcrumb
          className=""
          items={[
            { title: "Admin" },
            { title: <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link> },
            { title: <p>Daftar Belum Lunas</p> },
          ]}
        />
      </Header>
      <Content className="p-6 bg-white min-h-[30rem]">
        <Table columns={column} dataSource={belumLunas} />
      </Content>
    </section>
  );
}
