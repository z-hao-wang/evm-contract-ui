import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Typography from "@mui/material/Typography";
import Connect from '../components/Connect/Connect'
import SetABIForm from '../components/SetABIForm/SetABIForm'
import ContractCallForm from '../components/ContractCallForm/ContractCallForm'
import React, { useState } from "react";
import {FormRowConfig} from "../utils/GenericformHelper";
import Web3Provider from "../components/Web3Provider/Web3Provider";
import AccountInfo from "../components/AccountInfo/AccountInfo";
import AlertProvider from "../components/AlertGlobal/AlertProvider";

export default function Home() {
  const [contractAddress, setContractAddress] = useState('');
  const [formConfigs, setFormConfigs] = useState([] as FormRowConfig[]);
  const [abi, setAbi] = useState([] as any[]);
  return (
    <AlertProvider>
      <Head>
        <title>Call any contract with ABI</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Typography variant="h4" component="h2">
          Call any Solidity EVM contract with ABI
        </Typography>
        <Typography variant="body1" component="h2">
          Supports all EVM compatible chains
        </Typography>
        <Web3Provider>
          <Connect>
            <AccountInfo />
            <SetABIForm setAbi={setAbi} setAddress={setContractAddress} setFormConfigs={setFormConfigs} />
            <ContractCallForm abi={abi} contractAddress={contractAddress} formConfigs={formConfigs} setFormConfigs={setFormConfigs} />
          </Connect>
        </Web3Provider>
      </main>
    </AlertProvider>
  )
}
