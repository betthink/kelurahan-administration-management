import { Breadcrumb } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function ListBelumLunasPage() {
  const handleGetListPembayaranBelumLunas = async () => {
    const url = "";
    const response = await axiosInstance.get(url);
    const data = response.data;
    // console.log(data);
  };
  useEffect(() => {
    // handleGetListPembayaranBelumLunas();
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
    </section>
  );
}
