"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function ConditionalNav() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/dashboard")) {
    return null;
  }
  return <Navigation />;
}


