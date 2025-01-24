"use client";

import React from "react";
import { Button, Space, Table, TableColumnProps } from "antd";
import { Aircraft, aircraftApi } from "@/entities/aicraft";
import { AnyObject } from "antd/es/_util/type";

function Column<RecordType extends AnyObject>(
  props: TableColumnProps<RecordType> & {
    key: keyof Aircraft | "action";
    dataIndex?: keyof Aircraft | "action";
  }
) {
  return <Table.Column {...props} />;
}

interface DataType extends Aircraft {}

export function AircraftsTable() {
  const { data: aircrafts, isLoading } = aircraftApi.useGetAircraftsQuery();
  const [deleteAircraft, deleteAircraftProps] =
    aircraftApi.useDeleteAircraftMutation();

  if (isLoading) return <>loading...</>;

  return (
    <Table<DataType> dataSource={aircrafts} pagination={false}>
      <Column title="Model" dataIndex="model" key="model" />
      <Column title="Year" dataIndex="year" key="year" />
      <Column
        title="Registration Number"
        dataIndex="registrationNumber"
        key="registrationNumber"
      />
      <Column title="Status" dataIndex="status" key="status" />
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
          </Space>
        )}
      />
    </Table>
  );
}
