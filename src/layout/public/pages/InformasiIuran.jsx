import { Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axiosInstance";
import NavigatorBar from "../components/NavigatorBar";

export default function InformasiIuran() {
  // variables
  const [dataIuran, setdataIuran] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // function
  async function handleGetIpl() {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataVerifikasiPembayaran.php"
      );
      setdataIuran(res.data);
      setisLoading(false);
    } catch (error) {}
  }
  useEffect(() => {
    handleGetIpl();
  }, []);
  return (
    <section className="">
      <NavigatorBar />
      <Header className="bg-white">Infromasi Iuran</Header>
      <Content mx-20 pt-20>
        {/* <Table
          dataSource={dataIuran}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 7 }}
          sticky
        /> */}
      </Content>
    </section>
  );
}
