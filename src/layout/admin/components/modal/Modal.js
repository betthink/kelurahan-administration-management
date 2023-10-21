import { useState } from "react";
const [isModalOpen, setIsModalOpen] = useState(false);
export const handleOk = ({ func }) => {
  func;
  handleVerikifikasiPembayaran();
  setIsModalOpen(false);
};
export const handleCancel = () => {
  setIsModalOpen(false);
};
