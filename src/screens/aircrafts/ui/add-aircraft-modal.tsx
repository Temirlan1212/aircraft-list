"use client";
import React from "react";
import { AddAircraftForm } from "./add-aircraft-form";
import { ControlledModal } from "@/shared/ui/controlled-modal";

export const AddAircraftModal: React.FC = () => {
  return (
    <ControlledModal
      title="Add Aircraft"
      defaultTriggerProps={{ children: "Add Aircraft" }}
      render={({ close }) => <AddAircraftForm onSuccess={close} />}
    />
  );
};
