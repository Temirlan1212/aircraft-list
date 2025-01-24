"use client";
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EditAircraftForm } from "./edit-aircraft-form";
import { AircraftId } from "@/entities/aicraft";

export const EditAircraftModal = ({ id }: { id: AircraftId }) => {
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
        <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
          Edit Aircraft
        </Button>
      </div>

      <Modal
        title="Edit Aircraft"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <EditAircraftForm id={id} onSuccess={handleCancel} />
      </Modal>
    </>
  );
};
