import { Button, Form, Select, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axiosInstance";
import NavigatorBar from "../components/NavigatorBar";

const PermohonanSurat = () => {
  const [jenisSurat, setjenisSurat] = useState([]);
  const user = useSelector((state) => state.userReducer.value);
  const handleGetJenisSurat = async () => {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataJenisSurat.php"
      );
      // console.log(res.data);
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
            id_surat: surat, // Menggunakan nilai surat langsung
            nama_surat: jenisSurat.find((item) => item.id_surat === surat)
              .nama_surat, // Mendapatkan nama_surat dari jenisSurat berdasarkan id surat
            id_penduduk: user.id,
          },
        }
      );
      const { message, value } = res.data;
      // console.log(res.data);
      if (value === 1) {
        mes.success(message);
        navigate("/List-surat");
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
    <div className=" overflow-hidden w-full  bg-whiteSmoke h-[100vh] ">
      <NavigatorBar />
      <Content className="  items-center flex justify-center   ">
        <Form
          layout="vertical"
          onFinish={handlePermohonanPembuatanSurat}
          className="w-1/2 border container py-12 flex flex-col   gap-6  mt-20 bg-white  shadow-md"
        >
          <Form.Item
            rules={[{ required: true }]}
            label={
              <label className="text-green-600 font-semibold">
                Jenis Surat
              </label>
            }
            name="surat"
          >
            <Select  placeholder="Pilih jenis permohonan surat">
              {jenisSurat.map((item, i) => (
                <Select.Option className="py-3" key={i} value={item.id_surat}>
                  {item.nama_surat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="bg-green-600 text-white h-10 hover:to-green-700"
              htmlType="submit"
            >
              Ajukan
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
};

export default PermohonanSurat;
