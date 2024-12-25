"use client";
import Auth from "@/components/Auth";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export default Auth(Layout as any);
// export default Layout;
