"use client";
import React, { useEffect } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Select, Tag } from "antd";
import {
  Status,
  statusApi,
  StatusId,
  PatchStatus,
  AddStatus,
} from "@/entities/status";
import { colors } from "../lib";

const onFinishFailed: FormProps<PatchStatus>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};

export const EditStatusForm = ({
  onSuccess,
  id,
}: {
  onSuccess?: () => void;
  id: StatusId;
}) => {
  const [form] = Form.useForm();
  const {
    data: status,
    isLoading,
    isSuccess,
  } = statusApi.useGetStatusByIdQuery(id);
  const [editStatus, editStatusMeta] = statusApi.usePatchStatusMutation();

  const onFinish: FormProps<Status>["onFinish"] = (values) => {
    const statusId = id;

    editStatus({
      ...values,
      id: statusId,
    });

    onSuccess && onSuccess();
  };

  useEffect(() => {
    if (isSuccess) form.setFieldsValue(status);
  }, [status, form, isSuccess]);

  if (isLoading) return <>loading...</>;

  return (
    <Form<Status>
      form={form}
      name="edit-status"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 24 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
          loading={editStatusMeta.isLoading}
          type="primary"
          htmlType="submit"
          size="large"
        >
          Edit status
        </Button>
      </Form.Item>
    </Form>
  );
};
