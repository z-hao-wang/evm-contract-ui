import React, {useState} from "react";
import {CheckboxConfig, FormRowConfig, SubmitConfig, TextInputConfig, TitleConfig} from "../../utils/GenericformHelper";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@mui/material/Button";
import useAlert from "../AlertGlobal/useAlert";

function createInput(formName: string, input: {internalType: string, name: string, type: string}): FormRowConfig {
  const {internalType, name: inputName, type} = input
  switch(type) {
    case 'uint256':
    case 'address':
    case 'string':
    case 'bytes':
      return {type: "TextInput", name: `${formName}-${inputName}`,label:inputName, inputType:'text', helperText: `${internalType} - ${type}`  } as TextInputConfig
    case 'address[]':
    case 'bytes[]':
      return {type: "TextInput", name: `${formName}-${inputName}`,label:inputName, inputType:'text', helperText: `${internalType} - ${type} comma separated`  } as TextInputConfig
    case 'bool':
      return {type: "Checkbox", name: `${formName}-${inputName}`,label:inputName } as CheckboxConfig

    default:
      return {type: 'Title', label: `unsupported input ${formName}-${inputName} type ${internalType}`} as FormRowConfig;
  }
}
const SetABIForm =({setFormConfigs, setAbi, setAddress}: {setFormConfigs: (formConfigs:FormRowConfig[]) => any, setAbi: (abi:any[]) => any, setAddress: (address: string) => any}) => {
  const [contractAddress, setContractAddress] = useState('');
  const [contractABI, setContractABI] = useState('');
  const { setAlert } = useAlert();
  const submitABIJSON = (e: any) => {
    let abi;
    try {
      console.log(`submitting`)
      abi = JSON.parse(contractABI);
      if (!abi || !abi.length)  {
        return setAlert({ type: "error", text: `Invalid ABI, make sure it is JSON array` })
      }
    } catch(e) {
      console.log(`contractABI err`, e);
      return setAlert({ type: "error", text: `Invalid ABI, make sure it is JSON array` })
    }

    console.log(`abi`, abi);
    const formConfigsTmp:FormRowConfig[] = [];
    setAbi(abi);
    setAddress(contractAddress);
    for (let item of abi) {
      if (item.type !== 'function') continue;
      const {inputs, name, stateMutability} = item;
      formConfigsTmp.push({
        type: 'Title',
        label: name
      } as TitleConfig);
      inputs && inputs.forEach((input: {internalType: string, name: string, type: string}) => {
        formConfigsTmp.push(createInput(name, input))
      })
      if (stateMutability === 'view') {
        formConfigsTmp.push({
          type: 'SubmitButton',
          label: 'Read',
          stateMutability,
          name,
        } as SubmitConfig);
      } else {
        formConfigsTmp.push({
          type: 'SubmitButton',
          label: 'Write',
          stateMutability,
          name,
        } as SubmitConfig);
      }
    }
    console.log(`formConfigs`, formConfigsTmp);
    setFormConfigs(formConfigsTmp)
  }
  return <ValidatorForm onSubmit={submitABIJSON}>
    <Box sx={{width: 1000}}>
      <TextValidator
        fullWidth
        name="contractAddress"
        label="Contract Address"
        value={contractAddress}
        onChange={(e: any) => setContractAddress(e.target.value)}
        validators={ ["required", "matchRegexp:^0x[0-9a-fA-F]{40}$"]}
        errorMessages={["This field is required", "Invalid contract address"]}
      />
    </Box>
    <br />
    <Box>
      <TextValidator
        fullWidth
        name="contractAbi"
        label="Contract ABI"
        value={contractABI}
        onChange={(e: any) => setContractABI(e.target.value)}
        validators={ ["required"]}
        errorMessages={["This field is required"]}
        multiline
        rows={10}
      />
    </Box>
    <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Button type="submit" disabled={!contractABI} variant="contained">Update ABI</Button>
    </Box>
  </ValidatorForm>
}

export default SetABIForm;