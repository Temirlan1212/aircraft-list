"use client";

import { AddStatusModal } from "./add-status-modal";
import { StatusesTable } from "./statuses-table";

export function StatusPage() {
  return (
    <>
      <AddStatusModal />
      <StatusesTable />
    </>
  );
}
