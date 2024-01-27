// lib
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Input, message as mes } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import ModalTampilkanData from "../posyandu/components/ModalTampilkanData";
import AdminView from "./components/AdminView";
import SuperAdminView from "./components/SuperAdminView";
import { MdInfo } from "react-icons/md";
// components
function KelolaPenduduk() {
  // variables --
  const user = useSelector((state) => state.userReducer.value);
  const [isLoading, setIsloading] = useState(true);
  const { Search } = Input;
  const [dataPenduduk, setdataPenduduk] = useState([]);
  // filter data penduduk
  const [openDetail, setopenDetail] = useState(null);
  const [dataDetail, setdataDetail] = useState(null);

  const handleCancel = () => {
    setopenDetail(false);
  };
  const [dataSearch, setDataSearch] = useState(null); // Inisialisasi dengan nilai default
  const [debouncedValue] = useDebounce(dataSearch, 500);

  const filteredItems =
    debouncedValue !== null
      ? dataPenduduk.filter((item) => {
          return (
            item.nama.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            item.nik.includes(debouncedValue.toLowerCase())
          );
        })
      : dataPenduduk;

  const handleSearch = (event) => {
    setDataSearch(event);
  };

  const handleChange = (event) => {
    setDataSearch(event.target.value);
  };

  const handleDeletePenduduk = async (id) => {
    const res = await axiosInstance(
      "/administrasikelurahan/src/delete/delDataPenduduk.php",
      {
        method: "post",
        data: {
          id_penduduk: id,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { value, message } = res.data;
    if (value === 1) {
      mes.success(message);
      window.location.reload();
    } else {
      mes.error(message);
    }
  };
  const handleOpenDetail = async (item) => {
    setdataDetail(item);
    setopenDetail(true);
  };
  const handleGetDataPenduduk = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/penduduk/fetch_kepala_keluarga.php?rt=${user.rt}&rw=${user.rw}`
        : `/administrasikelurahan/src/api/penduduk/fetch_all_kepala_keluarga.php`;
    try {
      const response = await axiosInstance.get(url);
      setdataPenduduk(
        response.data.map((item, index) => {
          return { ...item, key: index };
        })
      );
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetDataPenduduk();
  },);
  if (user.role === "admin") {
    return (
      <div className="mx-20">
        {/* path */}
        <Header
          style={{
            position: "sticky",
            // top: 0,
            zIndex: 99,
          }}
          className="hidden  header-breadcrump bg-white items-center md:flex  "
        >
          <div className="flex flex-row  justify-between items-center">
            <Breadcrumb
              className="w-full"
              items={[
                { title: "Admin" },
                {
                  title: (
                    <Link to={"/Dashboard/Kelola-Penduduk"}>
                      Kelola Penduduk
                    </Link>
                  ),
                },
              ]}
            />
            <Search
              onChange={handleChange}
              placeholder="Cari penduduk ..."
              onSearch={handleSearch}
              // enterButton
            />
          </div>
          <ButtonGroup>
            <Button
              className="flex flex-row   cursor-pointer bg-third hover:text-third hover:bg-white  hover:border-third text-white items-center "
              type="default"
            >
              <Link className="pr-{item.}" to={"/Dashboard/Tambah-Penduduk"}>
                Tambah Penduduk
              </Link>
              <PlusOutlined />
            </Button>
            <Button
              className="flex flex-row   cursor-pointer bg-green-600 hover:text-third hover:bg-white  hover:border-green-600 text-white items-center "
              type="default"
            >
              <Link
                className="pr-{item.}"
                to={"/Dashboard/Kelola-Penduduk/verifikasi-penduduk"}
              >
                Verifikasi akun
              </Link>
              <MdInfo />
            </Button>
          </ButtonGroup>
        </Header>
        {/* admin view */}
        <AdminView
          data={dataSearch !== null ? filteredItems : dataPenduduk}
          loading={isLoading}
          handleDelete={handleDeletePenduduk}
          handleOpen={handleOpenDetail}
        />
        <ModalTampilkanData
          data={dataDetail}
          isOpen={openDetail}
          onCancel={handleCancel}
          title={
            <p>
              Detail data
              <span className="text-red-700">{dataDetail?.nama}</span>
            </p>
          }
        />
      </div>
    );
  } else if (user.role === "super_admin") {
    return (
      <div className="mx-20">
        {/* path */}
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
          }}
          className="header-breadcrump hidden md:flex border-b-2"
        >
          <div className="flex flex-row  justify-between items-center">
            <Breadcrumb
              className="w-full"
              items={[
                { title: "Admin" },
                {
                  title: (
                    <Link to={"/Dashboard/Kelola-Penduduk"}>
                      Kelola Penduduk
                    </Link>
                  ),
                },
              ]}
            />
          </div>
        </Header>
        <SuperAdminView
          titlelink={"Lihat penduduk"}
          redirect="/Dashboard/Detail-penduduk-rt"
        />
      </div>
    );
  }
}

export default KelolaPenduduk;
