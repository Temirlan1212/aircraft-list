import React, { useState } from "react";
import { Button, Modal } from "antd";
import { AddAircraftForm } from "./add-aircraft-form";
import { PlusOutlined } from "@ant-design/icons";

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
      <div>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
          Add new Aircraft
        </Button>
      </div>

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
