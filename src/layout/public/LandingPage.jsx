import React from "react";
import * as yup from "yup";
import { Button, Form, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { axiosWithMultipart } from "../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  // variables
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { nama, nik } = formik.values;

    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/auth/authLoginPenduduk.php",
        {
          method: "post",
          data: {
            nama,
            nik,
          },
        }
      );
      const { data, message, value } = res.data;
      if (value === 1) {
        alert(message);
        navigate("/HomePage", { state: { data } });
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const formik = useFormik({
    initialValues: {
      nama: "",
      nik: "",
    },
    onSubmit: handleLogin,
    validationSchema: yup.object().shape({
      nama: yup.string().required().min(3),
      nik: yup
        .string()
        .required()
        .min(16)
        .matches(/^[0-9]+$/, "NIK hanya boleh berisi angka"),
    }),
  });
  // functions
  const handleChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <Layout className="h-screen w-full bg-darkgreen ">
      <Content className="mx-auto  w-1/2 h-screen flex justify-center items-center flex-col py-20 text-white">
        <div className="">Log in</div>
        <div className="">
          Masuk Sebagai warga
        </div>
        <Form onFinish={formik.handleSubmit} className="w-1/2 py-10">
          <Form.Item
            name="nama"
            rules={[
              {
                required: true,
                message: "Nama tidak boleh kosong",
              },
            ]}
          >
            <Input
              name="nama"
              onChange={handleChange}
              className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
              placeholder="Masukkan Nama"
            />
          </Form.Item>
          <Form.Item
            name="nik"
            rules={[
              {
                required: true,
                message: "NIK tidak boleh kosong",
              },
              {
                min: 16,
                message: "NIK minimal setidaknya 16 characters",
              },
              {
                pattern: /^[0-9]+$/,
                message: "NIK hanya boleh berisi angka",
              },
            ]}
          >
            <Input
              name="nik"
              onChange={handleChange}
              className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
              placeholder="Masukkan NIK"
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              shape="default"
              block
              className="bg-blue-600"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
       
          <Button className="border-none self-end hover:cursor-pointer hover:underline" onClick={() => navigate("/login-admin")}>
            Masuk sebagai admin
          </Button>
      
      </Content>
    </Layout>
  );
}

export default LandingPage;
