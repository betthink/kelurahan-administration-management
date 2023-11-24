import { Button, Form, Modal, Select, message as mes } from "antd";
import React from "react";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";
import { useNavigate } from "react-router-dom";

export default function ModalUpdateTahapanVaksin({
  onCancel,
  isOpen,
  dataJenisVaksin,
  idImunisasi,
}) {
  const navigate = useNavigate();
  async function handleUpdateTahapanVaksin(value) {
    const { tahapanVaksin } = value;

    const url = `/administrasikelurahan/src/update/updateTahapanVaksinPeserta.php`;
    try {
      const res = await axiosWithMultipart(url, {
        method: "POST",
        data: {
          id_imunisasi: idImunisasi,
          tahapanVaksin,
        },
      });
      const { data, status } = res;
      if (status === 200) {
        mes.success(data?.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Modal
      footer={false}
      title="Ubah Status Vaksinasi"
      onCancel={onCancel}
      open={isOpen}
    >
      <Form onFinish={handleUpdateTahapanVaksin}>
        <Form.Item name="tahapanVaksin">
          <Select placeholder="Ubah tahapan vaksin">
            {dataJenisVaksin?.map((item, i) => (
              <Select.Option value={item} key={i}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" block className="bg-third text-white">
            Ubah
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
