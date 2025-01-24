"use client";
import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { aircraftApi, AircraftId, PatchAircraft } from "@/entities/aicraft";
import { statusApi } from "@/entities/status";

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
  const [form] = Form.useForm();
  const {
    data: aircraft,
    isLoading,
    isSuccess,
  } = aircraftApi.useGetAircraftQuery(id);
  const [editAircraft, editAircraftMeta] =
    aircraftApi.usePatchAircraftMutation();
  const getStatusesQuery = statusApi.useGetStatusesQuery();

  const onFinish: FormProps<PatchAircraft>["onFinish"] = (values) => {
    editAircraft({ ...values, id });
    form.resetFields();
    onSuccess && onSuccess();
  };

  useEffect(() => {
    if (isSuccess) form.setFieldsValue(aircraft);
  }, [aircraft, form, isSuccess]);

  if (isLoading) return <>loading...</>;

  return (
    <Form<PatchAircraft>
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
        rules={[{ required: true, message: "Please select the status!" }]}
      >
        <Select size="large">
          {getStatusesQuery.data?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <br />

      <Form.Item label={null}>
        <Button
          className="w-full"
          loading={editAircraftMeta.isLoading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Edit new aircraft
        </Button>
      </Form.Item>
    </Form>
  );
};
