import React, {  useState } from "react";
import {
  Breadcrumb,
  Layout,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Space,
  Modal,
  message as mes,
  Upload,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { axiosWithMultipart } from "../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";
import { currentDate } from "../../utils/currentDate";
import { PlusOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
function VerifikasiPembayaran() {
  const user = useSelector((state) => state.userReducer.value);
  const location = useLocation();
  const prePageState = location.state.data;
  const [dataPembayaran, setdataPembayaran] = useState({
    nama: prePageState?.nama || "",
    nik: prePageState?.nik || "",
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
    setFile(e.file.fileList[0].originFileObj);
    setdataPembayaran(e);
    setIsModalOpen(true);
  };
  // upload


  const handleVerikifikasiPembayaran = async () => {
    const url = `administrasikelurahan/src/post/addRiwayatPembayaran.php`;
    const date = `${dataPembayaran.waktu_pembayaran.$d.getFullYear()}-${
      dataPembayaran.waktu_pembayaran.$d.getMonth() + 1
    }-${dataPembayaran.waktu_pembayaran.$d.getDate()}`;
    // Create FormData
    const formData = new FormData();
    formData.append("file", file);
    formData.append("nama", dataPembayaran.nama);
    formData.append("nik", dataPembayaran.nik);
    formData.append("jumlah_transaksi", dataPembayaran.jumlah_transaksi);
    formData.append("waktu_pembayaran", date);
    formData.append("metode", dataPembayaran.metode);
    formData.append("rt", prePageState?.rt || user?.rt);
    formData.append("waktu_verifikasi", currentDate);
    formData.append("verifikator", user.username);
    formData.append("id_user", prePageState?.id_user);
    try {
        const res = await axiosWithMultipart(url, {
          method: "POST",
          
          data: formData,
        });
      const { value, message } = res.data;
      if (parseInt(value) === 1) {
        mes.success(message);
        navigate("/Dashboard/Kelola-IPL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [fileList, setFileList] = useState([]);
 const [selectedMetode, setSelectedMetode] = useState(null);
    const handleMetodeChange = (value) => {
      setSelectedMetode(value);
    };

  const handleChange = (info) => {
    setFileList(info.fileList.slice(-1)); // Hanya menyimpan file terakhir
  };

  return (
    <div className=" md:mx-20">
      <Header
        style={{
          position: "sticky",
          top: 20,
          zIndex: 99,
        }}
        className="hidden  bg-white items-center md:flex mt-5 "
      >
        <Breadcrumb
          items={[
            { title: "Admin" },
            { title: <Link to={"/KelolaIPL"}>Kelola IPL</Link> },

            {
              title: (
                <Link to={"/VerifikasiPembayaran"}>Verifikasi Pembayaran</Link>
              ),
            },
          ]}
          style={{
            margin: "16px 0",
          }}
        />
      </Header>
      <Content className="mt-5 bg-white p-10">
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
            <Form.Item name="metode" label="Metode pembayaran" required>
              <Select
                placeholder="Pilih metode pembayaran"
                // value={dataPembayaran.metode}
                value={selectedMetode}
                onChange={handleMetodeChange}
              >
                {["Cash", "Transfer"].map((item, i) => (
                  <Select.Option key={i} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {/* upload */}
            {selectedMetode === "Transfer" && (
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
            )}
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
            <span> Metode: </span>
            <p> {dataPembayaran.metode}</p>
            <span> Jumlah: </span>
            <p> {dataPembayaran.jumlah_pembayaran}</p>
          </div>
        </Modal>
      </>
    </div>
  );
}

export default VerifikasiPembayaran;
