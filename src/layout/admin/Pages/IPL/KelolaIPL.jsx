import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";

import AdminIplViews from "./components/AdminView";
import SuperAdminView from "../penduduk/components/SuperAdminView";

function KelolaIPL() {
  const [isLoading, setisLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.value);
  const [data, setdata] = useState([]);

  const handleGetDataIPL = async () => {
    const url = `/administrasikelurahan/src/api/fetchDataPembayarIPLJoinDataPendudukByRT.php?rt=${user.rt}&rw=${user.rw}`;
        
    try {
      const res = await axiosInstance.get(url);
      setdata(
        res.data.map((item, index) => {
          return { ...item, key: index.toString() };
        })
      );
      setisLoading(false);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleGetDataIPL();
  }, []);

  // conditional rendering
  if (user.role === "super_admin") {
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
        <SuperAdminView
          titlelink={"Lihat pembayar"}
          redirect="/Dashboard/list-peserta-ipl"
        />
      </div>
    );
  } else {
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
        <AdminIplViews data={data} loading={isLoading} />
      </div>
    );
  }
}

export default KelolaIPL;
