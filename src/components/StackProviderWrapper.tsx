"use client";

import { type ReactNode } from "react";
import { StackProvider } from "@/context/StackContext";

export default function StackProviderWrapper({ children }: { children: ReactNode }) {
 return <StackProvider>{children}</StackProvider>;
}
