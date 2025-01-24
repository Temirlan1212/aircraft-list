"use client";

import React from "react";
import { Card, Table, TableColumnProps } from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
  AircraftStatusHistory,
  aircraftStatusHistoryApi,
} from "@/entities/aicraft-status-history";
import { dateUtils } from "@/shared/utils/date";
import { useGetSlugs } from "@/shared/hooks/use-get-slugs";

function Column<RecordType extends AnyObject>(
  props: TableColumnProps<RecordType> & {
    key: keyof AircraftStatusHistory | "action";
    dataIndex?: keyof AircraftStatusHistory | "action";
  }
) {
  return <Table.Column {...props} />;
}

interface DataType extends AircraftStatusHistory {}

export function AircraftStatusHistoryTable() {
  const { aircraftId } = useGetSlugs();
  const { data: aircraftsStatusHistory, isLoading } =
    aircraftStatusHistoryApi.useGetAircraftsStatusHistoryQuery(
      `?aicraftId=${aircraftId}&_sort=-createdAt`
    );

  // const isEmpty = aircraftsStatusHistory && aircraftsStatusHistory.length == 0;

  if (isLoading) return <>loading...</>;

  return (
    <Card title="Aircraft Status History" bodyStyle={{ padding: 12 }}>
      <Table<DataType>
        dataSource={aircraftsStatusHistory || []}
        pagination={false}
        style={{ overflowX: "auto" }}
      >
        <Column title="New status" dataIndex="newStatus" key="newStatus" />
        <Column title="Comment" dataIndex="comment" key="comment" />
        <Column
          title="Created date"
          dataIndex="createdAt"
          key="createdAt"
          render={(v) => dateUtils.ISO.formatForUI(v)}
        />
      </Table>
    </Card>
  );
}
