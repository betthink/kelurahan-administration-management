import { Content } from 'antd/es/layout/layout';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Spin, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CgDetailsMore } from 'react-icons/cg';
import { GrHomeOption } from 'react-icons/gr';
import ButtonGroup from 'antd/es/button/button-group';

export default function AdminView({data, loading, handleOpen, handleDelete}) {
    const columnPenduduk = [
      {
        title: "Nama",
        width: 100,
        dataIndex: "nama",
        key: "nama",
      },
      {
        title: "NIK",
        width: 100,
        dataIndex: "nik",
        key: "nik",
      },
      {
        title: "Nomor telpon",
        width: 100,
        dataIndex: "nomor_telp",
        key: "nomor_telp",
      },
      {
        title: "Alamat",
        width: 100,
        dataIndex: "alamat",
        key: "alamat",
      },

      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 160,
        render: (item) => (
          <ButtonGroup>
            <Button className="border-none">
              <Link state={{ data: item }} to={"/Dashboard/Update-Penduduk"}>
                <EditOutlined
                  style={{ fontSize: "1.2rem" }}
                  className="text-success"
                />
              </Link>
            </Button>

            <Button
              className="border-none text-manggo"
              onClick={() => handleOpen(item)}
              type="default"
            >
              <CgDetailsMore size={22} />
            </Button>
            <Button className="border-none">
              <Link
                className=" text-purple-500"
                state={{ data: item }}
                to={"/Dashboard/Detail-keluarga"}
              >
                <GrHomeOption style={{ fontSize: "1.2rem" }} />
              </Link>
            </Button>
            <Button
              className="border-none"
              onClick={() => handleDelete(item.id_penduduk)}
              type="default"
            >
              <DeleteOutlined
                style={{ fontSize: "1.2rem" }}
                className="text-danger"
              />
            </Button>
          </ButtonGroup>
        ),
      },
    ];
  return (
    <Content
      style={{ position: "sticky", top: 400 }}
      className=" min-h-[40rem]  overflow-x-auto"
    >
      {/* tabel */}
      {loading ? (
        <div className=" flex flex-col mt-[10rem] justify-center w-full items-center ">
          <Spin />
        </div>
      ) : (
        <div className="min-w-full bg-white p-10  rounded-md mb-10  overflow-x-auto">
         
         <Table dataSource={data} columns={columnPenduduk}/>
        </div>
      )}
      
    </Content>
  );
}
