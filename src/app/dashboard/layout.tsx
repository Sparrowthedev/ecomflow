"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import { useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isBottomNavbarVisible, setBottomNavbarVisible] = useState(false);

  function toggleNavOpen() {
    setBottomNavbarVisible(!isBottomNavbarVisible);
  }

  function toggleNavClose() {
    setBottomNavbarVisible(!isBottomNavbarVisible);
  }

  return (
    <html lang="en">
      <body className="bg-[#0b0b0b]">
        <Dashboard isBottomNavbarVisible={isBottomNavbarVisible} toggleNavOpen={toggleNavOpen} toggleNavClose={toggleNavClose}>{children}</Dashboard>
      </body>
    </html>
  );
}
