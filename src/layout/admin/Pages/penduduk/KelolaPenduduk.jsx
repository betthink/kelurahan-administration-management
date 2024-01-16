// lib
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Space, Input, message as mes, Spin } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Header, Content } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { CgDetailsMore } from "react-icons/cg";
import { useDebounce } from "use-debounce";
import { useSelector } from "react-redux";
import ModalTampilkanData from "../posyandu/components/ModalTampilkanData";
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
    console.log(res.data);
    if (value === 1) {
      mes.success(message);
      window.location.reload();
    } else {
      mes.error(message);
    }
  };
  const handleOpenDetail = async (item) => {
    await setdataDetail(item);
    setopenDetail(true);
  };
  const handleGetDataPenduduk = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/penduduk/fetch_kepala_keluarga.php?rt=${user.rt}&rw=${user.rw}`
        : `/administrasikelurahan/src/api/fetchDataPenduduk.php`;
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
                  <Link to={"/Dashboard/Kelola-Penduduk"}>Kelola Penduduk</Link>
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
      <Content
        style={{ position: "sticky", top: 400 }}
        className=" min-h-[40rem]  overflow-x-auto"
      >
        {/* tabel */}
        {isLoading ? (
          <div className=" flex flex-col mt-[10rem] justify-center w-full items-center ">
            <Spin />
          </div>
        ) : (
          <div className="min-w-full bg-white p-10  rounded-md mb-10  overflow-x-auto">
            <table className="w-full">
              <thead className=" border-b  ">
                <tr className="text-xs font-bold  ">
                  {/* <th className="py-2 whitespace-nowrap px-4 font-normal">
                    ID
                  </th> */}
                  <th className="py-2 whitespace-nowrap px-4 font-normal">
                    Name
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal">
                    NIK
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal">
                    Nomor telepon
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal">
                    Alamat
                  </th>

                  <th className="py-2 whitespace-nowrap px-4 font-normal ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPenduduk.map((item, i) => (
                  <React.Fragment key={item.id_penduduk}>
                    <tr
                      className={`${
                        i % 2 === 0 ? "bg-primary" : "bg-secondary"
                      }  text-xs  `}
                      key={item.id_penduduk}
                    >
                      {/* <td className="py-2 whitespace-nowrap px-4 text-center ">
                        {item.id_penduduk}
                      </td> */}
                      <td className="py-2 whitespace-nowrap px-4 text-center ">
                        {item.nama}
                      </td>
                      <td className="py-2 whitespace-nowrap px-4 text-center ">
                        {item.nik}
                      </td>
                      <td className="py-2 whitespace-nowrap px-4 text-center ">
                        {item.nomor_telp}
                      </td>
                      <td className="py-2 whitespace-nowrap px-4 text-center ">
                        {item.alamat}
                      </td>
                      {user.role === "super_admin" ? (
                        <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                          <Button
                            className="border-none text-manggo"
                            onClick={() => handleOpenDetail(item)}
                            type="default"
                          >
                            <CgDetailsMore size={22} />
                          </Button>
                          <Button className="border-none">
                            <Link
                              state={{ data: item }}
                              to={"/Dashboard/Detail-keluarga"}
                            >
                              <span className="text-red-700">Lihat</span>
                              {/* <EditOutlined
                                style={{ fontSize: "1.2rem" }}
                                className="text-red-600"
                              /> */}
                            </Link>
                          </Button>
                        </td>
                      ) : (
                        <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                          <Button className="border-none">
                            <Link
                              state={{ data: item }}
                              to={"/Dashboard/Update-Penduduk"}
                            >
                              <EditOutlined
                                style={{ fontSize: "1.2rem" }}
                                className="text-success"
                              />
                            </Link>
                          </Button>

                          <Button
                            className="border-none text-manggo"
                            onClick={() => handleOpenDetail(item)}
                            type="default"
                          >
                            <CgDetailsMore size={22} />
                          </Button>
                          <Button className="border-none">
                            <Link
                              state={{ data: item }}
                              to={"/Dashboard/Detail-keluarga"}
                            >
                              <span className="text-red-700">Lihat</span>
                              {/* <EditOutlined
                                style={{ fontSize: "1.2rem" }}
                                className="text-red-600"
                              /> */}
                            </Link>
                          </Button>
                          <Button
                            className="border-none"
                            onClick={() =>
                              handleDeletePenduduk(item.id_penduduk)
                            }
                            type="default"
                          >
                            <DeleteOutlined
                              style={{ fontSize: "1.2rem" }}
                              className="text-danger"
                            />
                          </Button>
                        </td>
                      )}

                      {/* modal */}
                    </tr>
                    <ModalTampilkanData
                      data={dataDetail}
                      isOpen={openDetail}
                      onCancel={handleCancel}
                      title={
                        <p>
                          Detail data
                          <span className="text-red-700">
                            {dataDetail?.nama}
                          </span>
                        </p>
                      }
                    />
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Content>
    </div>
  );
}

export default KelolaPenduduk;
