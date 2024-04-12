import { Modal } from 'antd';
import React from 'react'

function modalConfirm(isShowModal, handleCancel, dataEntry) {
  //   const handleCancel = () => {
  //     setIsModalOpen(false);
  //   };
  return (
    <Modal
      title="Apakah Data Sudah Benar?"
      open={isShowModal}
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
          Simpan
        </Button>,
      ]}
      onCancel={handleCancel}
    >
      <p>nama: {dataEntry?.nama}</p>
      <p>nik: {dataEntry?.nik}</p>
      <p>noKK: {dataEntry?.no_kk}</p>
      <p>alamat: {dataEntry?.alamat}</p>
      <p>nomorTelp: {dataEntry?.nomor_telp}</p>
      <p>tempat_lahir: {dataEntry?.tempat_lahir}</p>
      <p>kepala Keluarga: {dataEntry?.kepala_keluarga}</p>
      <p>darah: {dataEntry?.darah}</p>
      <p>pekerjaan: {dataEntry?.pekerjaan}</p>
      <p>agama: {dataEntry?.agama}</p>
      {/* <p>tangga lLahir: {dataEntry?.tanggal_lahir}</p> */}
      <p>jenis Kelamin: {dataEntry?.jenis_kelamin}</p>
      <p>status: {dataEntry?.status_diri}</p>
      <p>status Penduduk: {dataEntry?.status_tinggal}</p>
    </Modal>
  );
}
