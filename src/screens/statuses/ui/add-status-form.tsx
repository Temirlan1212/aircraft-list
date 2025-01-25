import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Tag } from "antd";
import { AddStatus, statusApi } from "@/entities/status";
import { colors } from "../lib";

const onFinishFailed: FormProps<AddStatus>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const AddStatusForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [form] = Form.useForm();
  const [addStatus, addStatusMeta] = statusApi.useAddStatusMutation();

  const onFinish: FormProps<AddStatus>["onFinish"] = (values) => {
    addStatus(values);
    form.resetFields();
    onSuccess && onSuccess();
  };

  return (
    <Form<AddStatus>
      form={form}
      name="add-aircraft"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<AddStatus>
        label="Value"
        name="value"
        rules={[{ required: true, message: "Please input the value!" }]}
      >
        <Input size="large" />
      </Form.Item>
      <br />
      <Form.Item<AddStatus>
        label="Label"
        name="label"
        rules={[{ required: true, message: "Please input the label!" }]}
      >
        <Input size="large" />
      </Form.Item>
      <br />
      <Form.Item<AddStatus>
        label="Color"
        name="color"
        rules={[{ required: true, message: "Please select the color!" }]}
      >
        <Select size="large">
          {colors.map((item) => {
            return (
              <Select.Option key={item.color} value={item.color}>
                <Tag color={item.color}>{item.labelColor}</Tag>
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <br />

      <Form.Item label={null}>
        <Button
          className="w-full"
          loading={addStatusMeta.isLoading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Add new status
        </Button>
      </Form.Item>
    </Form>
  );
};
