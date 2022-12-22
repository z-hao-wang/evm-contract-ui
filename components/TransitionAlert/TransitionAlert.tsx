import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";

export default function TransitionAlert({
  children,
  stayMs = 5000,
  onClose,
}: {
  children: React.ReactElement;
  stayMs?: number;
  onClose: () => any;
}) {
  const [alertVisibility, setAlertVisibility] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAlertVisibility(true);
    }, 200);
  }, []);

  if (!children) {
    console.error(`invalid children for TransitionAlert`);
    return null;
  }

  return (
    <Fade
      in={alertVisibility} //Write the needed condition here to make it appear
      timeout={{ enter: 1000, exit: 1000 }} //Edit these two values to change the duration of transition when the element is getting appeared and disappeard
      addEndListener={() => {
        setTimeout(() => {
          setAlertVisibility(false);
          onClose();
        }, stayMs);
      }}
    >
      <Box>{children}</Box>
    </Fade>
  );
}
