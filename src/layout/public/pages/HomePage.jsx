import { Button, Card, Col, Row, message } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import lib, { UserOutlined } from "@ant-design/icons";
const HomePage = () => {
  // const location = useLocation();
  // const { nama } = location.state.data[0];
  const [openBar, setopenBar] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    message.info("Anda sudah log out");
    navigate("/");
  };
  return (
    <div className=" h-screen bg-darkgreen text-lg w-full flex flex-col text-white overflow-hidden ">
      <Header className="relative justify-between flex text-white">
        <span>Logo</span>
        <div className="flex  items-center justify-center gap-6">
          <span>Nama</span>
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
