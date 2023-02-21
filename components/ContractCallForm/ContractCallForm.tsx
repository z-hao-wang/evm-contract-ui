import React, {useState} from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {createFormField, FormRowConfig, SubmitConfig, TitleConfig} from "../../utils/GenericformHelper";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import useAlert from "../AlertGlobal/useAlert";
export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  OPTIMISM = 10,
  OPTIMISTIC_KOVAN = 69,
  BSC = 56,
  ARBITRUM_ONE = 42161,
  ARBITRUM_RINKEBY = 421611,
  POLYGON = 137,
  POLYGON_MUMBAI = 80001,
  CELO = 42220,
  CELO_ALFAJORES = 44787,
  GNOSIS = 100,
  MOONBEAM = 1284,
}
export function getMinPriorityFeePerGas(chainId?: number): number {
  switch (chainId) {
    case ChainId.MAINNET:
      return 2e9;
    case ChainId.ARBITRUM_ONE:
      return 0;
    case ChainId.POLYGON:
      return 30e9;
    case ChainId.BSC:
      return 0;
  }
  return 1e9;
}

function getFormValues({formValues, abi, methodName}: {formValues: Record<string, string>, abi: any[], methodName: string}) {
  for (let abiItem of abi) {
    if (abiItem.name === methodName) {
      const {inputs} = abiItem;
      if (!inputs) return [];
      return inputs.map((input: any) => {
        const formValuesRaw = formValues[`${methodName}-${input.name}`];
        if (input.type.match(/\[\]$/)) {
          return formValuesRaw.split(',');
        }
        return formValuesRaw;
      })
    }
  }
  return [];
}
const ContractCallForm =({abi,contractAddress, formConfigs, setFormConfigs}: {abi: any[],contractAddress:string, setFormConfigs: (formConfigs:FormRowConfig[]) => any, formConfigs: FormRowConfig[]}) => {
  const [formValues, setFormValues] = useState({});
  const { account, library, chainId } = useWeb3React();
  const { setAlert } = useAlert();

  const submitCall = async (e: any) => {
    const methodName = e.nativeEvent.submitter.getAttribute('name');
    console.log(`submitter method`, methodName);
    // call function with this value, and display results
    const web3 = new Web3(library.provider);
    const contractInstance = new web3.eth.Contract(
      abi,
      contractAddress
    );
    const formConfigsCopy = formConfigs.splice(0);
    const formConfig: SubmitConfig | undefined = formConfigsCopy.find(f => (f as any).name  === methodName) as any;
    if (!formConfig) {
      console.error(`cannot find formConfig for ${methodName}`);
      return;
    }
    const func = contractInstance.methods[methodName];
    if (['view', 'pure'].includes(formConfig.stateMutability)) {
      try {
        const params = getFormValues({methodName, abi, formValues});
        console.log(`read call params`, params)
        const res = await func(...params).call();
        console.log(`call res`, res);
        (formConfig as any).result = res.toString();
      } catch(e) {
        console.error(e);
        setAlert({type: 'error', title: 'Call failed', text: `${(e as any).message || (e as any).toString()}`})
      }
    } else {
      console.log(`calling write method`, formConfig);
      console.log(`formValues`, formValues)
      const params = getFormValues({methodName, abi, formValues});
      console.log(`write call params`, params)
      try {
        const estimateGas = await func(...params).estimateGas({ from: account });
        const baseFeePerGas = (await web3.eth.getBlock("pending")).baseFeePerGas
        const maxPriorityFeePerGas = getMinPriorityFeePerGas(chainId);
        const maxFeePerGas = maxPriorityFeePerGas + baseFeePerGas!;
        console.log(`debug`, {chainId, baseFeePerGas, maxPriorityFeePerGas, maxFeePerGas, estimateGas})
        await func(...params).send({from: account, gas: Math.floor(estimateGas * 1.2), maxFeePerGas, maxPriorityFeePerGas});
      } catch(e) {
        console.log(`estimateGas failure`, e);
        setAlert({type: 'error', title: 'Call failed', text: `${(e as any).message || (e as any).toString()}`})
      }
    }
    setFormConfigs(formConfigsCopy);
  }

  const abiForms = formConfigs.map((formConfig, i)=> {
    return <Box key={formConfig.type + (formConfig as any).label + i} sx={{ margin: 2, paddingBottom: 2 }}>
      {createFormField(formConfig, formValues, setFormValues)}
    </Box>
  })

  return (
    <ValidatorForm onSubmit={submitCall}>
      {abiForms}
    </ValidatorForm>
  )
}

export default ContractCallForm;