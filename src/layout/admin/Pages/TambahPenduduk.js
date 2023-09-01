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
  Space,
} from "antd";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios";
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
    tempatLahir: "",
    kepalaKeluarga: "",
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
      tempatLahir,
      kepalaKeluarga,
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
      tempatLahir,
      kepalaKeluarga,
    });
    // console.log(tanggalLahir.$d);
  };
  const handleAddPenduduk = async () => {
    try {
      const response = await axiosInstance.post(
        "/administrasikelurahan/src/post/addDataPenduduk.php",
        {
          nama: "akuuu",
          nik: dataEntry.nik,
          no_kk: dataEntry.noKK,
          tanggal_lahir: dataEntry.tanggalLahir,
          tempat_lahir: dataEntry.tempatLahir,
          alamat: dataEntry.alamat,
          jenis_kelamin: dataEntry.jenisKelamin,
          nomor_telp: dataEntry.nomorTelp,
          darah: dataEntry.darah,
          kepala_keluarga: dataEntry.kepalaKeluarga,
          status_tinggal: dataEntry.statusPenduduk,
          status_diri: dataEntry.status,
        }
      );
      console.log({ dataEntry });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await handleAddPenduduk();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    // console.log(dataEntry);
  }, []);
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
          <Space
            direction="vertical"
            className="grid md:grid-cols-2 grid-cols-1"
          >
            <Form.Item name="nama" label="Nama">
              <Input
                placeholder="Masukan Nama Penduduk"
                value={dataEntry.nama}
              />
            </Form.Item>
            <Form.Item name="nik" label="NIK">
              <Input placeholder="Masukan NIK Penduduk" value={dataEntry.nik} />
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

            <Form.Item name="tanggalLahir" label="Tanggal Lahir">
              <DatePicker
                placeholder="Pilih Kelahiran Tanggal"
                style={{ width: "100%" }}
                value={dataEntry.tanggalLahir}
              />
            </Form.Item>

            <Form.Item name="tempatLahir" label="Tempat Lahir">
              <Input
                placeholder="Masukan Tempat Lahir Sesuai KTP"
                value={dataEntry.tempatLahir}
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
            <Form.Item name="kepalaKeluarga" label="kepala Keluarga?">
              <Select
                placeholder="Pilih Status kepala keluarga"
                value={dataEntry.kepalaKeluarga}
              >
                <Select.Option value={1}>Benar</Select.Option>
                <Select.Option value={0}>Tidak</Select.Option>
              </Select>
            </Form.Item>
          </Space>
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
            <p>tempat_lahir: {dataEntry.tempatLahir}</p>
            <p>kepala Keluarga: {dataEntry.kepalaKeluarga}</p>
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
