"use client";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

export default function CustomScrollbar({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SimpleBar
      style={{
        maxHeight: "100vh",
      }}
      className="custom-scrollbar"
    >
      {children}
    </SimpleBar>
  );
}
