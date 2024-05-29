import React from "react";
import * as yup from "yup";
import { Button, Form, Input, Layout, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import { useFormik } from "formik";
import { axiosWithMultipart } from "../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../app/feature/user/userSlice";
function LandingPage() {
  // variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { nik, password } = formik.values;
    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/auth/authLoginPenduduk.php",
        {
          method: "post",
          data: {
            nik,
            password,
          },
        }
      );

      const { data, message, value } = res.data;
      // console.log(res);
      if (value === 1) {
        // console.log(data[0]);
        mes.success(message);
        dispatch(
          logIn({
            id: data[0].id_penduduk,
            username: data[0].nama,
            nik: data[0].nik,
            role: "penduduk",
            isLoggin: true,
            data: data[0],
          })
        );
        navigate("/Informasi-iuran", { state: { data } });
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
      nik: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: yup.object().shape({
      nik: yup
        .string()
        .required("NIK harus diisi")
        .min(16, "Minimal karakter NIK adalah 16")
        .matches(/^[0-9]+$/, "NIK hanya boleh berisi angka"),
      password: yup.string().required("Password harus diisi"),
    }),
  });
  // functions
  const handleChange = (event) => {
    const { target } = event;
    formik.setFieldValue(target.name, target.value);
  };

  return (
    <Layout className="w-full h-screen bg-whiteSmoke ">
      <Content className=" h-screen px-2 md:px-0 text-black gap-10 w-full md:w-1/2 mx-auto my-20 ">
        <div className="w-full container  py-6 flex justify-center px-3 md:px-0 bg-white border shadow-md  flex-col items-center">
          <div className="font-semibold text-base md:text-2xl text-green-600">
            Masuk Sebagai warga
          </div>
          <Form
            onFinish={formik.handleSubmit}
            className="w-full md:w-1/2 py-10"
          >
            <Form.Item name="nik">
              <Input
                minLength={16}
                name="nik"
                onChange={handleChange}
                className=" py-3   border"
                placeholder="Masukkan NIK"
              />
            </Form.Item>
            <Form.Item name="password">
              <Input
                // maxLength={17}
                value={""}
                name="password"
                onChange={handleChange}
                className="py-3  border"
                placeholder="Masukkan NIK / password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                // shape="default"
                block
                className="bg-green-600 py-5 justify-center flex items-center"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-between items-center">
            <span>Admin RT ?</span>
            <Button
              className="border-none self-end text-md text-third font-bold"
              onClick={() => navigate("/login-admin")}
            >
              Login di sini
            </Button>
            <Button
              className="border-none self-end text-md text-green-600 font-bold "
              onClick={() => navigate("/Registrasi")}
            >
              Registrasi disini
            </Button>
          </div>

          {/* </div> */}
        </div>
      </Content>
    </Layout>
  );
}

export default LandingPage;
