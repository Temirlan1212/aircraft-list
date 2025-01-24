import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select } from "antd";
import { AddAircraft, aircraftApi } from "@/entities/aicraft";

const onFinishFailed: FormProps<AddAircraft>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

export const AddAircraftForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [addAircraft, addAircraftMeta] = aircraftApi.useAddAircraftMutation();

  const onFinish: FormProps<AddAircraft>["onFinish"] = (values) => {
    addAircraft(values);
    onSuccess && onSuccess();
  };

  return (
    <Form<AddAircraft>
      name="add-aircraft"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      initialValues={{ status: "Active" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* Registration Number */}
      <Form.Item<AddAircraft>
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
      <Form.Item<AddAircraft>
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
      <Form.Item<AddAircraft>
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
      <Form.Item<AddAircraft>
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please select the status!" }]}
      >
        <Select size="large">
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
          <Select.Option value="Maintenance">Maintenance</Select.Option>
        </Select>
      </Form.Item>

      <br />

      <Form.Item label={null}>
        <Button
          className="w-full"
          loading={addAircraftMeta.isLoading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Add new aircraft
        </Button>
      </Form.Item>
    </Form>
  );
};
