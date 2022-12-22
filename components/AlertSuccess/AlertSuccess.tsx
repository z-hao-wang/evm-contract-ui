import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import React from "react";

export default function AlertSuccess({
  icon,
  title,
  children,
}: {
  icon?: any;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <Alert severity="success" icon={icon}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </Alert>
  );
}
