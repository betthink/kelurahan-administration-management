import { Content } from 'antd/es/layout/layout';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Spin } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { CgDetailsMore } from 'react-icons/cg';
import { GrHomeOption } from 'react-icons/gr';

export default function AdminView({data, loading, handleOpen, handleDelete}) {
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
          <table className="w-full">
            <thead className=" border-b  ">
              <tr className="text-xs font-bold  ">
                <th className="py-2 whitespace-nowrap px-4 font-normal">
                  Name
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal">NIK</th>
                <th className="py-2 whitespace-nowrap px-4 font-normal">
                  Nomor telepon
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal">
                  Alamat
                </th>
                <th className="py-2 whitespace-nowrap px-4 font-normal ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, i) => (
                <React.Fragment key={item.id_penduduk}>
                  <tr
                    className={`${
                      i % 2 === 0 ? "bg-primary" : "bg-secondary"
                    }  text-xs  `}
                    key={item.id_penduduk}
                  >
                    <td className="py-2 whitespace-nowrap px-4 text-center ">
                      {item.nama}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-center ">
                      {item.nik}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-center ">
                      {item.nomor_telp}
                    </td>
                    <td className="py-2 whitespace-nowrap px-4 text-center ">
                      {item.alamat}
                    </td>

                    <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                      <Button className="border-none">
                        <Link
                          state={{ data: item }}
                          to={"/Dashboard/Update-Penduduk"}
                        >
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
                          state={{ data: item }}
                          to={"/Dashboard/Detail-keluarga"}
                        >
                          <GrHomeOption
                            style={{ fontSize: "1.2rem" }}
                            className="text-red-600"
                            k
                          />
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
                    </td>

                    {/* modal */}
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Content>
  );
}
