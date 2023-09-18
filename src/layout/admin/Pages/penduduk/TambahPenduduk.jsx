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
import { Link, useNavigate } from "react-router-dom";
// components
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
function TambahPenduduk() {
  // variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  //   atribute form
  const [dataEntry, setdataEntry] = useState({
    nama: "",
    nik: "",
    no_kk: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    alamat: "",
    darah: "",
    kepala_keluarga: "",
    status_tinggal: "",
    status_diri: "",
    nomor_telp: "",
    jenis_kelamin: "",
  });
  // functions
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
    const date = `${tanggalLahir.$d.getFullYear()}-${
      tanggalLahir.$d.getMonth() + 1
    }-${tanggalLahir.$d.getDate()}`;
    setdataEntry({
      ...dataEntry,

      nama,
      nik,
      no_kk: noKK,
      tanggal_lahir: date,
      tempat_lahir: tempatLahir,
      alamat,
      darah,
      kepala_keluarga: kepalaKeluarga,
      status_tinggal: statusPenduduk,
      status_diri: status,
      nomor_telp: nomorTelp,
      jenis_kelamin: jenisKelamin,
    });
  };
  const handleAddPenduduk = async () => {
    try {
      const response = await axiosWithMultipart(
        "/administrasikelurahan/src/post/addDataPenduduk.php",
        {
          method: "post",
          data: dataEntry,
        }
      );
      console.log(response.data);
      const { value, message } = response.data;
      if (value === 1) {
        alert(message);
        navigate("/KelolaPenduduk");
      } else {
        alert(message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // modal
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
  useEffect(() => {}, []);
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
      />
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
                value={dataEntry.no_kk}
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
                value={dataEntry.nomor_telp}
              />
            </Form.Item>

            <Form.Item name="tanggalLahir" label="Tanggal Lahir">
              <DatePicker
                placeholder="Pilih Kelahiran Tanggal"
                style={{ width: "100%" }}
                value={dataEntry.tanggal_lahir}
              />
            </Form.Item>

            <Form.Item name="tempatLahir" label="Tempat Lahir">
              <Input
                placeholder="Masukan Tempat Lahir Sesuai KTP"
                value={dataEntry.tempat_lahir}
              />
            </Form.Item>

            <Form.Item name="jenisKelamin" label="Jenis Kelamin">
              <Select
                placeholder="Pilih Jenis Kelamin"
                value={dataEntry.jenis_kelamin}
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
                value={dataEntry.kepala_keluarga}
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
            title="Apakah Data Sudah Benar?"
            open={isModalOpen}
            bodyStyle={{}}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>nama: {dataEntry.nama}</p>
            <p>nik: {dataEntry.nik}</p>
            <p>noKK: {dataEntry.no_kk}</p>
            <p>alamat: {dataEntry.alamat}</p>
            <p>nomorTelp: {dataEntry.nomor_telp}</p>
            <p>tempat_lahir: {dataEntry.tempat_lahir}</p>
            <p>kepala Keluarga: {dataEntry.kepala_keluarga}</p>
            <p>darah: {dataEntry.darah}</p>
            <p>tangga lLahir: {dataEntry.tanggal_lahir}</p>
            <p>jenis Kelamin: {dataEntry.jenis_kelamin}</p>
            <p>status: {dataEntry.status}</p>
            <p>status Penduduk: {dataEntry.statusPenduduk}</p>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default TambahPenduduk;
