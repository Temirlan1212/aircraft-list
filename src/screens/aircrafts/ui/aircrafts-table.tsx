"use client";

import React from "react";
import { Button, Space, Table, TableColumnProps, Tag } from "antd";
import { Aircraft, aircraftApi } from "@/entities/aicraft";
import { AnyObject } from "antd/es/_util/type";
import { EditAircraftModal } from "./edit-aircraft-modal";
import { EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { paths } from "@/shared/constants/routes";
import { statusApi } from "@/entities/status";

function Column<RecordType extends AnyObject>(
  props: TableColumnProps<RecordType> & {
    key: keyof Aircraft | "action";
    dataIndex?: keyof Aircraft | "action";
  }
) {
  return <Table.Column {...props} />;
}

interface DataType extends Aircraft {}

const RenderStatusColumn = ({ value }: { value: string }) => {
  const getStatusQuery = statusApi.useGetStatusQuery(value);
  if (getStatusQuery.isLoading) return <>loading...</>;
  if (getStatusQuery.data == null) return value;

  return (
    <Tag color={getStatusQuery.data.color}>{getStatusQuery.data.label}</Tag>
  );
};

export function AircraftsTable() {
  const { data: aircrafts, isLoading } = aircraftApi.useGetAircraftsQuery();
  const [deleteAircraft, deleteAircraftProps] =
    aircraftApi.useDeleteAircraftMutation();

  if (isLoading) return <>loading...</>;

  return (
    <Table<DataType>
      dataSource={aircrafts}
      pagination={false}
      bordered
      style={{ overflowX: "auto" }}
    >
      <Column title="Model" dataIndex="model" key="model" />
      <Column title="Year" dataIndex="year" key="year" />
      <Column
        title="Registration Number"
        dataIndex="registrationNumber"
        key="registrationNumber"
      />
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        render={(v) => <RenderStatusColumn value={v} />}
      />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: DataType) => (
          <Space size="middle">
            <Button
              loading={
                deleteAircraftProps.originalArgs === record.id &&
                deleteAircraftProps.isLoading
              }
              onClick={() => {
                deleteAircraft(record.id);
              }}
            >
              delete
            </Button>

            <EditAircraftModal id={record.id} />

            <Link href={paths.aircraft({ aircraftId: record.id })}>
              <Button icon={<EyeOutlined />}>detail page</Button>
            </Link>
          </Space>
        )}
      />
    </Table>
  );
}
