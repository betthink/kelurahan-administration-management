import React, { useState } from "react";
import NavigatorBar from "../components/NavigatorBar";
import {
  Form,
  Input,
  Button,
  Layout,
  Select,
  Modal,
  message as mes,
} from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../app/feature/user/userSlice";

export default function ProfilePage() {
  const { Content } = Layout;

  // data variables
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataEntry, setdataEntry] = useState([]);
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // end modal
  const onFinish = (values) => {
    // console.log(values);

    setdataEntry({ ...values, id_penduduk: user?.id });
    showModal();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleUpdateData = async () => {
    const url = `administrasikelurahan/src/update/gantipassword.php`;
    try {
      // console.log(dataEntry);
      // return;
      const response = await axiosWithMultipart({
        method: "POST",
        data: dataEntry,
        url,
      });
      const { data } = response;
      const { message, value } = data;
      // console.log(data);
      if (value == 1) {
        mes.success(`${message}, Sihlakan Log in ulang`);
        dispatch(logOut());
        navigate("/");
      } else {
        mes.error(message);
      }
    } catch (error) {
      return error;
    }
  };

  const dataLoc = location?.state.data;
  // console.log(dataLoc);
  return (
    <section className="overflow-hidden w-full bg-whiteSmoke min-h-screen">
      <NavigatorBar />
      <Content className="items-center flex justify-center flex-col container mt-6  ">
        <Form
          initialValues={dataLoc}
          size="large"
          layout="vertical"
          className=" w-full border container py-12 justify-center items-center   bg-white  shadow-md  "
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          // autoComplete="off"
        >
          <div className=" grid grid-cols-3 gap-1 ">
            <Form.Item
              label="Nama"
              name="nama"
              rules={[
                {
                  required: true,
                  message: "Please input your Nama!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="NIK"
              name="nik"
              rules={[
                {
                  required: true,
                  message: "Please input your NIK!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Tempat Lahir"
              name="tempat_lahir"
              rules={[
                {
                  required: true,
                  message: "Please input your Tempat Lahir!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Pekerjaan"
              name="pekerjaan"
              rules={[
                {
                  required: true,
                  message: "Please input your Pekerjaan!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Alamat"
              name="alamat"
              rules={[
                {
                  required: true,
                  message: "Please input your Alamat!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="jenis_kelamin" label="Jenis Kelamin" required>
              <Select placeholder="Pilih Jenis Kelamin">
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Nomor Telp"
              name="nomor_telp"
              rules={[
                {
                  required: true,
                  message: "Please input your Nomor Telp!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status_diri"
              rules={[
                {
                  required: true,
                  message: "Please input your Status!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="darah" label="Golongan darah" required>
              <Select placeholder="Pilih Golongan Darah">
                {["A", "B", "AB", "O"].map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="agama" label="Agama" required>
              <Select placeholder="Pilih Agama">
                {["Islam", "Kristen", "Katolik", "Hindu", "Budha"].map(
                  (item, i) => (
                    <Select.Option key={i} value={item}>
                      {item}
                    </Select.Option>
                  )
                )}
              </Select>
            </Form.Item>

            <Form.Item
              label="Password Baru"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </div>
          <Form.Item className="flex w-full ">
            <Button
              block
              type="primary"
              className="bg-green-600 w-full"
              htmlType="submit"
            >
              Simpan
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Modal
        title="Apakah Data Sudah Benar?"
        open={isModalOpen}
        footer={[
          <Button
            key="back"
            className="bg-danger text-white"
            onClick={handleCancel}
          >
            Batalkan
          </Button>,
          <Button
            className="bg-success"
            key="submit"
            type="primary"
            onClick={handleUpdateData}
          >
            Simpan
          </Button>,
        ]}
        onCancel={handleCancel}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <p>nama:</p>
            <p>nik:</p>
            <p>alamat:</p>
            <p>nomorTelp:</p>
            <p>darah:</p>
            <p>agama:</p>
            <p>Jenis kelamin:</p>
            <p>Pekerjaan:</p>
            <p>Status:</p>
            <p>Tempat lahir:</p>
          </div>
          <div className="text-green-600 flex flex-col gap-2 ">
            <p>{dataEntry?.nama}</p>
            <p>{dataEntry?.nik}</p>
            <p>{dataEntry?.alamat}</p>
            <p>{dataEntry?.nomor_telp}</p>
            <p>{dataEntry?.darah}</p>
            <p>{dataEntry?.agama}</p>
            <p>{dataEntry?.jenis_kelamin}</p>
            <p>{dataEntry?.pekerjaan}</p>
            <p>{dataEntry?.status_diri}</p>
            <p>{dataEntry?.tempat_lahir}</p>
          </div>
        </div>
      </Modal>
    </section>
  );
}

// modal
