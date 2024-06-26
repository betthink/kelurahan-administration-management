import React, { useEffect, useState } from "react";
import { Breadcrumb, Button } from "antd";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";

import AdminIplViews from "./components/AdminView";
import SuperAdminView from "../penduduk/components/SuperAdminView";
import ButtonGroup from "antd/es/button/button-group";

function KelolaIPL() {
  const [isLoading, setisLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.value);
  const [data, setdata] = useState([]);

  const handleGetDataIPL = async () => {
    const url = `/administrasikelurahan/src/api/fetchDataPembayarIPLJoinDataPendudukByRT.php?rt=${user.rt}&rw=${user.rw}`;

    try {
      const res = await axiosInstance.get(url);
       const valid = res.data.filter((item) => item.verifikator !== null);
      setdata(
       valid.map((item, index) => {
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
        <Header
          style={{
            position: "sticky",
            // top: 0,
            zIndex: 99,
          }}
          className="header-breadcrump hidden md:flex border-b-2"
        >
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

          <ButtonGroup>
            <Button className="bg-green-600 text-white hover:bg-white hover:border-green-600 hover:text-green-600">
              <Link to="/Dashboard/Laporan-keuangan" className="text-green-600">
                Riwayat keuangan
              </Link>
            </Button>
            <Button className="bg-purp text-white hover:bg-white hover:red-green-600 hover:text-green-600">
              <Link
                to="/Dashboard/Kelola-IPL/list-belum-lunas"
                className="text-green-600"
              >
                Belum lunas
              </Link>
            </Button>
            <Button className="bg-pink-800 text-white hover:bg-white hover:red-green-600 hover:text-green-600">
              <Link
                to="/Dashboard/Kelola-IPL/Verifikasi-Pembayaran-Transfer"
                className="text-green-600"
              >
                Verifikasi pembayaran transfer
              </Link>
            </Button>
          </ButtonGroup>
        </Header>
        <AdminIplViews data={data} loading={isLoading} />
      </div>
    );
  }
}

export default KelolaIPL;
