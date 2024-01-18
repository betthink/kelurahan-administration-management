import { Breadcrumb } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListPesertaIPL from "./components/ListPesertaIPL";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";

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
      </Header>
      <ListPesertaIPL data={data} />
    </div>
  );
}
