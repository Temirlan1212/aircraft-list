"use client";
import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const AntdRegistryProvider = ({ children }: PropsWithChildren) => {
  return <AntdRegistry>{children}</AntdRegistry>;
};
