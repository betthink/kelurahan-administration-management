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
import { Link, useLocation, useNavigate } from "react-router-dom";
// components
import { useSelector } from "react-redux";
import axios from "axios";
import { axiosInstance } from "../../../utils/axiosInstance";
import { Header } from "antd/es/layout/layout";
function RegistrasiPenduduk() {
  // variables
  const [loading, setLoading] = useState(false);
  const [dataLembaga, setDataLembaga] = useState([]);
  const [formDataArray, setFormDataArray] = useState([
    {
      nama: "",
      nik: "",
      no_kk: "",
      tanggal_lahir: "",
      tempat_lahir: "",
      jenis_kelamin: null,
      pekerjaan: "",
      agama: null,
      alamat: "",
      nomor_telp: "",
      darah: null,
      kepala_keluarga: null,
      status_tinggal: null,
      status_diri: null,
      rt: null,
      rw: null,
    },
  ]);
  // const [formData, setFormData] = useState([{}]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const dataRoute = location.state;
  // console.log(user);
  // functions

  const agamaOption = [
    "Islam",
    "Kristen",
    "Katholik",
    "Hindu",
    "Budha",
    "Lain-Lain",
  ];

  // handle new form
  const handleAddForm = () => {
    // Menambahkan formulir baru ke dalam formData
    setFormDataArray([
      ...formDataArray,
      {
        nama: "",
        nik: "",
        no_kk: "",
        tanggal_lahir: null,
        tempat_lahir: "",
        jenis_kelamin: null,
        pekerjaan: "",
        agama: null,
        alamat: "",
        nomor_telp: "",
        darah: null,
        kepala_keluarga: 0,
        status_tinggal: null,
        status_diri: null,
        rt: null,
        rw: null,
      },
    ]);
  };
  const handleRemoveForm = (indexToRemove) => {
    // Salin array formData agar tidak merusak state asli
    const updatedFormData = [...formDataArray];

    // Hapus item dengan index yang sesuai dari array formData
    updatedFormData.splice(indexToRemove, 1);

    // Perbarui state formData dengan array yang telah diperbarui
    setFormDataArray(updatedFormData);
  };

  // on finish
  const onFinish = async () => {
    const formData = formDataArray.map((formDataItem, index) => {
      const formDataInstance = new FormData();
      const noKkDefault =
        formDataArray.length > 0 ? formDataArray[0].no_kk : null;
      const rtDefault = formDataArray.length > 0 ? formDataArray[0].rt : null;
      const rwDefault = formDataArray.length > 0 ? formDataArray[0].rt : null;
      if (index !== 0) {
        formDataInstance.append("no_kk", noKkDefault);
        formDataInstance.append("rt", rtDefault);
        formDataInstance.append("rw", rwDefault);
      } else {
        formDataInstance.append("rt", formDataItem?.rt);
        formDataInstance.append("rw", formDataItem?.rw);
        formDataInstance.append("no_kk", formDataItem.no_kk);
      }
      if (formDataItem && formDataItem.tanggal_lahir) {
        const date = `${formDataItem.tanggal_lahir.$d.getFullYear()}-${(
          formDataItem.tanggal_lahir.$d.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${formDataItem.tanggal_lahir.$d
          .getDate()
          .toString()
          .padStart(2, "0")}`;
        formDataInstance.append("tanggal_lahir", date);
      }
      // Membuat array dari properti yang akan di-append
      const propertiesToAppend = [
        "nama",
        "nik",
        // "no_kk",
        // "tanggal_lahir",
        "tempat_lahir",
        "jenis_kelamin",
        "pekerjaan",
        "agama",
        "alamat",
        "nomor_telp",
        "darah",
        "kepala_keluarga",
        "status_tinggal",
        "status_diri",
      ];
      // Melakukan append pada formDataInstance berdasarkan properti yang memiliki nilai
      propertiesToAppend.forEach((property) => {
        if (formDataItem[property] !== null) {
          formDataInstance.append(property, formDataItem[property]);
        }
      });
      return formDataInstance;
    });
    // console.log(formData);
    // return;
    try {
      const responses = await Promise.all(
        formData.map(async (formDataItem) => {
          try {
            const response = await axios.post(
              "http://localhost/administrasikelurahan/src/post/penduduk/tambahpendudukByPublic.php",
              formDataItem,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  // Authorization: "Bearer your_token_here", // Tambahkan header Authorization di sini
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error("Error:", error);
            return {
              value: 0,
              message: "Terjadi kesalahan saat mengirim data",
            };
          }
        })
      );
      // console.log(responses);
      let isSuccess = false;
      responses.forEach(({ value, message }) => {
        if (value === 1) {
          isSuccess = true; // Set variabel isSuccess menjadi true jika ada data yang berhasil ditambahkan
        }
      });
      if (isSuccess) {
        mes.success("Data berhasil ditambahkan");
        navigate("/Landingpage"); // Menampilkan pesan sukses sekali saja jika ada setidaknya satu data yang berhasil ditambahkan
      } else {
        mes.error("Tidak ada data yang berhasil ditambahkan"); // Menampilkan pesan kesalahan jika tidak ada data yang berhasil ditambahkan
      }
    } catch (error) {
      console.error("Error:", error);
      mes.error("Terjadi kesalahan saat menambahkan data penduduk");
    }
  };

  // is COnfirm
  const onFinishWithConfirmation = () => {
    Modal.confirm({
      title: "Tambahkan Data Penduduk?",
      content: "Anda yakin ingin menambahkan data penduduk?",
      onOk: onFinish, // Jika tombol OK ditekan, lanjutkan dengan onFinish
    });
  };
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
  useEffect(() => {
    handleGetLembaga();
  }, []);
  return (
    <div className="mx-20">
      {/* path */}
      <div className="pt-6 flex justify-end px-20">
        <Button
          type="dashed"
          className="p-3 bg-green-700 items-center flex text-white "
        >
          <Link to={"/Landingpage"}>Kembali</Link>
        </Button>
      </div>
      <div className="h-full self-center flex  p-6 bg-white px-20">
        {/* form */}
        <Form
          onFinish={onFinishWithConfirmation}
          layout="vertical"
          size={"medium"}
          className="w-full justify-center flex  flex-col "
        >
          {formDataArray.map((_, index) => (
            <React.Fragment key={index}>
              <Form.Item
                className={`${index !== 0 ? "mt-6  flex flex-row gap-3" : ""} `}
              >
                <span className="font-bold text-lg">
                  Penduduk {parseInt(index) + 1}
                </span>
                {index !== 0 && ( // Tampilkan tombol hanya jika index bukan 0
                  <Button
                    type="dashed"
                    onClick={() => handleRemoveForm(index)}
                    size="small"
                    className="p-2 bg-danger"
                  >
                    Hapus
                  </Button>
                )}
              </Form.Item>
              <Space
                direction="vertical"
                className={`grid w-full md:grid-cols-3 border py-6 px-3 rounded-md shadow-inner ${
                  index !== 0 ? "mt-6" : ""
                }`}
              >
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label="Nama"
                >
                  <Input
                    placeholder="Masukan Nama Penduduk"
                    value={formDataArray[index].nama}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].nama = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  key={`nik_${index}`}
                  // name={`nik_${index}`}
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
                    maxLength={17}
                    placeholder="Masukan NIK"
                    value={formDataArray[index].nik}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].nik = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                  />
                </Form.Item>
                {index === 0 && (
                  <Form.Item
                    key={`noKK${index}`}
                    label="No. KK"
                    rules={[
                      index === 0
                        ? [
                            {
                              required: true,
                              message: "Nomor KK tidak boleh kosong",
                            },
                            {
                              min: 16,
                              message:
                                "Nomor KK minimal setidaknya 16 karakter",
                            },
                            {
                              pattern: /^[0-9]+$/,
                              message: "Nomor KK hanya boleh berisi angka",
                            },
                          ]
                        : null,
                    ]}
                  >
                    <Input
                      maxLength={17}
                      placeholder="Masukan nomor KK"
                      value={formDataArray[index].no_kk}
                      onChange={(e) => {
                        const updatedFormData = [...formDataArray];
                        updatedFormData[index].no_kk = e.target.value;
                        setFormDataArray(updatedFormData);
                      }}
                    />
                  </Form.Item>
                )}
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Nomor KK tidak boleh kosong",
                    },
                  ]}
                  key={`alamat_${index}`}
                  // name={`alamat_${index}`}
                  label="Alamat"
                >
                  <Input
                    placeholder="Masukan Alamat Penduduk"
                    value={formDataArray[index].alamat}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].alamat = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  key={`pekerjaan_${index}`}
                  name={`pekerjaan_${index}`}
                  label="Pekerjaan"
                  required
                >
                  <Input
                    placeholder="Masukan Pekerjaan Penduduk"
                    value={formDataArray[index].pekerjaan}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].pekerjaan = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  key={`agama_${index}`}
                  // name={`agama_${index}`}
                  label="Agama"
                  required
                >
                  <Select
                    placeholder="pilih agama"
                    value={formDataArray[index].agama}
                    onChange={(e) => {
                      // console.log(e);
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].agama = e;
                      setFormDataArray(updatedFormData);
                    }}
                  >
                    {agamaOption.map((item, i) => (
                      <Select.Option key={i} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  // name={`nomorTelp_${index}`}
                  key={`nomorTelp_${index}`}
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
                    maxLength={14}
                    placeholder="Masukan Npmor Telp Penduduk"
                    value={formDataArray[index].nomor_telp}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].nomor_telp = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                    // value={dataEntry.nomor_telp}
                  />
                </Form.Item>

                <Form.Item
                  key={`tanggalLahir_${index}`}
                  // name={`tanggalLahir_${index}`}
                  label="Tanggal Lahir"
                  required
                >
                  <DatePicker
                    placeholder="Pilih Kelahiran Tanggal"
                    style={{ width: "100%" }}
                    value={formDataArray[index].tanggal_lahir}
                    onChange={(e) => {
                      // console.log(e)
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].tanggal_lahir = e;
                      setFormDataArray(updatedFormData);
                    }}
                    // value={dataEntry.tanggal_lahir}
                  />
                </Form.Item>

                <Form.Item
                  key={`tempatLahir_${index}`}
                  // name={`tempatLahir_${index}`}
                  label="Tempat Lahir"
                  required
                >
                  <Input
                    placeholder="Masukan Tempat Lahir Sesuai KTP"
                    // value={dataEntry.tempat_lahir}
                    value={formDataArray[index].tempat_lahir}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].tempat_lahir = e.target.value;
                      setFormDataArray(updatedFormData);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  key={`jenisKelamin_${index}`}
                  // name={`jenisKelamin_${index}`}
                  label="Jenis Kelamin"
                  required
                >
                  <Select
                    placeholder="Pilih Jenis Kelamin"
                    // value={dataEntry.jenis_kelamin}
                    value={formDataArray[index].jenis_kelamin}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].jenis_kelamin = e;
                      setFormDataArray(updatedFormData);
                    }}
                  >
                    <Select.Option value="Laki-Laki">Laki-Laki</Select.Option>
                    <Select.Option value="Perempuan">Perempuan</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  key={`darah_${index}`}
                  // name={`darah_${index}`}
                  label="Golongan darah"
                  required
                >
                  <Select
                    placeholder="Pilih Golongan Darah"
                    value={formDataArray[index].darah}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].darah = e;
                      setFormDataArray(updatedFormData);
                    }}
                    // value={dataEntry.darah}
                  >
                    {["A", "B", "AB", "O"].map((item, i) => (
                      <Select.Option key={i} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  key={`status_${index}`}
                  // name={`status_${index}`}
                  label="Status"
                  required
                >
                  <Select
                    placeholder="Pilih Status Diri Penduduk"
                    value={formDataArray[index].status_diri}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].status_diri = e;
                      setFormDataArray(updatedFormData);
                    }}
                  >
                    <Select.Option value="Menikah">Menikah</Select.Option>
                    <Select.Option value="Lajang">Lajang</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  key={`statusPenduduk_${index}`}
                  // name={`statusPenduduk_${index}`}
                  label="Status Penduduk"
                  required
                >
                  <Select
                    placeholder="Pilih Status Tinggal Penduduk"
                    value={formDataArray[index].status_tinggal}
                    onChange={(e) => {
                      const updatedFormData = [...formDataArray];
                      updatedFormData[index].status_tinggal = e;
                      setFormDataArray(updatedFormData);
                    }}
                  >
                    <Select.Option value="Tetap">Tetap</Select.Option>
                    <Select.Option value="Sementara">Sementara</Select.Option>
                  </Select>
                </Form.Item>

                {index === 0 && (
                  <>
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
                      <Select
                        placeholder="Pilih RT"
                        value={formDataArray[index].rt}
                        onChange={(e) => {
                          const updatedFormData = [...formDataArray];
                          updatedFormData[index].rt = e;
                          setFormDataArray(updatedFormData);
                        }}
                      >
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
                      <Select
                        placeholder="Pilih RW"
                        value={formDataArray[index].rw}
                        onChange={(e) => {
                          const updatedFormData = [...formDataArray];
                          updatedFormData[index].rw = e;
                          setFormDataArray(updatedFormData);
                        }}
                      >
                        {["001", "002", "003", "004", "005"].map((item, i) => (
                          <Select.Option key={i} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      key={`kepalaKeluarga_${index}`}
                      // name={`kepalaKeluarga_${index}`}
                      label="kepala Keluarga?"
                      required
                    >
                      <Select
                        placeholder="Pilih Status kepala keluarga"
                        // value={dataEntry.kepala_keluarga}
                        value={formDataArray[index].kepala_keluarga}
                        onChange={(e) => {
                          const updatedFormData = [...formDataArray];
                          updatedFormData[index].kepala_keluarga = e;
                          setFormDataArray(updatedFormData);
                        }}
                      >
                        <Select.Option value={1}>Benar</Select.Option>
                        <Select.Option value={0}>Tidak</Select.Option>
                      </Select>
                    </Form.Item>
                  </>
                )}
              </Space>
            </React.Fragment>
          ))}
          <Space>
            <Form.Item className="rounded-md shadow-md">
              <Button
                className="h-10 font-semibold hover:font-bold hover:translate-y-[.1rem] bg-third hover:bg-none"
                block
                type="primary"
                htmlType="submit"
              >
                Tambahkan
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="dashed" onClick={handleAddForm} block>
                Tambahkan Form
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </div>
    </div>
  );
}

export default RegistrasiPenduduk;
