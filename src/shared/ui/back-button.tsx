import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, ButtonProps } from "antd";
import { useRouter } from "next/navigation";

export const BackButton = (props: ButtonProps) => {
  const router = useRouter();
  const back = () => router.back();
  return (
    <Button
      icon={<ArrowLeftOutlined />}
      style={{ width: "fit-content" }}
      {...props}
      onClick={(e) => {
        back();
        props?.onClick && props.onClick(e);
      }}
    >
      {props?.children ? props.children : "Back"}
    </Button>
  );
};
