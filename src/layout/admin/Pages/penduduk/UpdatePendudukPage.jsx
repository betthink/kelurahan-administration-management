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
import { Header } from "antd/es/layout/layout";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { axiosInstance } from "../../../../utils/axiosInstance";

const UpdatePendudukPage = () => {
  // variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  //   atribute form
  const location = useLocation();
  const dataPenduduk = location.state.data;
  const [dataEntry, setdataEntry] = useState(dataPenduduk);
  const [isLoading, setisLoading] = useState(true);
  const dateFormat = "YYYY-MM-DD";
  // functions
  const onFinish = (e) => {
    // const {

    // } = e;
    console.log(e);
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

  const handleUpdatePenduduk = async (e) => {
    // const res = await axiosWithMultipart(
    //   `/administrasikelurahan/src/update/updateDataP.php`,
    //   {
    //     method: "post",
    //     data: ,
    //   }
    // );
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

  useEffect(() => {
    // handleGetDataById(id_penduduk);
    console.log(dataPenduduk);
  }, [isLoading]);
  return (
    <div className="mx-20">
      {/* path */}
      <Header className="header-breadcrump">
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
      </Header>
      <div className="h-full self-center flex  p-6 bg-white">
        {/* form */}
        <Form
          initialValues={dataPenduduk}
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
              <Input placeholder="Masukan Nama Penduduk" />
            </Form.Item>
            <Form.Item name="nik" label="NIK">
              <Input placeholder="Masukan NIK Penduduk" />
            </Form.Item>
            <Form.Item name="no_kk" label="No. KK">
              <Input placeholder="Masukan Nomor KK Penduduk" />
            </Form.Item>
            <Form.Item name="alamat" label="Alamat">
              <Input placeholder="Masukan Alamat Penduduk" />
            </Form.Item>
            <Form.Item name="nomor_telp" label="Nomor Telp">
              <Input placeholder="Masukan Npmor Telp Penduduk" />
            </Form.Item>

            <Form.Item name="tanggal_lahirr" label="Tanggal Lahir">
              <DatePicker
                // format="YYYY-MM-DD HH:mm:ss"
                // defaultValue='2015-01-01'
                placeholder="Pilih Kelahiran Tanggal"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item name="tempat_lahir" label="Tempat Lahir">
              <Input placeholder="Masukan Tempat Lahir Sesuai KTP" />
            </Form.Item>

            <Form.Item name="jenis_kelamin" label="Jenis Kelamin">
              <Select placeholder="Pilih Jenis Kelamin">
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="darah" label="Golongan darah">
              <Select placeholder="Pilih Golongan Darah">
                {["A", "B", "AB", "O"].map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="status_diri" label="Status">
              <Select placeholder="Pilih Status Diri Penduduk">
                <Select.Option value="Menikah">Menikah</Select.Option>
                <Select.Option value="Lajang">Lajang</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="status_tinggal" label="Status Penduduk">
              <Select placeholder="Pilih Status Tinggal Penduduk">
                <Select.Option value="Tetap">Tetap</Select.Option>
                <Select.Option value="Sementara">Sementara</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="kepala_keluarga" label="kepala Keluarga?">
              <Select placeholder="Pilih Status kepala keluarga">
                <Select.Option value={1}>Benar</Select.Option>
                <Select.Option value={0}>Tidak</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item className="bg-purp">
            <Button onClick={showModal} block type="primary" htmlType="submit">
              Simpan
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
};

export default UpdatePendudukPage;
