import React, { useState, useRef, useEffect } from "react";
import { Breadcrumb, Layout, Space, Anchor, Col, Row } from "antd";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;
function VerifikasiPembayaran() {
    const topRef = useRef(null);
  const [targetOffset, setTargetOffset] = useState();
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);
  return (
    <div className="mx-20">
      <Header   style={{
        // 
     
          position: 'sticky',
          top: 20,
          width: '75%',
        }}
        ref={topRef} className="bg-white items-center flex mt-5 ">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },
            {
              title: (
                <Link to={"/VerifikasiPembayaran"}>Verifikasi Pembayaran</Link>
              ),
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
      </Header>
      <Content>
        <div className="">
          <Row>
            <Col span={16}>
              <div
                id="part-1"
                style={{
                  height: "100vh",
                  background: "rgba(255,0,0,0.02)",
                }}
              />
              <div
                id="part-2"
                style={{
                  height: "100vh",
                  background: "rgba(0,255,0,0.02)",
                }}
              />
              <div
                id="part-3"
                style={{
                  height: "100vh",
                  background: "rgba(0,0,255,0.02)",
                }}
              />
            </Col>
            <Col span={8}>
              <Anchor
                replace
                items={[
                  {
                    key: "part-1",
                    href: "#part-1",
                    title: "Part 1",
                  },
                  {
                    key: "part-2",
                    href: "#part-2",
                    title: "Part 2",
                  },
                  {
                    key: "part-3",
                    href: "#part-3",
                    title: "Part 3",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </Content>
    </div>
  );
}

export default VerifikasiPembayaran;
