"use client";
import React, { PropsWithChildren } from "react";
import { Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/shared/constants/routes";

const { Header, Content } = Layout;

const items = Object.entries(routes).map(([_, { label, path }]) => ({
  key: path,
  label: label,
}));

export const MainLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const router = useRouter();

  return (
    <Layout style={{ height: "100dvh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          selectedKeys={[pathname || ""]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onClick={(item) => router.push(item.key)}
        />
      </Header>
      <Content style={{ padding: "20px 25px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            height: "calc(100dvh - 100px)",
            overflow: "scroll",
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};
