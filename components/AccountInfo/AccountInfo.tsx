import Box from "@mui/material/Box";
import React from "react";
import {useWeb3React} from "@web3-react/core";

const AccountInfo = () =>{
  const { chainId, account } = useWeb3React();
  return <><Box>chainId: {chainId}</Box>
  <Box>account: {account}</Box></>
}
export default AccountInfo