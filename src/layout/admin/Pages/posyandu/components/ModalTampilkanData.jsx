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
      <div>
        <p>{data?.nama}</p>
        <p>{data?.nik}</p>
        <p>{data?.no_kk}</p>
        <p>{data?.tanggal_lahir}</p>
        <p>{data?.tempat_lahir}</p>
        <p>{data?.agama}</p>
        <p>{data?.pekerjaan}</p>
        <p>{data?.rt}</p>
        <p>{data?.rw}</p>
        <p>{data?.jenis_kelamin}</p>
        <p>{data?.nomor_telp}</p>
        <p>{data?.alamat}</p>
        <p>{data?.darah}</p>
        <p>{data?.nomor_telp}</p>
        <p>{data?.status_tinggal}</p>
        <p>{data?.status_diri}</p>
      </div>
    </Modal>
  );
}
