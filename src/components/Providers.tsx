"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/i18n/context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
