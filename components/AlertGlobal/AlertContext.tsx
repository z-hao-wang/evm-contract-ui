import React, { createContext } from "react";

import { Alert } from './AlertProvider';

const AlertContext = createContext<{ alert: Alert | null, setAlert: (alert: Alert | null) => any}>({
  alert: null,
  setAlert: (alert: Alert | null) => {},
});

export default AlertContext;
