import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import React from "react";

export default function AlertError({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <Alert severity="error" variant="standard" className="alert">
      <AlertTitle>{title}</AlertTitle>
      {children}
    </Alert>
  );
}
