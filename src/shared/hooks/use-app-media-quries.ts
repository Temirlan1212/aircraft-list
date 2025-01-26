"use client";
import { useMediaQuery } from "react-responsive";

export const useAppMediaQueries = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });

  return { isMobile, isDesktop: !isMobile };
};
