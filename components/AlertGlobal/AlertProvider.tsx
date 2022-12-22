import React, { useState } from "react";
import TransitionAlert from "../TransitionAlert";
import AlertSuccess from "../AlertSuccess";
import AlertError from "../AlertError";
import AlertContext from "./AlertContext";
import Box from "@mui/material/Box";
import styles from "./alertBar.module.css";

const ALERT_STAY_MS = 15000;
export interface Alert {
  title?: string;
  text: string;
  type: "success" | "error";
}

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
      {alert && (
        <Box className={styles.alertBar}>
          <TransitionAlert
            stayMs={ALERT_STAY_MS}
            onClose={() => setAlert(null)}
          >
            {alert.type === "success" ? (
              <AlertSuccess title={alert.title}>{alert.text}</AlertSuccess>
            ) : (
              <AlertError title={alert.title}>{alert.text}</AlertError>
            )}
          </TransitionAlert>
        </Box>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
