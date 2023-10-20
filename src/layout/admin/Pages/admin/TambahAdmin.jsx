import { Breadcrumb, Button, Form, Input, Space, Select, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function TambahAdmin() {
  const [dataNewAdmin, setdataNewAdmin] = useState({});
  const handleAddAdmin = (event) => {
    setdataNewAdmin(event);
  };
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(dataNewAdmin);
  }, [dataNewAdmin]);
  return (
    <div className="mx-20">
      {/* path */}
      <Breadcrumb
        items={[
          { title: "Admin" },
          { title: <Link to={"/Dashboard/Kelola-Admin"}>Kelola Admin</Link> },
          { title: <Link to={"/Dashboard/Kelola-Admin/"}>Tambah Admin</Link> },
        ]}
        style={{
          margin: "16px 0",
        }}
      />
      <div className="h-full self-center flex  p-6 bg-white">
        {/* form */}
        <Form
          onFinish={handleAddAdmin}
          layout="vertical"
          size={"medium"}
          className="w-full justify-center flex  flex-col "
        >
          <Space
            direction="vertical"
            className="grid md:grid-cols-2 grid-cols-1"
          >
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="username"
              label="username"
            >
              <Input
                placeholder="Masukan Nama Admin"
                value={dataNewAdmin.nama}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="password"
              label="password"
            >
              <Input
                placeholder="Masukan Nama Admin"
                value={dataNewAdmin.nama}
              />
            </Form.Item>
            <Form.Item
              name="nik"
              label="NIK"
              rules={[
                {
                  required: true,
                  message: "NIK tidak boleh kosong",
                },
                {
                  min: 16,
                  message: "NIK minimal setidaknya 16 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "NIK hanya boleh berisi angka",
                },
              ]}
            >
              <Input placeholder="Masukan NIK Admin" value={dataNewAdmin.nik} />
            </Form.Item>
            <Form.Item
              name="RT"
              label="RT"
              rules={[
                {
                  required: true,
                  message: "Nomor RT tidak boleh kosong",
                },
                {
                  min: 3,
                  message: "RT minimal setidaknya 3 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "RT hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                placeholder="Masukan Nomor KK Admin"
                value={dataNewAdmin.rt}
              />
            </Form.Item>
            <Form.Item
              name="RW"
              label="RW"
              rules={[
                {
                  required: true,
                  message: "Nomor RW tidak boleh kosong",
                },
                {
                  min: 3,
                  message: "RW minimal setidaknya 3 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "RW hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                placeholder="Masukan RW Admin"
                value={dataNewAdmin.alamat}
              />
            </Form.Item>
            <Form.Item
              name="nomorTelp"
              label="Nomor Telp"
              required
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Nomor Telepon hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                placeholder="Masukan Nomor Telp Admin"
                value={dataNewAdmin.nomor_telp}
              />
            </Form.Item>

            <Form.Item name="jenisKelamin" label="Jenis Kelamin" required>
              <Select
                placeholder="Pilih Jenis Kelamin"
                value={dataNewAdmin.jenis_kelamin}
              >
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item className="bg-purp">
            <Button block type="primary" htmlType="submit" onClick={showModal}>
              Tambahkan
            </Button>
          </Form.Item>
        </Form>
        <>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={(_, { OkBtn, CancelBtn }) => (
              <>
                <CancelBtn />
                <OkBtn />
              </>
            )}
          >
            <p> {dataNewAdmin.username}</p>
            <p>{dataNewAdmin.password}</p>
          </Modal>
        </>
      </div>
    </div>
  );
}
