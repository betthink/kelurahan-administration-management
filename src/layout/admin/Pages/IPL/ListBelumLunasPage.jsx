import { Breadcrumb, Button, Card, List, Table } from "antd";
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
  const [list, setlist] = useState([]);
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
      // console.log(data);
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
  function calculateTimeDifference(dateString) {
    const moment = require("moment");
    const date = moment(dateString, "YYYY-MM-DD", true);

    if (!date.isValid()) {
      return dateString;
    }
    const now = moment();
    const diff = moment.duration(now.diff(date));

    const months = Math.floor(diff.asMonths());
    const days = Math.floor(diff.asDays() - months * 30);

    return `${months} bulan ${days} hari`;
  }
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
        <List
          grid={{
            gutter: 16,
            column: 2,
          }}
          dataSource={belumLunas}
          renderItem={(item) => (
            <List.Item>
              <Card
                extra={
                  <div>
                    <div className="text-xs">Terakhir membayar</div>
                    <div className="text-lg text-red-600">
                      {calculateTimeDifference(item.pembayaran_terakhir)}
                    </div>
                  </div>
                }
                className=""
                title={
                  <span className="text-red-600 uppercase">{item?.status}</span>
                }
              >
                <div className="grid grid-cols-2 ">
                  <div>
                    <span className="text-lg">{item.user_name}</span>
                  </div>
                  <Button className="bg-purp text-white hover:bg-white hover:border-purp">
                    <Link
                      state={{ data: item }}
                      to={"/Dashboard/Kelola-IPL/DetailRiwayatPembayaran"}
                    >
                      Lihat Riwayat
                    </Link>
                  </Button>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </section>
  );
}
