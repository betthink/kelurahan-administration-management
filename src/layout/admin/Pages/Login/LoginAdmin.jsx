import React from "react";
import * as yup from "yup";
import { Button, Form, Input, Layout, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  // variables
  const navigate = useNavigate();
  // functions
  const handleLogin = async () => {
    const { username, password } = formik.values;
    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/auth/authLoginAdmin.php",
        {
          method: "post",
          data: {
            username,
            password,
          },
        }
      );
      const { data, message, value } = res.data;
      if (value === 1) {
        mes.success(message);
        navigate("/Dashboard", { state: { data } });
      } else {
        mes.error(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: yup.object().shape({
      username: yup.string().required().min(3),
      password: yup.string().required(),
    }),
  });
  const handleChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };
  return (
    <Layout className="h-screen w-full bg-darkgreen ">
      <Content className="mx-auto  w-1/2 h-screen flex justify-center items-center flex-col py-20 text-white">
        <div className="">Log in</div>
        <div className="">Masuk Sebagai Admin</div>
        <Form onFinish={formik.handleSubmit} className="w-1/2 py-10">
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "username tidak boleh kosong",
              },
            ]}
          >
            <Input
              name="username"
              onChange={handleChange}
              className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
              placeholder="Masukkan username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "password tidak boleh kosong",
              },

              // {
              //   pattern: /^[0-9]+$/,
              //   message: "password hanya boleh berisi angka",
              // },
            ]}
          >
            <Input
              name="password"
              onChange={handleChange}
              className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
              placeholder="Masukkan password"
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
      </Content>
    </Layout>
  );
};

export default LoginAdmin;
