import React, { useEffect, useState } from "react";
import { Button, Modal, Checkbox, Form, Input, Select } from "antd";
import { axiosInstance } from "../../../../../utils/axiosInstance";
export default function ModalTambahPeserta({ isOpen, onCancel }) {
  const [jenisVaksin, setjenisVaksin] = useState([]);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  async function handleGetJenisVaksin() {
    const url = `/administrasikelurahan/src/api/fetchDataVaksin.php`;
    try {
      const res = await axiosInstance.get(url);
      const { data, status } = res;
      if (status === 200) {
        setjenisVaksin(data);
        console.log(data.jenis_vaksin);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleGetJenisVaksin();
  }, []);
  return (
    <Modal
      footer={false}
      title="Tambah peserta posyandu"
      onCancel={onCancel}
      open={isOpen}
    >
      <Form
        layout="vertical"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Wali / Orang tua"
          name="wali"
          rules={[
            {
              required: true,
              message: "Masukkan wali / orang tua",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Peserta Imunisasi"
          name="peserta"
          rules={[
            {
              required: true,
              message: "Tolong masukkan peserta posyandu",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tahapan Vaksin"
          name="tahapVaksin"
          rules={[
            {
              required: true,
              message: "Tolong masukkan tahapan vaksinasi",
            },
          ]}
        >
          <Select placeholder="Pilih vaksin">
            {jenisVaksin.map((item, i) => (
              <Select.Option key={i} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button block className="bg-purp" type="primary" htmlType="submit">
            Tambahkan
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
