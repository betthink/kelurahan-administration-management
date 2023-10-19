import { Button, Card, Col, Row, message } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";
const HomePage = () => {
  const user = useSelector((state) => state.userReducer.value);
  const dispatch = useDispatch();
  const [openBar, setopenBar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
    message.info("Anda sudah log out");
  };
  return (
    <div className=" h-screen bg-darkgreen text-lg w-full flex flex-col text-white overflow-hidden ">
      <Header className="relative justify-between flex text-white">
        <span>Logo</span>
        <div className="flex  items-center justify-center gap-6">
          <span>WELCOM {user.username}</span>
          <Button
            className="border-none text-white"
            onClick={() => setopenBar(!openBar)}
          >
            <UserOutlined size={24} />
          </Button>
        </div>
        {openBar && (
          <span
            onClick={handleLogout}
            className="absolute right-20 top-16 rounded-lg px-3 bg-slate-600 text-white cursor-pointer hover:text-blue-200"
          >
            Log out
          </span>
        )}
      </Header>
      <div className="site-card-wrapper container justify-between  py-20 flex-row">
        <Row className="justify-around " gutter={16}>
          <Col span={8}>
            <Link to={"/Informasi-Iuran"}>
              <Card title="Informasi Iuran" bordered={false}>
                Berikut informasi iuran yang dapat anda akses
              </Card>
            </Link>
          </Col>
          <Col span={8}>
            <Link to={"Permohonan-Surat"}>
              <Card title="Permohonan surat" bordered={false}>
                Ingin membuat permohonan pembuatan surat
              </Card>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
