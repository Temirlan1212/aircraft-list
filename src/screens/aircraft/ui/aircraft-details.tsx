import React from "react";
import { Card, Descriptions, Tag } from "antd";
import type { Aircraft } from "@/entities/aicraft";
import { Status } from "@/entities/status";

export const AircraftDetails = ({
  aircraft,
}: {
  aircraft: Aircraft & Partial<Status>;
}) => {
  if (aircraft == null) return null;
  return (
    <Card title="Aircraft Details" bordered bodyStyle={{ padding: 12 }}>
      <Descriptions
        column={1}
        bordered
        style={{
          overflowX: "auto",
        }}
      >
        {/* Registration Number */}
        <Descriptions.Item label="Registration Number">
          {aircraft.registrationNumber}
        </Descriptions.Item>

        {/* Model */}
        <Descriptions.Item label="Model">{aircraft.model}</Descriptions.Item>

        {/* Year */}
        <Descriptions.Item label="Year">{aircraft.year}</Descriptions.Item>

        {/* Status */}
        <Descriptions.Item label="Status">
          <Tag color={aircraft.color}>{aircraft?.label || aircraft.status}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
