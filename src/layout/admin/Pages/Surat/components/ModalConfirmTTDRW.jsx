import { Button, Form, Modal, Select, message as mes } from "antd";
import React, { useState } from "react";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";
import { useSelector } from "react-redux";

export default function ModalConfirmTTDRW({ handleOpen, isOpen, dataConfirm }) {
  const user = useSelector((state) => state.userReducer.value);
  const [isSetuju, setisSetuju] = useState();
  const handleConfirmPermohonanSurat = async () => {
    const url =
      "/administrasikelurahan/src/update/update-persetujuan-surat-rw.php";

    const response = await axiosWithMultipart({
      data: {
        iduser: user?.iduser,
        id_pemohon: dataConfirm?.id_pemohon,
        isConfirm: isSetuju,
      },
      method: "post",
      url,
    });
    const data = response.data;
    // console.log(data);
    const { message, value } = data;
    if (value == 1) {
      mes.success(message);
      window.location.reload();
    } else {
      mes.success(message);
    }
  };
  return (
    <>
      <Modal
        footer={null}
        title={
          <p>
            Apakah anda ingin <span className="text-green-600">menyetujui</span>{" "}
            permohonan surat?
          </p>
        }
        open={isOpen}
        onCancel={() => handleOpen(false)}
      >
        <Form onFinish={handleConfirmPermohonanSurat}>
          <Form.Item name="setujui">
            <Select
              onChange={(e) => setisSetuju(e)}
              placeholder="Pilih"
              value={dataConfirm ? "Setujui" : "Tidak Setujui"}
            >
              <Select.Option value={1}>Benar</Select.Option>
              <Select.Option value={0}>Tidak</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Simpan</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
