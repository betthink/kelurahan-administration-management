import { Button, Form, Input, Select, message as mes } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axiosInstance";

const PermohonanSurat = () => {
  const [jenisSurat, setjenisSurat] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  const handleGetJenisSurat = async () => {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataJenisSurat.php"
      );
      res.status === 200
        ? setjenisSurat(res.data)
        : console.log("Network Error");
    } catch (error) {}
  };

  const navigate = useNavigate();
  const handlePermohonanPembuatanSurat = async (event) => {
    const { surat } = event;
    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/post/addDataPermohonanSurat.php",
        {
          method: "post",
          data: {
            nik: user.nik,
            id_penduduk: user.id,
            jenis_surat: surat,
          },
        }
      );
      const { message, value } = res.data;
      console.log(res.data);
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
  useEffect(() => {
    handleGetJenisSurat();
  }, []);
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
            rules={[{ required: true }]}
            label={<label style={{ color: "#fff" }}>Jenis Surat</label>}
            name="surat"
          >
            <Select placeholder="Pilih jenis permohonan surat">
              {jenisSurat.map((item, i) => (
                <Select.Option className="py-3" key={i} value={item.nama_surat}>
                  {item.nama_surat}
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
