import React, { useEffect, useState } from "react";
import { Breadcrumb, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ButtonGroup from "antd/es/button/button-group";
import { useSelector } from "react-redux";
import { useDebounce } from "use-debounce";

function KelolaIPL() {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const user = useSelector((state) => state.userReducer.value);

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

  // const RenderStatus = () => {
  //   const url = `/administrasikelurahan/src/api/fetchDataRiwayatPembayaranByIduser.php?id_user=${id}`;
  //   const res = axiosInstance.get(url);
  //   const { status, data } = res;

  //   if (status === 200) {
  //     const id_pembayaran_values = data.map((item) => item.id_pembayaran);
  //     const max_id_pembayaran = Math.max(...id_pembayaran_values);
  //     const lastData = data.filter(
  //       (item) => parseInt(item.id_pembayaran) === max_id_pembayaran
  //     );

  //     const dateVerifikasi = new Date(lastData[0].waktu_verifikasi);
  //     const yearVerifikasi = dateVerifikasi.getFullYear();
  //     const monthVerifikasi = dateVerifikasi.getMonth() + 1;
  //     const currentDate = new Date();
  //     const currentYear = currentDate.getFullYear();
  //     const currentMonth = currentDate.getMonth() + 1;

  //     const isMatch =
  //       yearVerifikasi === currentYear && monthVerifikasi === currentMonth;
  //     console.log(isMatch);
  //     return (
  //       <div
  //         className={`p-1 rounded items-center justify-center flex w-fit ${
  //           isMatch ? "bg-green-100" : "bg-red-200"
  //         }`}
  //       >
  //         <p className={`${isMatch ? "text-green-500" : "text-red-700"}`}>
  //           {isMatch ? "Lunas" : "Terhutang"}
  //         </p>
  //       </div>
  //     );
  //   }
  // }
  const columns = [
    {
      title: "Id",
      render: (text) => (
        <div className=" p-2 justify-self-center  self-center">{text}</div>
      ),
      dataIndex: "id",
      key: "id",
      fixed: "left",
      width: 40,
    },
    {
      title: "Nama Kepala Keluarga",
      dataIndex: "nama",
      key: "nama",
      width: 100,
    },
    {
      title: "NIK",
      dataIndex: "nik",
      key: "NIK",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status_tinggal",
      key: "Status",
      width: 50,
    },

    {
      title: "Status Pembayaran",
      dataIndex: "id_user",
      key: "id_user",
      width: 80,
      render: (id) => {
        const url = `/administrasikelurahan/src/api/fetchDataRiwayatPembayaranByIduser.php?id_user=${id}`;
        const res = axiosInstance.get(url);
        const { status, data } = res;

        if (status === 200) {
          const id_pembayaran_values = data.map((item) => item.id_pembayaran);
          const max_id_pembayaran = Math.max(...id_pembayaran_values);
          const lastData = data.filter(
            (item) => parseInt(item.id_pembayaran) === max_id_pembayaran
          );

          const dateVerifikasi = new Date(lastData[0].waktu_verifikasi);
          const yearVerifikasi = dateVerifikasi.getFullYear();
          const monthVerifikasi = dateVerifikasi.getMonth() + 1;
          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;

          const isMatch =
            yearVerifikasi === currentYear && monthVerifikasi === currentMonth;
          console.log(isMatch);
          return (
            <div
              className={`p-1 rounded items-center justify-center flex w-fit ${
                isMatch ? "bg-green-100" : "bg-red-200"
              }`}
            >
              <p className={`${isMatch ? "text-green-500" : "text-red-700"}`}>
                {isMatch ? "Lunas" : "Terhutang"}
              </p>
            </div>
          );
        }
      },

      filters: [
        { text: "Lunas", value: 1 },
        { text: "Terhutang", value: 0 },
      ],
      onFilter: (value, record) => {
        console.log(record);
        return parseInt(record.status_ipl) === value;
      },
    },
    ...(user.role === "admin"
      ? [
          {
            title: "Action",
            key: "action",
            fixed: "right",
            width: 70,
            render: (data) => (
              <ButtonGroup>
                <Button className="bg-manggo text-white">
                  <Link state={{ data }} to={"DetailRiwayatPembayaran"}>
                    detail
                  </Link>
                </Button>
                <Button className="bg-darksky text-white " type="default">
                  <Link
                    state={{ data }}
                    to={"Verifikasi-Pembayaran"}
                    className=""
                  >
                    verifikasi
                  </Link>
                </Button>
              </ButtonGroup>
            ),
          },
        ]
      : []),
  ];
  const [dataSearch, setdataSearch] = useState(null);
  const [debouncedValue] = useDebounce(dataSearch, 500);
  const [lastData, setLastData] = useState([]);
  // functions --

  const handleSearch = (event) => {
    setdataSearch(event);
  };
  const handleChange = (event) => {
    setdataSearch(event.target.value);
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
        <Table
          pagination={{ pageSize: 5 }}
          columns={columns}
          dataSource={data}
          loading={isLoading}
          summary={() => <Table.Summary fixed={"top"} />}
          sticky
        />
      </Content>
    </div>
  );
}

export default KelolaIPL;
