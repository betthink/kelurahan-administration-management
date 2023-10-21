import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Layout,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
  Modal,
  message as mes,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { currentDate } from "../../utils/currentDate";
const { Header, Content } = Layout;
function VerifikasiPembayaran() {
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const prePageState = location.state.data;
  const [dataPembayaran, setdataPembayaran] = useState({
    nama: prePageState?.nama || "",
    nik: prePageState?.nik || "",
  });

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    handleVerikifikasiPembayaran();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleonFinish = (e) => {
    setdataPembayaran(e);
    setIsModalOpen(true);
  };
  const handleVerikifikasiPembayaran = async () => {
    const url = `administrasikelurahan/src/post/addRiwayatPembayaran.php`;
    const date = `${dataPembayaran.waktu_pembayaran.$d.getFullYear()}-${
      dataPembayaran.waktu_pembayaran.$d.getMonth() + 1
    }-${dataPembayaran.waktu_pembayaran.$d.getDate()}`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "POST",
        data: {
          ...dataPembayaran,
          waktu_pembayaran: date,
          rt: prePageState?.rt || user?.rt,
          waktu_verifikasi: currentDate,
          verifikator: user.username,
          id_user: prePageState?.id_user,
        },
      });
      const { value, message } = res.data;
      if (parseInt(value) === 1) {
        mes.success(message);
        navigate("/Dashboard/Kelola-IPL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" md:mx-20">
      <Header
        style={{
          position: "sticky",
          top: 20,
          zIndex: 99,
        }}
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
          initialValues={dataPembayaran}
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
              name="jumlah_pembayaran"
              label="Jumlah Pembayaran"
            >
              <Input placeholder="Masukan Jumlah Pembayaran" />
            </Form.Item>

            <Form.Item
              required
              name="waktu_pembayaran"
              label="Tanggal Pembayaran"
            >
              <DatePicker
                className="w-full"
                placeholder="Pilih Tanggal Pembayaran"
              />
            </Form.Item>
            <Form.Item name="metode" label="Metode pembayaran" required>
              <Select
                placeholder="Pilih metode pembayaran"
                value={dataPembayaran.metode}
              >
                {["Cash", "Transfer"].map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
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
      <>
        <Modal
          title="Apakah data pembayaran sudah benar?"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="grid grid-cols-2">
            <span> Nama: </span>
            <p> {dataPembayaran.nama}</p>
            <span> NIK: </span>
            <p> {dataPembayaran.nik}</p>
            <span> Metode: </span>
            <p> {dataPembayaran.metode}</p>
            <span> Jumlah: </span>
            <p> {dataPembayaran.jumlah_pembayaran}</p>
            {/* <p> {date}</p> */}
          </div>
        </Modal>
      </>
    </div>
  );
}

export default VerifikasiPembayaran;
