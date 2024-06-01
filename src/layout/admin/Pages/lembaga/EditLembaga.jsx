import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Space,
  message as mes,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";

const EditLembaga = () => {
  // variables
  const navigate = useNavigate();
  const location = useLocation();
  const stateUrl = location.state.data;
  const [lembaga, setlembaga] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  // functions
  const handleOnChange = async (e) => {
    const { rt, rw } = e;
    setlembaga({
      rt,
      rw,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleUpdate();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleUpdate = async () => {
    try {
      const response = await axiosWithMultipart(
        "/administrasikelurahan/src/update/lembaga.php",
        {
          method: "post",
          data: { ...lembaga, id: stateUrl.id },
        }
      );
      const { value, message } = response.data;
      // console.log(response.data);
      if (value === 1) {
        mes.success(message);
        navigate("/Dashboard/Kelola-Lembaga");
      } else {
        mes.error(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/Dashboard"}>Dashboard</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Lembaga</Breadcrumb.Item>
          <Breadcrumb.Item>Tambah Lembaga</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className="h-full flex p-6 bg-white w-full justify-center">
        <Form
          initialValues={stateUrl}
          onFinish={handleOnChange}
          layout="vertical"
          size="medium"
          className="w-1/2 justify-center  flex flex-col"
        >
          <Space direction="vertical">
            <Form.Item
              rules={[
                { required: true, message: "RT harus diisi!" },
                {
                  validator: (_, value) =>
                    value && !isNaN(value)
                      ? Promise.resolve()
                      : Promise.reject("RT harus berupa angka!"),
                },
              ]}
              label="Rukun Tetangga (RT)"
              name={"rt"}
            >
              <Input value={lembaga?.rt} placeholder="Masukkan Jenis RT Baru" />
            </Form.Item>
            <Form.Item
              rules={[
                { required: true, message: "RW harus diisi!" },
                {
                  validator: (_, value) =>
                    value && !isNaN(value)
                      ? Promise.resolve()
                      : Promise.reject("RW harus berupa angka!"),
                },
              ]}
              label="Rukun Warga (RW)"
              name={"rw"}
            >
              <Input value={lembaga?.rw} placeholder="Masukkan Jenis RW Baru" />
            </Form.Item>
          </Space>
          <Form.Item className="bg-purp">
            <Button onClick={showModal} block type="primary" htmlType="submit">
              Edit Lembaga
            </Button>
          </Form.Item>
        </Form>
        {/* modal */}
        <>
          <Modal
            title="Apakah data lembaga sudah benar benar?"
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
                onClick={handleOk}
              >
                Submit
              </Button>,
            ]}
            onCancel={handleCancel}
          >
            <div className="grid grid-cols-2 gap-3">
              <p> RT Baru:</p>
              <span className="text-green-600"> {lembaga?.rt} </span>
              <p> RW Baru:</p>
              <span className="text-green-600"> {lembaga?.rw} </span>
            </div>
          </Modal>
        </>
      </Content>
    </div>
  );
};

export default EditLembaga;
