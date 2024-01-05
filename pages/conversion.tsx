import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Connect from '../components/Connect/Connect'
import SetABIForm from '../components/SetABIForm/SetABIForm'
import ContractCallForm from '../components/ContractCallForm/ContractCallForm'
import DecodeCallForm from '../components/DecodeCallForm/DecodeCallForm'
import React, { useState } from "react";
import {FormRowConfig} from "../utils/GenericformHelper";
import Web3Provider from "../components/Web3Provider/Web3Provider";
import AccountInfo from "../components/AccountInfo/AccountInfo";
import AlertProvider from "../components/AlertGlobal/AlertProvider";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";import Button from "@mui/material/Button";
import BN from 'bn.js';
export default function Conversion() {
  const [val, setVal] = useState('');
  const [res, setRes] = useState('');
  const convertUintToHex = () => {
      setRes(new BN(val).toString('hex'));
  }

  const convertHexToUint = () => {
    setRes(new BN(val.replace(/^0x/, ''), 'hex').toString());
  }
  const restoreShift4 = () => {
    setRes(new BN(val.replace(/^0x/, '').substring(0, 4), 'hex').shln(parseInt(val.substring(val.length - 2), 16)).toString());
  }

  return (
    <AlertProvider>
      <Head>
        <title>Conversion tools</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography variant="h4" component="h2">
          Conversion Tools
        </Typography>
        <ValidatorForm>
          <Box>
            <TextValidator
              fullWidth
              name="val"
              label="Input value"
              value={val}
              onChange={(e: any) => setVal(e.target.value)}
              validators={ ["required"]}
              errorMessages={["This field is required"]}
            />
          </Box>
          <Box>
            <h5>result:</h5>
            {res}
          </Box>
          <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button disabled={!val} onClick={convertUintToHex} variant="contained">Uint to hex</Button>
            <Button sx={{marginLeft: 4}} disabled={!val} onClick={convertHexToUint} variant="contained">Hex to uint</Button>
            <Button sx={{marginLeft: 4}} disabled={!val} onClick={restoreShift4} variant="contained">Restore Shift4</Button>
          </Box>
        </ValidatorForm>


      </main>
    </AlertProvider>
  )
}
