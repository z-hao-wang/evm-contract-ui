import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import AlertProvider from "../components/AlertGlobal/AlertProvider";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import {utils} from "ethers";

export default function DecodeTx() {
  const [rawTx, setRawTx] = useState('');
  const [res, setRes] = useState('');
  const decodeTx = () => {
    try {
      const decoded = utils.parseTransaction(rawTx);
      console.log("decoded", decoded);
      setRes(JSON.stringify(decoded, null, 4));
    } catch(e) {
      setRes(e && (e as any).toString());
    }
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
              label="Raw Transaction"
              value={rawTx}
              onChange={(e: any) => setRawTx(e.target.value)}
              validators={ ["required"]}
              errorMessages={["This field is required"]}
              multiline
              rows={10}
            />
          </Box>
          <Box sx={{maxWidth:'90vw'}}>
            <h5>result:</h5>
            <pre>{res}</pre>
          </Box>
          <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Button disabled={!rawTx} onClick={decodeTx} variant="contained">Decode raw transaction</Button>
          </Box>
        </ValidatorForm>
      </main>
    </AlertProvider>
  )
}