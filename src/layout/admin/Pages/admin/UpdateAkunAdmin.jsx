import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  message as mes,
} from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";

export default function UpdateAkunAdmin() {
  // variables
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;
  const [dataNewAdmin, setdataNewAdmin] = useState(data);
  const optionsRW = ["001", "002", "003", "004", "005"];
  const optionsRT = ["001", "002", "003", "004", "005"];
  const handleUpdateAkun = async () => {
    const url = `/administrasikelurahan/src/update/uodateAkunAdmin.php`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "post",
        data: {
          id_admin: dataNewAdmin.id_admin,
          nik: dataNewAdmin.nik,
          nomor_telp: dataNewAdmin.nomor_telp,
          jenis_kelamin: dataNewAdmin.jenis_kelamin,
          password: dataNewAdmin.password,
          username: dataNewAdmin.username,
          rt: dataNewAdmin.rt,
          rw: dataNewAdmin.rw,
        },
      });
      const { data, status } = res;
      if (status === 200) {
        mes.success(data.message);
        navigate("/Dashboard/Kelola-Admin");
      } else {
        mes.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSetDataUpdate = (e) => {
    setdataNewAdmin((prev) => ({
      ...prev,
      ...e,
    }));
  };

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await handleUpdateAkun();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          onFinish={handleSetDataUpdate}
          layout="vertical"
          size={"medium"}
          initialValues={dataNewAdmin}
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
              <Input placeholder="Masukan Nama Admin" />
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
              <Input placeholder="Masukan Nama Admin" />
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
              <Input placeholder="Masukan NIK Admin" />
            </Form.Item>
            <Form.Item
              name="rt"
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
              <Select placeholder="Pilih RT ">
                {optionsRT.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="rw"
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
              <Select placeholder="Pilih RW ">
                {optionsRW.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="nomor_telp"
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

            <Form.Item name="jenis_kelamin" label="Jenis Kelamin" required>
              <Select
                placeholder="Pilih Jenis Kelamin"
                value={dataNewAdmin.jenis_kelamin}
              >
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item>
            <Button
              className="bg-purp py-3 h-full w-full mx-auto justify-center flex"
              type="primary"
              htmlType="submit"
              onClick={showModal}
            >
              Simpan
            </Button>
          </Form.Item>
        </Form>
        <>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p> {dataNewAdmin.username}</p>
            <p>{dataNewAdmin.password}</p>
          </Modal>
        </>
      </div>
    </div>
  );
}
