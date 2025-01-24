import React, { useState } from "react";
import { Button, Modal } from "antd";
import { AddAircraftForm } from "./add-aircraft-form";

export const AddAircraftModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add new Aircraft
      </Button>
      <Modal
        title="Add Aircraft"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <AddAircraftForm onSuccess={handleCancel} />
      </Modal>
    </>
  );
};
