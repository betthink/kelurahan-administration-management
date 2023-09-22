import { Button, Form, Input, Select, message as mes } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";

const PermohonanSurat = () => {
  const selectSurat = [
    {
      nama: "SKTM",
    },
    {
      nama: "kematian",
    },
    {
      nama: "pindah",
    },
  ];
  const navigate = useNavigate();
  const handlePermohonanPembuatanSurat = async (event) => {
    // console.log(event);
    const { nama, nik, surat } = event;
    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/post/addDataPermohonanSurat.php",
        {
          method: "post",
          data: {
            nama_pemohon: nama,
            nik,
            jenis_surat: surat,
          },
        }
      );
      const { message, value } = res.data;
      if (value === 1) {
        mes.success(message);
        navigate("/HomePage");
      } else {
        mes.error(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <div className="  w-full  text-white">
      <Header className="text-white">Permohonan Pembuatan Surat</Header>
      <Content className=" h-full items-center flex justify-center   ">
        <Form
          layout="vertical"
          onFinish={handlePermohonanPembuatanSurat}
          className="w-1/2 border container py-12 mt-10 bg-darksky "
        >
          <Form.Item
            label={<label style={{ color: "#fff" }}>Nama</label>}
            rules={[{ required: true }]}
            name="nama"
          >
            <Input className="py-3" placeholder="Nama pemohon" />
          </Form.Item>
          <Form.Item
            label={<label style={{ color: "#fff" }}>NIK</label>}
            rules={[
              { required: true },
              {
                min: 16,
                message: "Karakter yang anda masukkan kurang dari 16",
              },
              {
                pattern: /^[0-9]+$/,
                message: "NIK hanya boleh berisi angka",
              },
            ]}
            name="nik"
          >
            <Input className="py-3" placeholder="NIK pemohon" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label={<label style={{ color: "#fff" }}>Jenis Surat</label>}
            name="surat"
          >
            <Select placeholder="Pilih jenis permohonan surat">
              {selectSurat.map((item, i) => (
                <Select.Option className="py-3" key={i} value={item.nama}>
                  {item.nama}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            x
            <Button style={{ color: "#fff" }} block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
};

export default PermohonanSurat;
