"use client";
import NextTopLoader from "nextjs-toploader";
import { useIsMounted } from "@/shared/hooks/use-is-mounted";

export default function Page() {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return <NextTopLoader color={"red"} />;
}
