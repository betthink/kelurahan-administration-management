import React from "react";
import * as yup from "yup";
import { Button, Form, Input, Layout, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { axiosWithMultipart } from "../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../app/feature/user/userSlice";
import BannerWarga from "../../assets/png/bannerWarga.png";
function LandingPage() {
  // variables
  const dispatch = useDispatch();
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
        mes.success(message);
        dispatch(
          logIn({
            id: data[0].id_penduduk,
            username: data[0].nama,
            nik: data[0].nik,
            role: "penduduk",
            isLoggin: true,
          })
        );
        navigate("/HomePage", { state: { data } });
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
    <Layout className="w-full bg-whiteSmoke ">
      <Content className="mx-auto  w-full md:h-screen flex flex-col-reverse md:flex-row md:justify-between    text-black px-10 md:px-6">
        <div className=" w-full md:w-1/2 py-6 flex justify-center flex-col items-center">
          <div className="font-semibold text-base md:text-2xl">Masuk Sebagai warga</div>
          <Form onFinish={formik.handleSubmit} className="w-full md:w-1/2 py-10">
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
                className=" py-3   border"
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
                className="py-3  border"
                placeholder="Masukkan NIK"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                // shape="default"
                block
                className="bg-blue-600 py-5 justify-center flex items-center"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

          <div className="">
            <span>Apakah anda admin RT ?</span>
            <Button
              className="border-none self-end text-md text-purp font-bold"
              onClick={() => navigate("/login-admin")}
            >
              Login di sini
            </Button>
          </div>
        </div>
        <div className=" py-6 md:h-screen w-full md:w-1/2 bg-blusky rounded-lg md:rounded-none text-white flex flex-col items-center justify-center gap-6 px-3 text-center">
          <h2 className="text-base md:text-3xl">Selamat datang warga</h2>
          <h3 className="text-sm md:text-lg">
            Silakan melakukan login dengan data anda untuk menggunakan sarana
            dari
          </h3>
          <img className="md:max-w-md object-cover max-w-[10rem]" src={BannerWarga} alt="Banner warga" />
        </div>
      </Content>
    </Layout>
  );
}

export default LandingPage;