import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select, message as mes } from "antd";
import { axiosWithMultipart } from "../../../../../utils/axioswithmultipart";
export default function ModalTampilkanData({ isOpen, onCancel, data, title }) {
  //   async function handleAddPesertaPosyandu(value) {
  //     const url = `/administrasikelurahan/src/post/addDataPesertaPosyandu.php`;
  //     try {
  //       const res = await axiosWithMultipart(url, {
  //         method: "POST",
  //         data: value,
  //       });
  //       const { data, status } = res;
  //       if (status === 200) {
  //         mes.success(data.message);
  //         onCancel();
  //         window.location.reload();
  //       } else {
  //         mes.success(data.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    <Modal footer={false} title={title} onCancel={onCancel} open={isOpen}>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        <p>nama:</p> <span className="text-green-500"> {data?.nama}</span>
        <p>nik:</p> <span className="text-green-500"> {data?.nik}</span>
        <p>no Kartu Keluarga:</p> <span className="text-green-500"> {data?.no_kk}</span>
        <p>alamat:</p> <span className="text-green-500"> {data?.alamat}</span>
        <p>nomorTelp:</p> <span className="text-green-500"> {data?.nomor_telp}</span>
        <p>Tempat lahir:</p> <span className="text-green-500"> {data?.tempat_lahir}</span>
        <p>darah:</p> <span className="text-green-500"> {data?.darah}</span>
        <p>pekerjaan:</p> <span className="text-green-500"> {data?.pekerjaan}</span>
        <p>agama:</p> <span className="text-green-500"> {data?.agama}</span>
        <p>Jenis Kelamin:</p> <span className="text-green-500"> {data?.jenis_kelamin}</span>
        <p>status:</p> <span className="text-green-500"> {data?.status_diri}</span>
        <p>status Penduduk:</p> <span className="text-green-500"> {data?.status_tinggal}</span>
        <p>kepala Keluarga:</p> <span className="text-green-500"> {data?.kepala_keluarga == 1 ? "Iya": "Tidak"}</span>
      </div>
    </Modal>
  );
}
