"use client";
import React from "react";
import { EditStatusForm } from "./edit-status-form";
import { StatusId } from "@/entities/status";
import { ControlledModal } from "@/shared/ui/controlled-modal";

export const EditStatusModal = ({ id }: { id: StatusId }) => {
  return (
    <ControlledModal
      title="Edit Status"
      defaultTriggerProps={{ children: "Edit Status" }}
      render={({ close }) => <EditStatusForm id={id} onSuccess={close} />}
    />
  );
};
