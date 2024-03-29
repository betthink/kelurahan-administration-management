import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Modal, Select, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Content, Header } from "antd/es/layout/layout";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { axiosInstance } from "../../../../utils/axiosInstance";
import ButtonGroup from "antd/es/button/button-group";

function KelolaInformasiVaksinSPage() {
  // variables
  const navigate = useNavigate();
  const [idVaccine, setIdVaccine] = useState(null);
  const columnVaksin = [
    {
      title: "Jenis Vaksin",
      width: 100,
      dataIndex: "jenis_vaksin",
      key: "jenis_vaksin",
    },
    {
      title: "Status ketersedia",
      width: 100,
      dataIndex: "status",
      key: "status",
      render: (data) => (
        <p
          className={`${
            data == 1
              ? "text-green-500 bg-green-100"
              : "text-red-500 bg-red-100"
          }  py-1 rounded-sm w-12 flex justify-center`}
        >
          {data == 1 ? "Benar" : "Tidak"}
        </p>
      ),
    },
    {
      title: "Action",
      key: "id_vaksin",
      dataIndex: "id_vaksin",
      fixed: "right",
      width: 160,
      render: (ids) => (
        <ButtonGroup>
          <Button
            onClick={() => handleOnchange(ids)}
            className="bg-success text-white"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDeleteVaksin(ids)}
            className="bg-danger text-white "
            type="default"
          >
            Hapus
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  const [dataVaksin, setdataVaksin] = useState([]);
  const [isValiable, setisValiable] = useState(null);
  const handleGetDataVaksin = async () => {
    const response = await axiosInstance.get(
      `administrasikelurahan/src/api/vaksin/fetchDataVaksin.php`
    );
    setdataVaksin(
      response.data.map((item, index) => {
        return { ...item, key: index.toString() };
      })
    );
  };
  const handleDeleteVaksin = async (id) => {
    try {
      const res = await axiosWithMultipart(
        "/administrasikelurahan/src/delete/delDataVaksin.php",
        {
          method: "post",
          data: { id_vaksin: id },
        }
      );
      const { value, message } = res.data;
      if (value === 1) {
        alert(message);
        window.location.reload();
      } else {
        window.alert(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const handleUpdateVaksin = async () => {
    const res = await axiosWithMultipart(
      "/administrasikelurahan/src/update/updateVaksin.php",
      {
        method: "post",
        data: {
          id_vaksin: idVaccine,
          status: isValiable,
        },
      }
    );
    // console.log(res.data);
    const { value, message } = res.data;
    if (value === 1) {
      alert(message);
      window.location.reload();
    } else {
      alert(message);
    }
  };
  const handleOnchange = (id) => {
    setIsModalOpen(true);
    setIdVaccine(id);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    handleGetDataVaksin();
  }, []);

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
        <Button
          onClick={() => navigate("/Dashboard/Tambah-VaksinPage")}
          className="flex flex-row   cursor-pointer bg-third hover:text-white text-white items-center "
          type="default"
        >
          Tambah Vaksin
        </Button>
      </Header>
      <Content>
        <div className="min-w-full bg-white p-10 overflow-x-auto  rounded-md mb-10">
          <Table
            dataSource={dataVaksin}
            columns={columnVaksin}
            pagination={{ pageSize: 7 }}
            sticky
          />
        </div>
      </Content>
      {/* modal */}
      <>
        <Modal
          footer={null}
          title="Apakah Vaksin Tersedia?"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          <Form onFinish={handleUpdateVaksin}>
            <Form.Item name="vaccineValiable">
              <Select
                onChange={(e) => setisValiable(e)}
                placeholder="Status Ketersediaan Vaksin?"
                value={isValiable ? "Tersedia" : "Tidak Tersedia"}
              >
                <Select.Option value={1}>Benar</Select.Option>
                <Select.Option value={0}>Tidak</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit">Simpan</Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
}

export default KelolaInformasiVaksinSPage;
