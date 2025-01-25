"use client";

import React from "react";
import { Button, Space, Table, TableColumnProps, Tag } from "antd";
import { Status, statusApi } from "@/entities/status";
import { AnyObject } from "antd/es/_util/type";
import { EditStatusModal } from "./edit-status-modal";

function Column<RecordType extends AnyObject>(
  props: TableColumnProps<RecordType> & {
    key: keyof Status | "action";
    dataIndex?: keyof Status | "action";
  }
) {
  return <Table.Column {...props} />;
}

interface DataType extends Status {}

export function StatusesTable() {
  const { data: aircrafts, isLoading } = statusApi.useGetStatusesQuery();
  const [deleteStatus, deleteStatusProps] = statusApi.useDeleteStatusMutation();

  if (isLoading) return <>loading...</>;

  return (
    <Table<DataType>
      dataSource={aircrafts}
      pagination={false}
      bordered
      style={{ overflowX: "auto" }}
    >
      <Column title="Value" dataIndex="value" key="value" />
      <Column title="Label" dataIndex="label" key="label" />
      <Column
        title="Color"
        dataIndex="color"
        key="color"
        render={(v) => {
          return <Tag color={v}>{v}</Tag>;
        }}
      />

      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            {/* <Button
              loading={
                deleteStatusProps.originalArgs === record.id &&
                deleteStatusProps.isLoading
              }
              onClick={() => {
                deleteStatus(record.id);
              }}
            >
              delete
            </Button> */}

            <EditStatusModal id={record.id} />
          </Space>
        )}
      />
    </Table>
  );
}
