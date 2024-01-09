import { Button, Spin, Table, message } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";
import NavigatorBar from "../components/NavigatorBar";
import { axiosInstance } from "../../../utils/axiosInstance";
import { CgDetailsMore } from "react-icons/cg";
import { TiDocumentText } from "react-icons/ti";
const HomePage = () => {
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const column = [
    {
      title: "Id",
      width: 100,
      dataIndex: "id",
      key: "ipl",
    },
    {
      title: "Nama kepala keluarga",
      width: 100,
      dataIndex: "nama",
      key: "nama_kepala_keluarga",
    },
    {
      title: "nik",
      width: 100,
      dataIndex: "nik",
      key: "nik",
    },
    {
      title: "status tinggal",
      width: 100,
      dataIndex: "status_tinggal",
      key: "status tinggal",
    },
    {
      title: "status pembayaran",
      width: 100,
      dataIndex: "status_pembayaran",
      key: "status",
      render: ()=>{
        return(
          <span className="text-green-600 bg-green-200 p-1" >lunas</span>
        )
      }
    },
  ];
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    message.info("Anda sudah log out");
  };

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
    <div className=" h-screen text-lg bg-primary w-full flex flex-col text-white overflow-hidden ">
      <NavigatorBar />
      <Content className="p-6 bg-white h-screen w-full ">
        {isLoading ? (
          <div className=" flex flex-col mt-[10rem] justify-center w-full items-center ">
            <Spin />
          </div>
        ) : (
          <div className="container  border shadow-md w-full">
            <div className="min-w-full  rounded-md mb-10 overflow-x-auto ">
              <Table columns={column} dataSource={data} />
            </div>
          </div>
        )}
      </Content>
    </div>
  );
};

export default HomePage;
