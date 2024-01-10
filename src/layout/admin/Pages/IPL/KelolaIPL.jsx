import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Button, Spin } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { TiDocumentText } from "react-icons/ti";
import { CgDetailsMore } from "react-icons/cg";

function KelolaIPL() {
  const [isLoading, setisLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.value);
  const [data, setdata] = useState([]);

  const handleGetDataIPL = async () => {
    const url =
      user.role === "admin"
        ? `/administrasikelurahan/src/api/fetchDataPembayarIPLJoinDataPendudukByRT.php?rt=${user.rt}`
        : `/administrasikelurahan/src/api/fetchDataPembayarIPLJoinDataPenduduk.php`;
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
  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          className=""
          items={[
            { title: "Home" },
            { title: <Link to={"KelolaIPL"}>Kelola IPL</Link> },
          ]}
        />
      </Header>
      <Content className="p-6 bg-white min-h-[40rem]">
        {isLoading ? (
          <div className=" flex flex-col mt-[10rem] justify-center w-full items-center ">
            <Spin />
          </div>
        ) : (
          <div className="min-w-full bg-white p-10  rounded-md mb-10 overflow-x-auto">
            <table className="w-full ">
              <thead className=" border-b   ">
                <tr className="text-xs  ">
                  {/* <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                    ID
                  </th> */}
                  <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                    Nama Kepala Keluarga
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                    NIK
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                    Status Tinggal
                  </th>
                  <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                    Status Pembayaran
                  </th>

                  <th className="py-2 whitespace-nowrap px-4 font-normal text-center ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, i) => (
                  <tr
                    className={`${
                      i % 2 === 0 ? "bg-primary" : "bg-secondary"
                    } text-four `}
                    key={item.id}
                  >
                    {/* <td className="py-2 whitespace-nowrap px-4 text-start ">
                      {item.id}
                    </td> */}
                    <td className="py-2 whitespace-nowrap px-4 text-start ">
                      {item.nama}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-start ">
                      {item.nik}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-start ">
                      {item.status_tinggal}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-start">
                      {/* {getStatusPembayaran(item.id_user)} */}

                      <div
                        className={`p-1 rounded items-center justify-center flex w-fit bg-green-100
                        }`}
                      >
                        <p
                          className={`text-green-500
                          `}
                        >
                          Lunas
                        </p>
                      </div>
                    </td>

                    <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                      <Button className="border-none text-success">
                        <Link
                          className="flex justify-center items-center "
                          state={{ data: item }}
                          to={"DetailRiwayatPembayaran"}
                        >
                          <CgDetailsMore size={22} className="" />
                          <p>Detail</p>
                        </Link>
                      </Button>
                      {user.role === "super_admin" ? null : (
                        <Button
                          className="border-none text-manggo"
                          type="default"
                        >
                          <Link
                            state={{ data: item }}
                            to={"Verifikasi-Pembayaran"}
                            className=" flex justify-center items-center"
                          >
                            <TiDocumentText size={22} />
                            <p>Verifikasi</p>
                          </Link>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Content>
    </div>
  );
}

export default KelolaIPL;
