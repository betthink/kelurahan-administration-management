import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { CgDetailsMore } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function ListPesertaIPL({ data }) {
  return (
    <Content>
      <div className="min-w-full bg-white p-10  rounded-md mb-10 overflow-x-auto">
        <table className="w-full ">
          <thead className=" border-b   ">
            <tr className="text-xs  ">
              <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                Nama Kepala Keluarga
              </th>
              <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                NIK
              </th>
              <th className="py-2 whitespace-nowrap px-4 font-normal text-start">
                Status Tinggal
              </th>

              <th className="py-2 whitespace-nowrap px-4 font-normal text-center ">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr
                className={`${
                  i % 2 === 0 ? "bg-primary" : "bg-secondary"
                } text-four `}
                key={item.id}
              >
                <td className="py-2 whitespace-nowrap px-4 text-start ">
                  {item.nama}
                </td>
                <td className="py-2 whitespace-nowrap px-4 text-start ">
                  {item.nik}
                </td>
                <td className="py-2 whitespace-nowrap px-4 text-start ">
                  {item.status_tinggal}
                </td>

                <td className="py-2 whitespace-nowrap px-4 flex justify-center">
                  <Button className="border-none text-success">
                    <Link
                      className="flex justify-center items-center "
                      state={{ data: item }}
                      to={"/Dashboard/Kelola-IPL/DetailRiwayatPembayaran"}
                    >
                      <CgDetailsMore size={22} className="" />
                      <p>Detail pembayaran</p>
                    </Link>
                  </Button>

    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Content>
  );
}
