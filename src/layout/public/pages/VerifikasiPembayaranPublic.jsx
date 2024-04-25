import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Space, Upload, message as mes } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../utils/axioswithmultipart";
import { currentDate } from "../../admin/utils/currentDate";
import NavigatorBar from "../components/NavigatorBar";

function VerifikasiPembayaranPublic() {
  const user = useSelector((state) => state.userReducer.value);
  // console.log(user);
  const [dataPembayaran, setdataPembayaran] = useState({
    nama: user?.username || "",
    nik: user?.nik || "",
  });

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const handleOk = () => {
    handleVerikifikasiPembayaran();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleonFinish = (e) => {
    {
      e.file && setFile(e.file.fileList[0].originFileObj);
    }

    setdataPembayaran(e);
    setIsModalOpen(true);
  };
  const [fileList, setFileList] = useState([]);

  const handleChange = (info) => {
    setFileList(info.fileList.slice(-1)); // Hanya menyimpan file terakhir
  };
  const handleVerikifikasiPembayaran = async () => {
    const url = `administrasikelurahan/src/post/ipl/upload-bukti-pembayaran.php`;
    const date = `${dataPembayaran.waktu_pembayaran.$d.getFullYear()}-${
      dataPembayaran.waktu_pembayaran.$d.getMonth() + 1
    }-${dataPembayaran.waktu_pembayaran.$d.getDate()}`;
    // Create FormData
    const formData = new FormData();

    file && formData.append("file", file);

    formData.append("nama", dataPembayaran.nama);
    formData.append("nik", dataPembayaran.nik);
    formData.append("jumlah_transaksi", dataPembayaran.jumlah_transaksi);
    formData.append("waktu_pembayaran", date);
    // formData.append("metode", dataPembayaran.metode);
    formData.append("rt", user?.data.rt || user?.rt);
    formData.append("waktu_verifikasi", currentDate);
    // formData.append("verifikator", user.username);
    formData.append("id_user", user?.id);
    try {
      const res = await axiosWithMultipart(url, {
        method: "POST",
        data: formData,
      });
      // console.log(res.data);
      const { value, message } = res.data;
      if (parseInt(value) === 1) {
        mes.success(message);
        navigate("/Informasi-iuran");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="overscroll-y-auto bg-slate-100 h-screen">
      <NavigatorBar />
      <Content className="mt-20 container bg-white p-6 rounded-md ">
        <Form
          initialValues={dataPembayaran}
          onFinish={handleonFinish}
          layout="vertical"
          size={"medium"}
          className="w-full"
        >
          <Space direction="vertical" className="w-full grid md:grid-cols-2 ">
            <Form.Item required name="nama" label="Nama">
              <Input placeholder="Masukan Nama" />
            </Form.Item>

            <Form.Item required name="nik" label="NIK">
              <Input placeholder="Masukan NIK" />
            </Form.Item>

            <Form.Item
              required
              name="jumlah_transaksi"
              label="Jumlah Pembayaran"
            >
              <Input placeholder="Masukan Jumlah Pembayaran" />
            </Form.Item>

            <Form.Item
              required
              name="waktu_pembayaran"
              label="Tanggal Pembayaran"
            >
              <DatePicker
                className="w-full"
                placeholder="Pilih Tanggal Pembayaran"
              />
            </Form.Item>
            {/* upload */}
            <Form.Item label="Upload" name="file">
              <Upload.Dragger
                beforeUpload={() => false}
                fileList={fileList}
                maxCount={1}
                action=""
                listType="picture"
                onChange={handleChange}
              >
                <button
                  style={{
                    border: 0,
                    background: "none",
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              </Upload.Dragger>
            </Form.Item>
          </Space>
          <Form.Item>
            <Button type="primary" className="bg-purp" block htmlType="submit">
              Verifikasi
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <>
        <Modal
          title="Apakah data pembayaran sudah benar?"
          open={isModalOpen}
          onOk={handleOk}
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
            <span> Nama: </span>
            <p> {dataPembayaran.nama}</p>
            <span> NIK: </span>
            <p> {dataPembayaran.nik}</p>

            <span> Jumlah: </span>
            <p> {dataPembayaran.jumlah_transaksi}</p>
          </div>
        </Modal>
      </>
    </section>
  );
}

export default VerifikasiPembayaranPublic;
