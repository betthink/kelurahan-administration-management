import { Breadcrumb, Button, Form, Input, Modal, Space } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";

const TambahVaksinPage = () => {
  // variables
  const navigate = useNavigate();
  const [vaksin, setVaksin] = useState({
    status: 1,
    jenis_vaksin: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  // functions
  const handleOnChange = async (e) => {
    setVaksin({
      ...vaksin,
      jenis_vaksin: e.vaksin,
    });
  };
  const handleAddDataVaksin = async () => {
    try {
      console.log(vaksin);
      const response = await axiosWithMultipart(
        "/administrasikelurahan/src/post/addDataVaksin.php",
        {
          method: "post",
          data: vaksin,
        }
      );
      const { value, message } = response.data;
      if (value === 1) {
        alert(message);
        navigate("/kelolaPosyandu");
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  // modal atributes
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    handleAddDataVaksin();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-20">
      <Header className="header-breadcrump">
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/kelolaPosyandu"}>Kelola Posyandu</Link> },
          ]}
        >
          <Breadcrumb.Item>Admin</Breadcrumb.Item>
          <Breadcrumb.Item>Kelola Posyandu</Breadcrumb.Item>
        </Breadcrumb>
      </Header>
      <Content className="h-full flex p-6 bg-white w-full justify-center">
        <Form
          onFinish={handleOnChange}
          layout="vertical"
          size="medium"
          className="w-1/2 justify-center  flex flex-col"
        >
          <Space direction="vertical">
            <Form.Item label="Vaksin" name={"vaksin"}>
              <Input
                value={vaksin.jenis_vaksin}
                placeholder="Masukkan Jenis Vaksin Baru"
              />
            </Form.Item>
          </Space>
          <Form.Item className="bg-purp">
            <Button onClick={showModal} block type="primary" htmlType="submit">
              Tambahkan Vaksin
            </Button>
          </Form.Item>
        </Form>
        {/* modal */}
        <>
          <Modal
            title="Apakah nama vaksin sudah benar?"
            open={isModalOpen}
            bodyStyle={{}}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>
              Nama vaksin:
              <span className="text-green-600"> {vaksin.jenis_vaksin} </span>
            </p>
          </Modal>
        </>
      </Content>
    </div>
  );
};

export default TambahVaksinPage;
