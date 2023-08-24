// library
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import { Link } from "react-router-dom";
// components
function TambahPenduduk() {
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
  const onFinish = (e) => {
    const {
      nama,
      nik,
      noKK,
      alamat,
      nomorTelp,
      tanggalLahir,
      darah,
      jenisKelamin,
      status,
      statusPenduduk,
    } = e;
    const date = `${tanggalLahir.$d.getDate()}-${
      tanggalLahir.$d.getMonth() + 1
    }-${tanggalLahir.$d.getFullYear()}`;
    setdataEntry({
      ...dataEntry,
      nama,
      nik,
      noKK,
      alamat,
      nomorTelp,
      tanggalLahir: date,
      darah,
      jenisKelamin,
      status,
      statusPenduduk,
    });
    // console.log(tanggalLahir.$d);
  };
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    console.log(dataEntry);
  }, [dataEntry]);
  return (
    <div className="mx-20">
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
      <div className="h-full self-center flex  p-6 bg-white">
        {/* form */}
        <Form
          onFinish={onFinish}
          layout="vertical"
          size={"medium"}
          className="w-full justify-center flex  flex-col "
        >
          <div className="  lg:grid lg:grid-cols-2   w-full flex flex-col justify-center px-10 gap-10">
            <div className="w-full ">
              <Form.Item name="nama" label="Nama">
                <Input
                  placeholder="Masukan Nama Penduduk"
                  value={dataEntry.nama}
                />
              </Form.Item>
              <Form.Item name="nik" label="NIK">
                <Input
                  placeholder="Masukan NIK Penduduk"
                  value={dataEntry.nik}
                />
              </Form.Item>
              <Form.Item name="noKK" label="No. KK">
                <Input
                  placeholder="Masukan Nomor KK Penduduk"
                  value={dataEntry.noKK}
                />
              </Form.Item>
              <Form.Item name="alamat" label="Alamat">
                <Input
                  placeholder="Masukan Alamat Penduduk"
                  value={dataEntry.alamat}
                />
              </Form.Item>
              <Form.Item name="nomorTelp" label="Nomor Telp">
                <Input
                  placeholder="Masukan Npmor Telp Penduduk"
                  value={dataEntry.nomorTelp}
                />
              </Form.Item>
            </div>
            <div className="w-full">
              <Form.Item name="tanggalLahir" label="Tanggal Lahir">
                <DatePicker
                  placeholder="Pilih Kelahiran Tanggal"
                  style={{ width: "100%" }}
                  value={dataEntry.tanggalLahir}
                />
              </Form.Item>

              <Form.Item name="jenisKelamin" label="Jenis Kelamin">
                <Select
                  placeholder="Pilih Jenis Kelamin"
                  value={dataEntry.jenisKelamin}
                >
                  <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                  <Select.Option value="Perempuan">Perempuan</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="darah" label="Golongan darah">
                <Select
                  placeholder="Pilih Golongan Darah"
                  value={dataEntry.darah}
                >
                  {["A", "B", "AB", "O"].map((item, i) => (
                    <Select.Option key={i} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select placeholder="Pilih Status Diri Penduduk">
                  <Select.Option value="Menikah">Menikah</Select.Option>
                  <Select.Option value="Lajang">Lajang</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name={"statusPenduduk"} label="Status Penduduk">
                <Select placeholder="Pilih Status Tinggal Penduduk">
                  <Select.Option value="Tetap">Tetap</Select.Option>
                  <Select.Option value="Sementara">Sementara</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item className="bg-purp">
            <Button onClick={showModal} block type="primary" htmlType="submit">
              Tambahkan
            </Button>
          </Form.Item>
        </Form>
        <>
          <Modal
            title="Basic Modal"
            open={isModalOpen}
            bodyStyle={{}}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>nama: {dataEntry.nama}</p>
            <p>nik: {dataEntry.nik}</p>
            <p>noKK: {dataEntry.noKK}</p>
            <p>alamat: {dataEntry.alamat}</p>
            <p>nomorTelp: {dataEntry.nomorTelp}</p>
            {/* <p>nama: {dataEntry.darah}</p>
            <p>nama: {dataEntry.tanggalLahir}</p>
            <p>nama: {dataEntry.darah}</p>
            <p>nama: {dataEntry.jenisKelamin}</p>
            <p>nama: {dataEntry.status}</p>
            <p>nama: {dataEntry.statusPenduduk}</p> */}
          </Modal>
        </>
      </div>
    </div>
  );
}

export default TambahPenduduk;
