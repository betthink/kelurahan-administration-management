// library
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  theme,
  Button,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Switch,
} from "antd";
import { Link } from "react-router-dom";
// components
function TambahPenduduk() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //   atribute form
  // data entry
  const [dataEntry, setdataEntry] = useState({
    nama: "",
    nik: "",
    noKK: "",
    alamat: "",
    nomorTelp: "",
    tanggalLahir: "",
    darah: "",
    jenisKelamin: "",
    status: "",
    statusPenduduk: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdataEntry((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onChange = (date, dateString) => {
    console.log({ dateString });
    // setdataEntry((prevData) => ({
    //   ...prevData,
    //   tanggalLahir: dateString,
    // }));
  };
  useEffect(() => {
    console.log(dataEntry);
  }, [dataEntry]);
  return (
    <div>
      {/* path */}
      <Breadcrumb
        items={[
          { title: "Admin" },
          { title: <Link to={"/KelolaPenduduk"}>Kelola Penduduk</Link> },
          { title: <Link to={"/KelolaPenduduk"}>Tambah Penduduk</Link> },
        ]}
        style={{
          margin: "16px 0",
        }}
      ></Breadcrumb>
      <div className="h-full p-6 bg-white">
        {/* form */}
        <Form
          layout="vertical"
          size={"large"}
          className="w-full justify-center flex  flex-col "
        >
          <div className="  lg:grid lg:grid-cols-2   w-full flex flex-col justify-center px-10 gap-10">
            <div className="w-full ">
              <Form.Item label="Nama">
                <Input
                  name="nama"
                  value={dataEntry.nama}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="NIK">
                <Input
                  name="nik"
                  value={dataEntry.nik}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item label="No. KK">
                <Input
                  name="noKK"
                  value={dataEntry.noKK}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Alamat">
                <Input
                  name="alamat"
                  value={dataEntry.alamat}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Nomor Telp">
                <Input
                  name="nomorTelp"
                  value={dataEntry.nomorTelp}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Tanggal Lahir">
                <DatePicker
                  name="tanggalLahir"
                  onChange={onChange}
                  value={dataEntry.tanggalLahir}
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item label="Jenis Kelamin">
                <Select
                  name="jenisKelamin"
                  onChange={handleChange}
                  value={dataEntry.jenisKelamin}
                >
                  <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                  <Select.Option value="Perempuan">Perempuan</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item label="Golongan darah">
                <Input
                  name="darah"
                  value={dataEntry.darah}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item label="Status">
                <Select>
                  <Select.Option value="Menikah">Menikah</Select.Option>
                  <Select.Option value="Lajang">Lajang</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Status Penduduk">
                <Select>
                  <Select.Option value="Tetap">Tetap</Select.Option>
                  <Select.Option value="Sementara">Sementara</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="self-center">
              <Button>Tambahkan</Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default TambahPenduduk;
