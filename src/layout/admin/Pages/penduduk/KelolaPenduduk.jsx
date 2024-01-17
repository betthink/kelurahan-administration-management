// lib
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Space,
  Input,
  message as mes,
  Spin,
  List,
} from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Header, Content } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { CgDetailsMore } from "react-icons/cg";
import { GrHomeOption } from "react-icons/gr";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import ModalTampilkanData from "../posyandu/components/ModalTampilkanData";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminView from "./components/AdminView";
import SuperAdminView from "./components/SuperAdminView";
// components
function KelolaPenduduk() {
  // variables --
  const user = useSelector((state) => state.userReducer.value);
  const [isLoading, setIsloading] = useState(true);
  const { Search } = Input;
  const [dataPenduduk, setdataPenduduk] = useState([]);
  // filter data penduduk
  const [dataSearch, setdataSearch] = useState(null);
  const [openDetail, setopenDetail] = useState(null);
  const [dataDetail, setdataDetail] = useState(null);
  const handleCancel = () => {
    setopenDetail(false);
  };
  const [debouncedValue] = useDebounce(dataSearch, 500);
  const filterItem =
    debouncedValue !== null
      ? dataPenduduk.filter((item) => {
          return (
            item.nama.toLowerCase().includes(debouncedValue.toLowerCase()) ||
            item.nik.includes(debouncedValue.toLowerCase())
          );
        })
      : dataPenduduk;
  // functions --
  const handleSearch = (event) => {
    setdataSearch(event);
  };
  const handleChange = (event) => {
    setdataSearch(event.target.value);
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
          return { ...item, key: index.toString() };
        })
      );
      setIsloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetDataPenduduk();
  }, []);
  if (user.role === "admin") {
    return (
      <div className="mx-20">
        {/* path */}
        <Header className="header-breadcrump">
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
          {user.role === "admin" ? (
            <Button
              className="flex flex-row   cursor-pointer bg-third hover:text-third hover:bg-white  hover:border-third text-white items-center "
              type="default"
            >
              <Link className="pr-{item.}" to={"/Dashboard/Tambah-Penduduk"}>
                Tambah Penduduk
              </Link>
              <PlusOutlined />
            </Button>
          ) : null}
        </Header>
        {/* admin view */}
        <AdminView
          data={dataPenduduk}
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
        <Header className="header-breadcrump">
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
        
        </Header>
        <SuperAdminView/>
      </div>
    );
  }
}

export default KelolaPenduduk;
