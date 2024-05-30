import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, message as mes, AutoComplete } from "antd";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../../utils/axiosInstance";
import { Option } from "antd/es/mentions";
export default function ModalTambahPeserta({
  isOpen,
  onCancel,
  dataJenisVaksin,
}) {
  const [kepalaKeluarga, setkepalaKeluarga] = useState([])
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

  const user = useSelector((state) => state.userReducer.value);
  const handleGetWakil = async () => {
    const url = `/administrasikelurahan/src/api/penduduk/fetch_kepala_keluarga.php?rt=${user.rt}&rw=${user.rw}`;
    const response = await axiosInstance.get(url);
    const data = response.data;
    if (response.status === 200) {
      setkepalaKeluarga(data)
    }
  };
 
  useEffect(()=> {
    handleGetWakil()
  }, [])
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
          <Select
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            placeholder="Pilih wakil / kepala keluarga"
          >
            {kepalaKeluarga.map((item, i) => (
              <Select.Option key={i} value={item.nama}>
                {item.nama}
              </Select.Option>
            ))}
          </Select>
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
          <Select showSearch placeholder="Pilih vaksin">
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
