import { Breadcrumb, Card, List } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

export default function LihatDetailKeluarga() {
  const [dataKeluarga, setdataKeluarga] = useState([]);
  const location = useLocation();
  const data = location.state.data;
  const noKK = data.no_kk;
  const handleGetDataKeluarga = async () => {
    const url = `/administrasikelurahan/src/api/fetchDataPendudukbyNoKK.php?no_kk=${noKK}`;
    try {
      const response = await axiosInstance.get(url);
      const data = response.data;
      if (response.status === 200) {
        setdataKeluarga(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetDataKeluarga();
  }, []);
  return (
    <section className="mx-20">
      <Header className="header-breadcrump">
        <div className="flex flex-row  justify-between items-center">
          <Breadcrumb
            className="w-full"
            items={[
              { title: "Admin" },
              {
                title: "Detail informasi keluarga",
              },
            ]}
          />
        </div>
      </Header>
      <Content
        style={{ position: "sticky", top: 400 }}
        className=" min-h-[40rem]  overflow-x-auto flex flex-col gap-6"
      >
        <Card
          title="Kepala keluarga"
          bordered={false}
          style={
            {
              // width: 300,
            }
          }
        >
          <div className="grid grid-cols-2">
            <span>Nama</span>
            <span className="text-green-600">{data.nama}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>NIK</span>
            <span className="text-green-600">{data.nik}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Tanggal Lahir</span>
            <span className="text-green-600">{data.tanggal_lahir}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Tempat Lahir</span>
            <span className="text-green-600">{data.tempat_lahir}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Pekerjaan</span>
            <span className="text-green-600">{data.pekerjaan}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Jenis kelamin</span>
            <span className="text-green-600">{data.jenis_kelamin}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Darah</span>
            <span className="text-green-600">{data.darah}</span>
          </div>
          <div className="grid grid-cols-2">
            <span>Status</span>
            <span className="text-green-600">{data.status_diri}</span>
          </div>
        </Card>
        <List
          grid={{
            gutter: 16,
            column: 2,
          }}
          dataSource={dataKeluarga}
          renderItem={(item) => (
            <List.Item>
              <Card className=" " title="Anggota keluarga">
                <div className="grid grid-cols-2 ">
                  <span>Nama</span>
                  <span className="text-green-600">{item.nama}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>NIK</span>
                  <span className="text-green-600">{item.nik}</span>
                </div>

                <div className="grid grid-cols-2">
                  <span>Tanggal Lahir</span>
                  <span className="text-green-600">{item.tanggal_lahir}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Tempat Lahir</span>
                  <span className="text-green-600">{item.tempat_lahir}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Pekerjaan</span>
                  <span className="text-green-600">{item.pekerjaan}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Jenis kelamin</span>
                  <span className="text-green-600">{item.jenis_kelamin}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Darah</span>
                  <span className="text-green-600">{item.darah}</span>
                </div>
                <div className="grid grid-cols-2">
                  <span>Status</span>
                  <span className="text-green-600">{item.status_diri}</span>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </section>
  );
}
