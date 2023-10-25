import { Button, Card, Col, Row, message } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";
import NavigatorBar from "../components/NavigatorBar";
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
    <div className=" h-screen bg-whiteSmoke text-lg w-full flex flex-col text-white overflow-hidden ">
   
   <NavigatorBar/>
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
