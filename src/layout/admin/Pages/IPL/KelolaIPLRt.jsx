import { Breadcrumb, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListPesertaIPL from "./components/ListPesertaIPL";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ButtonGroup from "antd/es/button/button-group";

export default function KelolaIPLRt() {
  const location = useLocation();
  const dataLoc = location.state;
  // console.log(dataLoc);
  const [data, setdata] = useState([]);
  const handleGetDataIPL = async () => {
    const url = `/administrasikelurahan/src/api/fetchDataPembayarIPLJoinDataPendudukByRT.php?rt=${dataLoc.rt}&rw=${dataLoc.rw}`;
    try {
      const res = await axiosInstance.get(url);
      setdata(
        res.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
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
            { title: "Admin" },
            { title: <Link to={"/Dashboard/Kelola-IPL"}>Kelola IPL</Link> },
          ]}
        />
        <ButtonGroup>
          <Button className="bg-green-500 text-white hover:bg-white hover:border-green-600 hover:text-green-600">
            <Link
              state={dataLoc}
              to="/Dashboard/Laporan-keuangan"
              className="text-green-600"
            >
              Riwayat keuangan
            </Link>
          </Button>
          <Button className="bg-purp text-white hover:bg-white hover:red-green-600 hover:text-green-600">
            <Link
              state={dataLoc}
              to="/Dashboard/Kelola-IPL/list-belum-lunas"
              className="text-green-600"
            >
              Belum lunas
            </Link>
          </Button>
        </ButtonGroup>
      </Header>
      <ListPesertaIPL data={data} />
    </div>
  );
}
