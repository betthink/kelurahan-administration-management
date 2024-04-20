// library
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
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
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { axiosInstance } from "../../../utils/axiosInstance";
function RegistrasiPenduduk() {
  // variables
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataLembaga, setDataLembaga] = useState([]);

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
    rt: "",
    rw: "",
    password: "",
  });

  const handleGetLembaga = async () => {
    const url = `/administrasikelurahan/src/api/lembaga/fetch_all_lembaga.php`;
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get(url);
      const data = response.data;
      if (response.status === 200) {
        setDataLembaga(data);
      }
    } catch (error) {
      throw error;
    }
  };
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
      rt,
      password,
      rw
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
      rt,
      rw,
      password,
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
          data: { ...dataEntry},
          // data: { ...dataEntry, rw: "001" },
        }
      );
      const { value, message } = response.data;
      // console.log(response.data);
      if (value === 1) {
        mes.success(message);
        navigate("/Landingpage");
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
  useEffect(() => {
    handleGetLembaga();
  }, []);
  return (
    <Space
      className="h-full w-full container flex justify-center items-center bg-primary"
      direction="vertical"
      size={16}
    >
      <Card
        className="w-full  px-20"
        title={
          <p className="text-xl text-green-600">
            Selamat datang{" "}
            <span className="text-sm text-black">
              di halaman registrasi penduduk
            </span>{" "}
          </p>
        }
        extra={
          <Link
            to={"/Landingpage"}
            className="text-green-600 border p-2 rounded-md border-green-600"
          >
            Kembali
          </Link>
        }
      >
        <div className="flex justify-center items-center  w-full">
          <div className="h-full     w-full">
            {/* form */}

            <Form
              onFinish={onFinish}
              layout="vertical"
              size={"medium"}
              className="w-full justify-center flex  flex-col bg-white  "
            >
              <Space
                direction="vertical"
                className="grid md:grid-cols-3 grid-cols-1 gap-6"
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
                      message: "NIK minimal 16 karakter",
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
                      message: "Nomor KK minimal 16 karakter",
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
                <Form.Item
                  name="pekerjaan"
                  label="Pekerjaan"
                  rules={[
                    {
                      required: true,
                      message: "Pekerjaan tidak boleh kosong",
                    },
                  ]}
                >
                  <Input
                    placeholder="Masukan Pekerjaan Penduduk"
                    value={dataEntry.pekerjaan}
                  />
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Agama tidak boleh kosong",
                    },
                  ]}
                  name="agama"
                  label="Agama"
                  required
                >
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
                      required: true,
                      message: "Nomor telpon tidak boleh kosong",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nomor Telepon hanya boleh berisi angka",
                    },
                  ]}
                >
                  <Input
                    maxLength={14}
                    placeholder="Masukan Nomor Telpon"
                    value={dataEntry.nomor_telp}
                  />
                </Form.Item>

                <Form.Item
                  name="tanggalLahir"
                  label="Tanggal Lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tanggal lahir tidak boleh kosong",
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Pilih Kelahiran Tanggal"
                    style={{ width: "100%" }}
                    value={dataEntry.tanggal_lahir}
                  />
                </Form.Item>

                <Form.Item
                  name="tempatLahir"
                  label="Tempat Lahir"
                  rules={[
                    {
                      required: true,
                      message: "Tempat lahir tidak boleh kosong",
                    },
                  ]}
                >
                  <Input
                    placeholder="Masukan Tempat Lahir Sesuai KTP"
                    value={dataEntry.tempat_lahir}
                  />
                </Form.Item>

                <Form.Item
                  name="jenisKelamin"
                  label="Jenis Kelamin"
                  rules={[
                    {
                      required: true,
                      message: "Jenis kelamin tidak boleh kosong",
                    },
                  ]}
                >
                  <Select
                    placeholder="Pilih Jenis Kelamin"
                    value={dataEntry.jenis_kelamin}
                  >
                    <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                    <Select.Option value="Perempuan">Perempuan</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="darah"
                  label="Golongan darah"
                  rules={[
                    {
                      required: true,
                      message: "Golongan darah tidak boleh kosong",
                    },
                  ]}
                >
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
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[
                    {
                      required: true,
                      message: "Status tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Pilih Status Diri Penduduk">
                    <Select.Option value="Menikah">Menikah</Select.Option>
                    <Select.Option value="Lajang">Lajang</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={"statusPenduduk"}
                  label="Status Penduduk"
                  rules={[
                    {
                      required: true,
                      message: "Status Kependudukan boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Pilih Status Tinggal   ">
                    <Select.Option value="Tetap">Tetap</Select.Option>
                    <Select.Option value="Sementara">Sementara</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="kepalaKeluarga"
                  label="kepala Keluarga?"
                  rules={[
                    {
                      required: true,
                      message: "Status kepala keluarga boleh kosong",
                    },
                  ]}
                >
                  <Select
                    placeholder="Kepala keluarga?"
                    value={dataEntry.kepala_keluarga}
                  >
                    <Select.Option value={1}>Benar</Select.Option>
                    <Select.Option value={0}>Tidak</Select.Option>
                  </Select>
                </Form.Item>
                {/* rt */}
                <Form.Item
                  name="rt"
                  label="RT"
                  rules={[
                    {
                      required: true,
                      message: "RT tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Pilih RT" value={dataEntry.rt}>
                    {dataLembaga.map((item, i) => (
                      <Select.Option key={i} value={item.rt}>
                        {item.rt}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="rw"
                  label="RW"
                  rules={[
                    {
                      required: true,
                      message: "RW tidak boleh kosong",
                    },
                  ]}
                >
                  <Select placeholder="Pilih RW" value={dataEntry.rw}>
                    {["001", "002", "003", "004", "005"].map((item, i) => (
                      <Select.Option key={i} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="password"
                  label="password"
                  rules={[
                    {
                      required: true,
                      message: "Password tidak boleh kosong",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Masukan password"
                    value={dataEntry.password}
                  />
                </Form.Item>
              </Space>
              <Form.Item className="rounded-md shadow-md mt-6">
                <Button
                  className="h-12 font-semibold hover:font-bold hover:translate-y-[.1rem] bg-green-600  hover:bg-white hover:text-green-600"
                  block
                  type="primary"
                  htmlType="submit"
                  onClick={showModal}
                >
                  Daftar
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
                <div className="grid grid-cols-2">
                  <span>nik:</span>
                  <p class="text-green-600">{dataEntry.nik}</p>
                  <span>nama:</span>
                  <p class="text-green-600">{dataEntry.nama}</p>
                  <span>noKK:</span>
                  <p class="text-green-600">{dataEntry.no_kk}</p>
                  <span>alamat:</span>
                  <p class="text-green-600">{dataEntry.alamat}</p>
                  <span>nomorTelp:</span>
                  <p class="text-green-600">{dataEntry.nomor_telp}</p>
                  <span>tempat_lahir:</span>
                  <p class="text-green-600">{dataEntry.tempat_lahir}</p>
                  <span>kepala Keluarga:</span>
                  <p class="text-green-600">{dataEntry.kepala_keluarga}</p>
                  <span>darah:</span>
                  <p class="text-green-600">{dataEntry.darah}</p>
                  <span>tangga lLahir:</span>
                  <p class="text-green-600">{dataEntry.tanggal_lahir}</p>
                  <span>jenis Kelamin:</span>
                  <p class="text-green-600">{dataEntry.jenis_kelamin}</p>
                  <span>status:</span>
                  <p class="text-green-600">{dataEntry.status_diri}</p>
                  <span>status Penduduk:</span>
                  <p class="text-green-600">{dataEntry.status_tinggal}</p>
                </div>
              </Modal>
            </>
          </div>
        </div>
      </Card>
    </Space>
  );
}

export default RegistrasiPenduduk;
