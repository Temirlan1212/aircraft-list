"use client";
import React from "react";
import { AddStatusForm } from "./add-status-form";
import { ControlledModal } from "@/shared/ui/controlled-modal";

export const AddStatusModal: React.FC = () => {
  return (
    <ControlledModal
      title="Add Status"
      defaultTriggerProps={{ children: "Add Status" }}
      render={({ close }) => <AddStatusForm onSuccess={close} />}
    />
  );
};
