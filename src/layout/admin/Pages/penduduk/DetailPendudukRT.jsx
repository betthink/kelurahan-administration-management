import { Breadcrumb, Button, Space, Table } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ModalTampilkanData from "../posyandu/components/ModalTampilkanData";
import Search from "antd/es/input/Search";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

export default function DetailPendudukRT() {
  const location = useLocation();
  const dataRoute = location.state;
  // console.log(dataRoute);
  const [dataPenduduk, setdataPenduduk] = useState([]);
  const [openDetail, setopenDetail] = useState(null);
  const [dataDetail, setdataDetail] = useState(null);
  const user = useSelector((state) => state.userReducer.value);
  const handleGetDataPenduduk = async () => {
    const url = `/administrasikelurahan/src/api/penduduk/fetch_kepala_keluarga.php?rt=${dataRoute.rt}&rw=${dataRoute.rw}`;

    try {
      const response = await axiosInstance.get(url);
      if (response.status === 200) {
        // console.log(response.data);

        setdataPenduduk(
          response.data?.map((item, index) => {
            return { ...item, key: index.toString() };
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   atributes table
  const handleOpenDetail = async (item) => {
    setdataDetail(item);
    setopenDetail(true);
  };
  const handleCancel = () => {
    setopenDetail(false);
  };
  const columns = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
      render: (text) => <p className="text-orange-600">{text}</p>,
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      key: "alamat",
    },
    {
      title: "Pekerjaan",
      dataIndex: "pekerjaan",
      key: "pekerjaan",
    },

    {
      title: "#",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleOpenDetail(record)}
            className="text-green-600"
          >
            Detail
          </Button>
          <Button className="text-red-700">
            <Link state={{ data: record }} to={"/Dashboard/Detail-keluarga"}>
              Lihat anggota keluarga
            </Link>
          </Button>
        </Space>
      ),
    },
  ];
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
  useEffect(() => {
    handleGetDataPenduduk();
  }, []);
  return (
    <div className="mx-20">
      {/* path */}
      <Header className="header-breadcrump w-full justify-between">
        <div className="flex flex-row  w-full justify-between items-center">
          <Breadcrumb
            className="w-full"
            items={[
              { title: "Admin" },
              {
                title: (
                  <Link to={"/Dashboard/Kelola-Penduduk"}>Kelola Penduduk</Link>
                ),
              },
            ]}
          />
        </div>
        <Search
          className="w-1/2"
          onChange={handleChange}
          placeholder="Cari penduduk ..."
          onSearch={handleSearch}
          // enterButton
        />
        {user.role === "adminRW" ? (
          <Button
            className="flex flex-row   cursor-pointer bg-third hover:text-third hover:bg-white  hover:border-third text-white items-center "
            type="default"
          >
            <Link
              className=""
              state={dataRoute}
              to={"/Dashboard/Tambah-Penduduk"}
            >
              Tambah Penduduk
            </Link>
            <PlusOutlined />
          </Button>
        ) : null}
      </Header>
      <Content
        style={{ position: "sticky", top: 400 }}
        className=" min-h-[40rem]  overflow-x-auto"
      >
        <Table
          columns={columns}
          dataSource={dataSearch !== null ? filteredItems : dataPenduduk}
        />
      </Content>
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
}
