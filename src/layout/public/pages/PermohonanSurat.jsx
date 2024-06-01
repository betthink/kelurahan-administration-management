import {
  Button,
  Form,
  Input,
  Select,
  message as mes,
  DatePicker,
  Space,
} from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../utils/axiosInstance";
import NavigatorBar from "../components/NavigatorBar";

const PermohonanSurat = () => {
  const [jenisSurat, setjenisSurat] = useState([]);
  const [openForm, setopenForm] = useState(0);

  const handleSelectChange = (value) => {
    setopenForm(value);
  };

  const user = useSelector((state) => state.userReducer.value);
  const handleGetJenisSurat = async () => {
    try {
      const res = await axiosInstance.get(
        "/administrasikelurahan/src/api/fetchDataJenisSurat.php"
      );
      res.status === 200
        ? setjenisSurat(res.data)
        : console.log("Network Error");
    } catch (error) {}
  };

  const navigate = useNavigate();
  const handlePermohonanPembuatanSurat = async (event) => {
    let data;
    if (openForm == 3) {
      const { surat, tanggal_lahir_2nd, waktu_pergi } = event;
      const date = `${tanggal_lahir_2nd.$d.getFullYear()}-${(
        tanggal_lahir_2nd.$d.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${tanggal_lahir_2nd.$d
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const datePergi = `${waktu_pergi.$d.getFullYear()}-${(
        waktu_pergi.$d.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${waktu_pergi.$d
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      data = {
        ...event,
        id_surat: surat,
        nik: user.nik,
        nama_surat: jenisSurat.find((item) => item.id_surat == surat)
          .nama_surat,

        id_penduduk: user.id,
        tanggal_lahir_2nd: date,
        waktu_pergi: datePergi,
      };
      // console.log(data);
      // return;
    } else if (openForm == 7) {
      const { surat, tanggal_lahir_2nd } = event;
      const date = `${tanggal_lahir_2nd.$d.getFullYear()}-${(
        tanggal_lahir_2nd.$d.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${tanggal_lahir_2nd.$d
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      data = {
        ...event,
        id_surat: surat,
        nik: user.nik,
        nama_surat: jenisSurat.find((item) => item.id_surat == surat)
          .nama_surat,
        id_penduduk: user.id,
        tanggal_lahir_2nd: date,
      };
      // console.log(data);
      // return;
    } else if (
      (openForm == 1) |
      (openForm == 2) |
      (openForm == 4) |
      ((openForm == 5) |
        ((openForm == 6) | ((openForm == 8) | (openForm == 9))))
    ) {
      const { surat } = event;
      data = {
        ...event,
        id_surat: surat,
        nik: user.nik,
        nama_surat: jenisSurat.find((item) => item.id_surat === surat)
          .nama_surat,
        id_penduduk: user.id,
      };
    } else if (openForm == 10) {
      const { surat, waktu_cerai } = event;
      const date = `${waktu_cerai.$d.getFullYear()}-${(
        waktu_cerai.$d.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${waktu_cerai.$d
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      data = {
        ...event,
        id_surat: surat,
        nik: user.nik,
        nama_surat: jenisSurat.find((item) => item.id_surat === surat)
          .nama_surat,
        id_penduduk: user.id,
        waktu_cerai: date,
      };
    }
    // console.log(data); return
    // return;
    const res = await axiosWithMultipart(
      "/administrasikelurahan/src/post/addDataPermohonanSurat.php",
      {
        method: "post",
        data,
      }
    );

    // console.log(res.data);
    // return;
    const { message, value } = res.data;
    // console.log(res.data);
    // return;
    if (value === 1) {
      mes.success(message);
      navigate("/List-surat");
    } else {
      mes.error(message);
    }
  };

  useEffect(() => {
    handleGetJenisSurat();
  }, []);
  return (
    <div className=" overflow-hidden w-full  bg-whiteSmoke h-[100vh] ">
      <NavigatorBar />
      <Content className="  items-center flex justify-center ">
        <Form
          layout="vertical"
          onFinish={handlePermohonanPembuatanSurat}
          className="w-1/2 h-96 border container py-12   gap-3 mt-20 bg-white  shadow-md  border-gray-300 overflow-y-auto"
        >
          <Form.Item
            rules={[{ required: true }]}
            label={
              <label className="text-green-600 font-semibold">
                Jenis Surat
              </label>
            }
            name="surat"
          >
            <Select
              placeholder="Pilih jenis permohonan surat"
              onChange={handleSelectChange}
            >
              {jenisSurat.map((item) => (
                <Select.Option
                  className="py-3"
                  key={item.id_surat}
                  value={item.id_surat}
                >
                  {item.nama_surat}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {openForm == 3 && (
            <Content className="grid grid-cols-2 gap-4">
              <Space className="col-span-2 justify-center border">
                <h3 className="text-xl font-bold">
                  Data suami / istri yang pergi meninggalkan{" "}
                </h3>
              </Space>
              <Form.Item
                label="Nama"
                name="nama_lain"
                rules={[
                  {
                    required: true,
                    message: "Masukan nama istri / suami",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tempat lahir"
                name="tempat_lahir_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan tempat lahir",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tangal lahir"
                name="tanggal_lahir_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan tanggal lahir",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                label="Agama"
                name="agama_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan agama",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pendidikan terakhir"
                name="pendidikan_terakhir"
                rules={[
                  {
                    required: true,
                    message: "Masukan pendidikan terakhir",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pekerjaan"
                name="pekerjaan_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan pekerjaan ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Waktu pergi meninggalkan"
                name="waktu_pergi"
                rules={[
                  {
                    required: true,
                    message: "Masukkan Waktu pergi",
                  },
                ]}
              >
                <DatePicker
                  placeholder="Masukkan Waktu pergi"
                  className="w-full"
                />
              </Form.Item>
            </Content>
          )}
          {openForm == 4 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Letak objek tanah/alamat"
                name="letak_object_tanah"
                rules={[
                  {
                    required: true,
                    message: "Masukan Letak object",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Content>
          )}
          {openForm == 5 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Pendidikan Terakhir"
                name="pendidikan_terakhir"
                rules={[
                  {
                    required: true,
                    message: "Masukan pendidikan terakhir",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Content>
          )}
          {openForm == 6 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Suku"
                name="suku"
                rules={[
                  {
                    required: true,
                    message: "Masukan suku",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Bangsa"
                name="bangsa"
                rules={[
                  {
                    required: true,
                    message: "Masukan bangsa",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pendidikan Terakhir"
                name="pendidikan_terakhir"
                rules={[
                  {
                    required: true,
                    message: "Masukan pendidikan terakhir",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Content>
          )}
          {openForm == 7 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Jenis usaha"
                name="jenis_usaha"
                rules={[
                  {
                    required: true,
                    message: "Masukan jenis usaha",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Alamat pekerjaan"
                name="alamat_pekerjaan"
                rules={[
                  {
                    required: true,
                    message: "Masukan pekerjaan",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nama anak"
                name="nama_anak"
                rules={[
                  {
                    required: true,
                    message: "Masukan nama anak",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tempat lahir"
                name="tempat_lahir_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan nama anak",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Tanggal lahir"
                name="tanggal_lahir_2nd"
                rules={[
                  {
                    required: true,
                    message: "Masukan tanggal lahir",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item
                label="Jurusan"
                name="jurusan_anak"
                rules={[
                  {
                    required: true,
                    message: "Masukan Jurusan",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Penghasilan kotor per bulan"
                name="penghasilan_kotor"
                rules={[
                  {
                    required: true,
                    message: "Masukan Penghasilan kotor",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pengeluaran per bulan"
                name="pengeluaran"
                rules={[
                  {
                    required: true,
                    message: "Masukan Pengeluaran",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Penghasilan bersih per bulan"
                name="penghasilan_bersih"
                rules={[
                  {
                    required: true,
                    message: "Masukan Penghasilan bersih",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Content>
          )}
          {openForm == 9 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="NIS / NIM"
                name="nim"
                rules={[
                  {
                    required: true,
                    message: "Masukan nomor NIS / NIM",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nama ayah"
                name="nama_ayah"
                rules={[
                  {
                    required: true,
                    message: "Masukan nama ayah",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nama ibu"
                name="nama_ibu"
                rules={[
                  {
                    required: true,
                    message: "Masukan Nama ibu",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pekerjaan ayah"
                name="pekerjaan_ayah"
                rules={[
                  {
                    required: true,
                    message: "Masukan Pekerjaan ayah",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Pekerjaan ibu"
                name="pekerjaan_ibu"
                rules={[
                  {
                    required: true,
                    message: "Masukan Pekerjaan ibu",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Jalan"
                name="jalan"
                rules={[
                  {
                    required: true,
                    message: "Masukan jalan",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="kelurahan"
                name="kelurahan"
                rules={[
                  {
                    required: true,
                    message: "Masukan kelurahan",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Kota"
                name="kota"
                rules={[
                  {
                    required: true,
                    message: "Masukan kota",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Provinsi"
                name="provinsi"
                rules={[
                  {
                    required: true,
                    message: "Masukan provinsi",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Content>
          )}
          {openForm == 10 && (
            <Content className="grid grid-cols-2 gap-4">
              <Form.Item
                label="Pendidikan terakhir"
                name="pendidikan_terakhir"
                rules={[
                  {
                    required: true,
                    message: "Masukan Pendidikan terakhir",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Nomor akta perceraian"
                name="nomor_akta_cerai"
                rules={[
                  {
                    required: true,
                    message: "Masukan Nomor akta perceraian",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Waktu cerai"
                name="waktu_cerai"
                rules={[
                  {
                    required: true,
                    message: "Masukan Waktu cerai",
                  },
                ]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
            </Content>
          )}
          <Form.Item>
            <Button
              block
              className="bg-green-600 text-white h-10 hover:to-green-700"
              htmlType="submit"
            >
              Ajukan
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </div>
  );
};

export default PermohonanSurat;
