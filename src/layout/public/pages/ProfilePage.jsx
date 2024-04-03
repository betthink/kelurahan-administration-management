import React from "react";
import NavigatorBar from "../components/NavigatorBar";
import { Checkbox, Form, Input, Button, Layout, Select } from "antd";
import { useLocation } from "react-router-dom";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const { Content } = Layout;

export default function ProfilePage() {
  const location = useLocation();
  const dataLoc = location?.state.data;
  // console.log(dataLoc);
  return (
    <section className="overflow-hidden w-full bg-whiteSmoke min-h-screen">
      <NavigatorBar />
      <Content className="items-center flex justify-center flex-col container mt-6  ">
        <Form
          // name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          // style={{
          //   maxWidth: 600,
          // }}
          initialValues={dataLoc}
          size="large"
          layout="vertical"
          className=" w-full border container py-12 justify-center items-center   bg-white  shadow-md  "
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <div className=" grid grid-cols-3 gap-1 ">
            <Form.Item
              label="Nama"
              name="nama"
              rules={[
                {
                  required: true,
                  message: "Please input your Nama!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="NIK"
              name="nik"
              rules={[
                {
                  required: true,
                  message: "Please input your NIK!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tempat Lahir"
              name="tanggal_lahir"
              rules={[
                {
                  required: true,
                  message: "Please input your Tempat Lahir!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Pekerjaan"
              name="Pekerjaan"
              rules={[
                {
                  required: true,
                  message: "Please input your Pekerjaan!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[
                {
                  required: true,
                  message: "Please input your Alamat!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="jenis_kelamin" label="Jenis Kelamin" required>
              <Select placeholder="Pilih Jenis Kelamin">
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Nomor Telp"
              name="nomor_telp"
              rules={[
                {
                  required: true,
                  message: "Please input your Nomor Telp!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status_diri"
              rules={[
                {
                  required: true,
                  message: "Please input your Status!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="darah" label="Golongan darah" required>
              <Select placeholder="Pilih Golongan Darah">
                {["A", "B", "AB", "O"].map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="darah" label="Agama" required>
              <Select placeholder="Pilih Agama">
                {["Islam", "Kristen", "Katolik", "Hindu", "Budha"].map(
                  (item, i) => (
                    <Select.Option key={i} value={item}>
                      {item}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>
          

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <Form.Item className="flex w-full ">
            <Button
              block
              type="primary"
              className="bg-green-600 w-full"
              htmlType="submit"
            >
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </section>
  );
}
