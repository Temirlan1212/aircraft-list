"use client";
import { PropsWithChildren } from "react";
import { ConfigProvider } from "antd";
import { themeConfig } from "@/shared/config/theme-config";

export const AntdConfigProvider = ({ children }: PropsWithChildren) => {
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
