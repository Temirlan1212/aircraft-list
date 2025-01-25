"use client";
import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Tag } from "antd";
import {
  Aircraft,
  aircraftApi,
  AircraftId,
  PatchAircraft,
} from "@/entities/aicraft";
import { statusApi } from "@/entities/status";
import {
  AddAircraftStatusHistory,
  aircraftStatusHistoryApi,
} from "@/entities/aicraft-status-history";

const onFinishFailed: FormProps<PatchAircraft>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

export const EditAircraftForm = ({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: AircraftId;
}) => {
  const [statusValue, setStatusValue] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  const {
    data: aircraft,
    isLoading,
    isSuccess,
  } = aircraftApi.useGetAircraftQuery(id);
  const [editAircraft, editAircraftMeta] =
    aircraftApi.usePatchAircraftMutation();
  const [addAircraftStatusHistory, addAircraftStatusHistoryMeta] =
    aircraftStatusHistoryApi.useAddAircraftStatusHistoryMutation();

  const getStatusesQuery = statusApi.useGetStatusesQuery();

  const isStatusValueChanged = statusValue != undefined;

  const onFinish: FormProps<Aircraft & AddAircraftStatusHistory>["onFinish"] = (
    values
  ) => {
    const aicraftId = id;

    editAircraft({
      model: values.model,
      id: aicraftId,
      registrationNumber: values.registrationNumber,
      year: values.year,
      status: values.status,
    });
    addAircraftStatusHistory({
      aicraftId: aicraftId,
      comment: values.comment,
      newStatus: values.status,
    });

    form.setFieldValue("comment", undefined);

    onSuccess && onSuccess();
  };

  useEffect(() => {
    if (isSuccess) form.setFieldsValue(aircraft);
  }, [aircraft, form, isSuccess]);

  if (isLoading) return <>loading...</>;

  return (
    <Form<Aircraft & AddAircraftStatusHistory>
      form={form}
      name="edit-aircraft"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* Registration Number */}
      <Form.Item<PatchAircraft>
        label="Registration Number"
        name="registrationNumber"
        rules={[
          { required: true, message: "Please input the registration number!" },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <br />
      {/* Model */}
      <Form.Item<PatchAircraft>
        label="Model"
        name="model"
        rules={[
          { required: true, message: "Please input the aircraft model!" },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <br />
      {/* Year */}
      <Form.Item<PatchAircraft>
        label="Year"
        name="year"
        rules={[
          { required: true, message: "Please input the manufacturing year!" },
          {
            type: "number",
            min: 1900,
            max: new Date().getFullYear(),
            transform: (value) => +value,
            message: "Enter a valid year!",
          },
        ]}
      >
        <Input type="number" size="large" />
      </Form.Item>
      <br />
      {/* Status */}
      <Form.Item<PatchAircraft>
        label="Status"
        name="status"
        getValueProps={(v) => {
          if (aircraft?.status !== v) setStatusValue(v);
          else setStatusValue(undefined);

          return { value: v };
        }}
        rules={[{ required: true, message: "Please select the status!" }]}
      >
        <Select size="large">
          {getStatusesQuery.data?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.value}>
                <Tag color={item.color}> {item.label}</Tag>
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {isStatusValueChanged && (
        <Form.Item<PatchAircraft & AddAircraftStatusHistory>
          label="Status Comment"
          name="comment"
          rules={[{ required: true, message: "Please leave the comment!" }]}
        >
          <Input size="large" />
        </Form.Item>
      )}

      <br />

      <Form.Item label={null}>
        <Button
          className="w-full"
          loading={editAircraftMeta.isLoading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Edit aircraft
        </Button>
      </Form.Item>
    </Form>
  );
};
