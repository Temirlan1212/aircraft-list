"use client";
import React from "react";
import { EditAircraftForm } from "./edit-aircraft-form";
import { AircraftId } from "@/entities/aicraft";
import { ControlledModal } from "@/shared/ui/controlled-modal";

export const EditAircraftModal = ({ id }: { id: AircraftId }) => {
  return (
    <ControlledModal
      title="Edit Aircraft"
      defaultTriggerProps={{ children: "Edit Aircraft" }}
      render={({ close }) => <EditAircraftForm id={id} onSuccess={close} />}
    />
  );
};
