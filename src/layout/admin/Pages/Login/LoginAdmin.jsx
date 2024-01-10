import React from "react";
import * as yup from "yup";
import { Button, Form, Input, Layout, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../../../app/feature/user/userSlice";
import BannerAdmin from "../../../../assets/png/bannerAdmin.png";

const LoginAdmin = () => {
  // variables
  const dispatch = useDispatch();
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
        dispatch(
          logIn({
            username: data[0].username,
            nik: data[0].nik,
            role: data[0].role,
            isLoggin: true,
            rt: data[0].rt,
            rw: data[0].rw,
          })
        );
        mes.success(message);
        navigate("/Dashboard/Landingpage", { state: { data } });
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
    <Layout className="w-full bg-[#F5F5F5] ">
      <Content className=" h-screen px-2 md:px-0 w-full  text-black gap-10 md:w-1/2 mx-auto my-20 ">
        <div className=" w-full container  py-6 flex justify-center px-3 md:px-0 bg-white border shadow-md  flex-col items-center">
          <div className="font-semibold text-third text-base md:text-2xl">
            Masuk Sebagai Admin
          </div>
          <Form
            onFinish={formik.handleSubmit}
            className="w-full md:w-1/2 py-10"
          >
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
                className="py-3 border"
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
              ]}
            >
              <Input
                name="password"
                onChange={handleChange}
                className="py-3 border"
                placeholder="Masukkan password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                shape="default"
                block
                className="bg-third py-5 justify-center flex items-center"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="">
            <span>Apakah anda Warga ?</span>
            <Button
              className="border-none self-end text-md text-third font-bold"
              onClick={() => navigate("/Landingpage")}
            >
              Login  di sini
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginAdmin;
