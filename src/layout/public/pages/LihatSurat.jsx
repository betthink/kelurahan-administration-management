import React, { useEffect, useState } from "react";
import NavigatorBar from "../components/NavigatorBar";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Button, Card, List } from "antd";
export default function LihatSuratPage() {
  const user = useSelector((data) => data.userReducer.value);
  const [datapermohonanSurat, setdatapermohonanSurat] = useState([]);
  const handleGetAllPermohonan = async () => {
    const url = `/administrasikelurahan/src/api/surat/surat-by-user.php?id_user=${user.id}`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (response.status === 200) {
      setdatapermohonanSurat(data);
    }
  };
  useEffect(() => {
    handleGetAllPermohonan();
  },[] );

  return (
    <section className="">
      <NavigatorBar />
      <div className="container">
        <Header className="bg-white text-lg font-bold md:mx-10 md:pt-20 md:px-10  w-full p-0">
          <span>Lihat surat</span>
          <div className="">
            <span>Status : </span>{" "}
          </div>
        </Header>
        <Content className="md:mx-20 mt-6 md:pt-20 overflow-x-auto">
          <List
            grid={{
              gutter: 16,
              column: 2,
            }}
            dataSource={datapermohonanSurat}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.jenis_surat}>
                  <div className="flex justify-between ">
                    <span>{item.tanggal_permohonan}</span>
                    <Button
                      disabled={item.status_permohonan !== "1"}
                      className="bg-green-600 text-white hover:bg-white !hover:border-green-600 !hover:text-green-600"
                    >
                      <Link state={{ data: item }} to="/Lihat-surat">
                        Lihat
                      </Link>
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </div>
    </section>
  );
}
