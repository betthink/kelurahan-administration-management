import { Button, Form, Modal, Select, message as mes } from "antd";
import React, { useState } from "react";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";

export default function ModalConfirmTTDRW({ handleOpen, isOpen, dataConfirm }) {
  const [isSetuju, setisSetuju] = useState();
  const handleConfirmPermohonanSurat = async () => {
    const url =
      "/administrasikelurahan/src/update/update-persetujuan-surat-rw.php";

    const response = await axiosWithMultipart({
      data: {
        id_pemohon: dataConfirm?.id_pemohon,
        isConfirm: isSetuju,
      },
      method: "post",
      url,
    });
    const data = response.data;
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
          dataConfirm?.status_permohonan == "0" ? (
            <p>
              Apakah anda ingin{" "}
              <span className="text-green-600">menyetujui</span> permohonan
              surat dengan memberikan tanda tangan?
            </p>
          ) : (
            <p>
              Apakah anda ingin <span className="text-red-400">menolak</span>{" "}
              permohonan surat?
            </p>
          )
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
