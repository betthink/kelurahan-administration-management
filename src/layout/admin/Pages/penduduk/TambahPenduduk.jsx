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
  message as mes,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
// components
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
function TambahPenduduk() {
  // variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.value);

  //   atribute form
  const [dataEntry, setdataEntry] = useState({
    nama: "",
    nik: "",
    no_kk: "",
    tanggal_lahir: "",
    tempat_lahir: "",
    alamat: "",
    pekerjaan: "",
    agama: "",
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
      pekerjaan,
      agama,
      nomorTelp,
      tanggalLahir,
      darah,
      jenisKelamin,
      status,
      statusPenduduk,
      tempatLahir,
      kepalaKeluarga,
    } = e;
    const date = `${tanggalLahir.$d.getFullYear()}-${(
      tanggalLahir.$d.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${tanggalLahir.$d
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    setdataEntry({
      ...dataEntry,

      nama,
      nik,
      no_kk: noKK,
      tanggal_lahir: date,
      tempat_lahir: tempatLahir,
      alamat,
      pekerjaan,
      agama,
      darah,
      kepala_keluarga: kepalaKeluarga,
      status_tinggal: statusPenduduk,
      status_diri: status,
      nomor_telp: nomorTelp,
      jenis_kelamin: jenisKelamin,
    });
  };
  const agamaOption = [
    "Islam",
    "Kristen",
    "Katholik",
    "Hindu",
    "Budha",
    "Lain-Lain",
  ];
  const handleAddPenduduk = async () => {
    try {
      const response = await axiosWithMultipart(
        "/administrasikelurahan/src/post/addDataPenduduk.php",
        {
          method: "post",
          data: { ...dataEntry, rt: user.rt, rw: user.rw },
        }
      );
      const { value, message } = response.data;
      console.log(response.data);
      if (value === 1) {
        mes.success(message);
        navigate("/Dashboard/Kelola-Penduduk");
      } else {
        mes.error(message);
      }
    } catch (error) {
      console.log(error);
      throw error;
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
          {
            title: (
              <Link to={"/Dashboard/Kelola-Penduduk"}>Kelola Penduduk</Link>
            ),
          },
          {
            title: (
              <Link to={"/Dashboard/Tambah-Penduduk"}>Tambah Penduduk</Link>
            ),
          },
        ]}
        style={{
          margin: "16px 0",
        }}
      />
      <div className="h-full self-center flex  p-6 bg-white px-20">
        {/* form */}
        <Form
          onFinish={onFinish}
          layout="vertical"
          size={"medium"}
          className="w-full justify-center flex  flex-col "
        >
          <Space
            direction="vertical"
            className="grid md:grid-cols-3 grid-cols-1 "
          >
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="nama"
              label="Nama"
            >
              <Input
                placeholder="Masukan Nama Penduduk"
                value={dataEntry.nama}
              />
            </Form.Item>
            <Form.Item
              name="nik"
              label="NIK"
              rules={[
                {
                  required: true,
                  message: "NIK tidak boleh kosong",
                },
                {
                  min: 16,
                  message: "NIK minimal setidaknya 16 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "NIK hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                name="nik"
                maxLength={17}
                placeholder="Masukan NIK Penduduk"
                value={dataEntry.nik}
              />
            </Form.Item>
            <Form.Item
              name="noKK"
              label="No. KK"
              rules={[
                {
                  required: true,
                  message: "Nomor KK tidak boleh kosong",
                },
                {
                  min: 16,
                  message: "Nomor KK minimal setidaknya 16 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Nomor KK hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                maxLength={17}
                placeholder="Masukan Nomor KK Penduduk"
                value={dataEntry.no_kk}
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Nomor KK tidak boleh kosong",
                },
              ]}
              name="alamat"
              label="Alamat"
            >
              <Input
                placeholder="Masukan Alamat Penduduk"
                value={dataEntry.alamat}
              />
            </Form.Item>
            <Form.Item name="pekerjaan" label="Pekerjaan" required>
              <Input
                placeholder="Masukan Pekerjaan Penduduk"
                value={dataEntry.pekerjaan}
              />
            </Form.Item>
            <Form.Item name="agama" label="Agama" required>
              <Select
                placeholder="Pilih Agama Penduduk"
                value={dataEntry.agama}
              >
                {agamaOption.map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="nomorTelp"
              label="Nomor Telp"
              required
              rules={[
                {
                  pattern: /^[0-9]+$/,
                  message: "Nomor Telepon hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                placeholder="Masukan Npmor Telp Penduduk"
                value={dataEntry.nomor_telp}
              />
            </Form.Item>

            <Form.Item name="tanggalLahir" label="Tanggal Lahir" required>
              <DatePicker
                placeholder="Pilih Kelahiran Tanggal"
                style={{ width: "100%" }}
                value={dataEntry.tanggal_lahir}
              />
            </Form.Item>

            <Form.Item name="tempatLahir" label="Tempat Lahir" required>
              <Input
                placeholder="Masukan Tempat Lahir Sesuai KTP"
                value={dataEntry.tempat_lahir}
              />
            </Form.Item>

            <Form.Item name="jenisKelamin" label="Jenis Kelamin" required>
              <Select
                placeholder="Pilih Jenis Kelamin"
                value={dataEntry.jenis_kelamin}
              >
                <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                <Select.Option value="Perempuan">Perempuan</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item name="darah" label="Golongan darah" required>
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
            <Form.Item name="status" label="Status" required>
              <Select placeholder="Pilih Status Diri Penduduk">
                <Select.Option value="Menikah">Menikah</Select.Option>
                <Select.Option value="Lajang">Lajang</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name={"statusPenduduk"} label="Status Penduduk" required>
              <Select placeholder="Pilih Status Tinggal Penduduk">
                <Select.Option value="Tetap">Tetap</Select.Option>
                <Select.Option value="Sementara">Sementara</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="kepalaKeluarga" label="kepala Keluarga?" required>
              <Select
                placeholder="Pilih Status kepala keluarga"
                value={dataEntry.kepala_keluarga}
              >
                <Select.Option value={1}>Benar</Select.Option>
                <Select.Option value={0}>Tidak</Select.Option>
              </Select>
            </Form.Item>
          </Space>
          <Form.Item className="rounded-md shadow-md">
            <Button
              className="h-10 font-semibold hover:font-bold hover:translate-y-[.1rem] bg-third hover:bg-none"
              block
              type="primary"
              htmlType="submit"
              onClick={showModal}
            >
              Tambahkan
            </Button>
          </Form.Item>
        </Form>
        <>
          <Modal
            title="Apakah Data Sudah Benar?"
            open={isModalOpen}
            footer={[
              <Button
                key="back"
                className="bg-danger text-white"
                onClick={handleCancel}
              >
                Batalkan
              </Button>,
              <Button
                className="bg-success"
                key="submit"
                type="primary"
                onClick={handleOk}
              >
                Submit
              </Button>,
            ]}
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
            <p>status: {dataEntry.status_diri}</p>
            <p>status Penduduk: {dataEntry.status_tinggal}</p>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default TambahPenduduk;
