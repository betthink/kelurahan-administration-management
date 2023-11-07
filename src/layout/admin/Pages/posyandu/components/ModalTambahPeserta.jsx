import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, message as mes } from "antd";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";
export default function ModalTambahPeserta({ isOpen, onCancel, dataJenisVaksin }) {
 
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  async function handleAddPesertaPosyandu(value) {
    const url = `/administrasikelurahan/src/post/addDataPesertaPosyandu.php`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "POST",
        data: value,
      });
      const { data, status } = res;
      if (status === 200) {
        mes.success(data.message);
        onCancel();
        window.location.reload();
      } else {
        mes.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
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
        onFinish={handleAddPesertaPosyandu}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Wali / Orang tua"
          name="wali_peserta"
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
          name="nama_peserta"
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
          name="tahap_vaksin"
          rules={[
            {
              required: true,
              message: "Tolong masukkan tahapan vaksinasi",
            },
          ]}
        >
          <Select placeholder="Pilih vaksin">
            {dataJenisVaksin?.map((item, i) => (
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
