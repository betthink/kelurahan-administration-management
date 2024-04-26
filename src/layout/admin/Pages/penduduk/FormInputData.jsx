import { Form, Space, Button, Input, message as mes, Modal } from "antd";
import React, { useState } from "react";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import axios from "axios";

export default function FormInputData() {
  const [formDataArray, setFormDataArray] = useState([
    { nama: "", nik: "", no_kk: "" },
  ]);
  const [dataFinish, setdataFinish] = useState([]);

  // Fungsi untuk menambahkan form baru
  const handleAddForm = () => {
    setFormDataArray([...formDataArray, { nama: "", nik: "", no_kk: "" }]);
  };

  // Fungsi untuk menghapus form
  const handleRemoveForm = (indexToRemove) => {
    setFormDataArray(
      formDataArray.filter((_, index) => index !== indexToRemove)
    );
  };
  const onFinish = async () => {
    const formData = formDataArray.map((formDataItem) => {
      const formDataInstance = new FormData();
      formDataInstance.append("nama", formDataItem.nama);
      formDataInstance.append("nik", formDataItem.nik);
      formDataInstance.append("no_kk", formDataItem.no_kk);
      return formDataInstance;
    });
    // console.log(formData);
    // return;
    try {
      const responses = await Promise.all(
        formData.map(async (formDataItem) => {
          try {
            const response = await axios.post(
              "http://localhost/administrasikelurahan/src/post/penduduk/tambahpenduduktest.php",
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
      console.log(responses);
      responses.forEach(({ value, message }) => {
        if (value === 1) {
          mes.success(message);
          // Navigasi atau lakukan tindakan setelah berhasil menambahkan data
        } else {
          mes.error(message);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      mes.error("Terjadi kesalahan saat menambahkan data penduduk");
    }
  };

  const onFinishWithConfirmation = () => {
    Modal.confirm({
      title: "Tambahkan Data Penduduk?",
      content: "Anda yakin ingin menambahkan data penduduk?",
      onOk: onFinish, // Jika tombol OK ditekan, lanjutkan dengan onFinish
    });
  };
  return (
    <Form
      onFinish={onFinishWithConfirmation}
      layout="vertical"
      size={"medium"}
      className="w-full justify-center flex  flex-col "
    >
      {formDataArray.map((item, index) => (
        <React.Fragment key={index}>
          <Form.Item
            className={`${index !== 0 ? "mt-6  flex flex-row gap-3" : ""} `}
          >
            <span className="font-bold text-lg">
              Penduduk {index.toString()}
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
                value={formDataArray[index].nama} // Menghubungkan nilai input dengan state aplikasi
                onChange={(e) => {
                  const updatedFormData = [...formDataArray];
                  updatedFormData[index].nama = e.target.value;
                  setFormDataArray(updatedFormData);
                }}
              />
            </Form.Item>
            <Form.Item
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
                placeholder="Masukan NIK Penduduk"
                value={formDataArray[index].nik} // Menghubungkan nilai input dengan state aplikasi
                onChange={(e) => {
                  const updatedFormData = [...formDataArray];
                  updatedFormData[index].nik = e.target.value;
                  setFormDataArray(updatedFormData);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Nomor KK"
              rules={[
                {
                  required: true,
                  message: "NO KK tidak boleh kosong",
                },
                {
                  min: 16,
                  message: "NO KK minimal setidaknya 16 karakter",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "NO KK hanya boleh berisi angka",
                },
              ]}
            >
              <Input
                maxLength={17}
                placeholder="Masukan NO kk Penduduk"
                value={formDataArray[index].no_kk} // Menghubungkan nilai input dengan state aplikasi
                onChange={(e) => {
                  const updatedFormData = [...formDataArray];
                  updatedFormData[index].no_kk = e.target.value;
                  setFormDataArray(updatedFormData);
                }}
              />
            </Form.Item>
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
            // onClick={showModal}
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
  );
}
