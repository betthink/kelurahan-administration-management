import React, { useState, useRef, useEffect } from "react";
import {
  Breadcrumb,
  Layout,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
} from "antd";
import { Link } from "react-router-dom";
const { Header, Content } = Layout;
function VerifikasiPembayaran() {
  const topRef = useRef(null);
  const bulan = [
    "January",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const handleonFinish = (e) => {
    console.log(e);
  };
  const [targetOffset, setTargetOffset] = useState();
  useEffect(() => {
    setTargetOffset(topRef.current?.clientHeight);
  }, []);
  return (
    <div className=" md:mx-20">
      <Header
        style={{
          //

          position: "sticky",
          top: 20,
          zIndex: 99,
          // width: "75%",
        }}
        ref={topRef}
        className="hidden  bg-white items-center md:flex mt-5 "
      >
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
      <Content className="mt-5 bg-white p-10">
        <Form
          onFinish={handleonFinish}
          layout="vertical"
          size={"medium"}
          className="w-full"
        >
          <Space direction="vertical" className="w-full grid md:grid-cols-2 ">
            <Form.Item required name="nama" label="Nama">
              <Input placeholder="Masukan Nama" />
            </Form.Item>

            <Form.Item required name="nik" label="NIK">
              <Input placeholder="Masukan NIK" />
            </Form.Item>

            <Form.Item
              required
              name="jumlahPembayaran"
              label="Jumlah Pembayaran"
            >
              <Input placeholder="Masukan Jumlah Pembayaran" />
            </Form.Item>

            <Form.Item required name="verifikator" label="Verifikator">
              <Input placeholder="Masukan Nama Verifikator" />
            </Form.Item>
            <Form.Item
              required
              name="tanggalPembayaran"
              label="Tanggal Pembayaran"
            >
              <DatePicker
                className="w-full"
                placeholder="Pilih Tanggal Pembayaran"
              />
            </Form.Item>
            <Form.Item required name="bulanPembayaran" label="Bulan Pembayaran">
              <Select placeholder="Pilih Bulan Pembayaran">
                {bulan.map((item, i) => (
                  <Select.Option key={i}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              required
              name="metodePembayaran"
              label="metode Pembayaran"
            >
              <Select placeholder="Pilih Metode Pembayaran">
                {["Cash", "Transfer"].map((item, i) => (
                  <Select.Option key={i}>{item}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space>
          <Form.Item>
            <Button type="primary" className="bg-purp" block htmlType="submit">
              Verifikasi
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
}

export default VerifikasiPembayaran;
