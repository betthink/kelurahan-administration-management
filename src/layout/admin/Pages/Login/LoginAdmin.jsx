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
    // <Layout className="h-screen w-full bg-darkgreen ">
    //   <Content className="mx-auto  w-1/2 h-screen flex justify-center items-center flex-col py-20 text-white">
    //     <div className="">Log in</div>
    //     <div className="">Masuk Sebagai Admin</div>
    //     <Form onFinish={formik.handleSubmit} className="w-1/2 py-10">
    //       <Form.Item
    //         name="username"
    //         rules={[
    //           {
    //             required: true,
    //             message: "username tidak boleh kosong",
    //           },
    //         ]}
    //       >
    //         <Input
    //           name="username"
    //           onChange={handleChange}
    //           className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
    //           placeholder="Masukkan username"
    //         />
    //       </Form.Item>
    //       <Form.Item
    //         name="password"
    //         rules={[
    //           {
    //             required: true,
    //             message: "password tidak boleh kosong",
    //           },

    //           // {
    //           //   pattern: /^[0-9]+$/,
    //           //   message: "password hanya boleh berisi angka",
    //           // },
    //         ]}
    //       >
    //         <Input
    //           name="password"
    //           onChange={handleChange}
    //           className="bg-[#1b4455] py-3 hover:bg-[#1b4455] placeholder:text-white text-white border"
    //           placeholder="Masukkan password"
    //         />
    //       </Form.Item>
    //       <Form.Item>
    //         <Button
    //           htmlType="submit"
    //           type="primary"
    //           shape="default"
    //           block
    //           className="bg-blue-600"
    //         >
    //           Log in
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </Content>
    // </Layout>
    <Layout className="w-full bg-[#F5F5F5] ">
      <Content className="mx-auto  w-full md:h-screen flex flex-col-reverse md:flex-row md:justify-between    text-black px-10 md:px-6">
        <div className=" w-full md:w-1/2 py-6 flex justify-center flex-col items-center">
          <div className="font-semibold text-base md:text-2xl">
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

                // {
                //   pattern: /^[0-9]+$/,
                //   message: "password hanya boleh berisi angka",
                // },
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
                className="bg-blue-600 py-5 justify-center flex items-center"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

        </div>
        <div className=" py-6 md:h-screen w-full md:w-1/2 bg-blusky rounded-lg md:rounded-none text-white flex flex-col items-center justify-center gap-6 px-3 text-center">
          <h2 className="text-base md:text-3xl">Selamat datang warga</h2>
          <h3 className="text-sm md:text-lg">
            Silakan melakukan login dengan data anda untuk menggunakan sarana
            dari
          </h3>
          <img
            className="md:max-w-md object-cover max-w-[10rem]"
            src={BannerAdmin}
            alt="Banner warga"
          />
        </div>
      </Content>
    </Layout>
  );
};

export default LoginAdmin;
