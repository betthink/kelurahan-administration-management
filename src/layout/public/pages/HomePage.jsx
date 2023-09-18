import { Card, Col, Row } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const { nama } = location.state.data[0];
  return (
    <div className="container text-lg w-full flex flex-col text-white overflow-hidden justify-center py-20">
      <header className="text-center"> WELCOME {nama}</header>
      <div className="site-card-wrapper  justify-between flex-row">
        <Row className="justify-around " gutter={16}>
          <Col span={8}>
            <Link to={"Informasi-Iuran"}>
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
