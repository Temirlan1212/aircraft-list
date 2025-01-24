"use client";
import { Button, ButtonProps, Modal, ModalProps } from "antd";
import React, { useState } from "react";

type Controls = { close: () => void; open: () => void };

export interface ControlledModalProps extends ModalProps {
  defaultOpen?: boolean;
  trigger?: React.ReactNode;
  defaultTriggerProps?: ButtonProps;
  render?: (v: Controls) => React.ReactNode;
}

export const ControlledModal = ({
  defaultOpen = false,
  trigger,
  defaultTriggerProps,
  children,
  render,
  ...props
}: ControlledModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultOpen);

  const controls = {
    open: () => setIsModalOpen(true),
    close: () => setIsModalOpen(false),
  };

  const handleOk = () => controls.close();
  const handleCancel = () => controls.close();

  const renderTrigger = () => {
    if (trigger) return trigger;
    return (
      <div>
        <Button type="primary" onClick={controls.open} {...defaultTriggerProps}>
          {defaultTriggerProps?.children || "open"}
        </Button>
      </div>
    );
  };

  return (
    <>
      {renderTrigger()}

      <Modal
        title="Edit Aircraft"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        {...props}
      >
        {render ? render(controls) : children}
      </Modal>
    </>
  );
};
