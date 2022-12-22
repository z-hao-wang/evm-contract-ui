import React, {useState} from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import {createFormField, FormRowConfig, SubmitConfig, TitleConfig} from "../../utils/GenericformHelper";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import useAlert from "../AlertGlobal/useAlert";

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
  const { account, library } = useWeb3React();
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
    if (formConfig.stateMutability === 'view') {
      try {
        const res = await func().call();
        console.log(`call res`, res);
        (formConfig as any).result = res;
      } catch(e) {
        console.error(e);
        setAlert({type: 'error', title: 'Call failed', text: `${(e as any).toString()}`})
      }
    } else {
      console.log(`calling write method`, formConfig);
      console.log(`formValues`, formValues)
      const params =getFormValues({methodName, abi, formValues});
      console.log(`write call params`, params)
      try {
        const estimateGas = await func(...params).estimateGas({ from: account });
        console.log(`estimateGas result`, estimateGas);
        await func(...params).send({from: account});
      } catch(e) {
        console.log(`estimateGas failure`, e);
        setAlert({type: 'error', title: 'Call failed', text: `${(e as any).toString()}`})
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