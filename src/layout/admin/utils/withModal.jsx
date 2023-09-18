import { useState } from "react";

export const [isModalOpen, setIsModalOpen] = useState(false);
export const handleCancel = () => {
  setIsModalOpen(false);
};
