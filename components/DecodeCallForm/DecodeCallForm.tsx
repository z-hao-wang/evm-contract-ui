import React, {useState} from "react";
import Box from "@mui/material/Box";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@mui/material/Button";

export function decodeInput(abi: any[], input: string) {
  const abiDecoder = require('abi-decoder');
  abiDecoder.addABI(abi);
  return abiDecoder.decodeMethod(input);
}

const DecodeCallForm =({abi}: {abi: any[]}) => {
  const [callData, setCallData] = useState('');
  const [decoded, setDecoded] = useState('');
  const decode  = () => {
    console.log(`decodeInput(abi, callData)`, decodeInput(abi, callData))
    setDecoded(decodeInput(abi, callData));
  }

  if (!abi || abi.length === 0) return null;

  return (
    <ValidatorForm onSubmit={decode}>
      <h2>Decode Contract Call Data</h2>
      <Box>
        <TextValidator
          fullWidth
          name="decodeCallData"
          label="Decode Call Data"
          value={callData}
          onChange={(e: any) => setCallData(e.target.value)}
          validators={ ["required"]}
          errorMessages={["This field is required"]}
          multiline
          rows={3}
        />
      </Box>
      <Box>
        <pre>{decoded && JSON.stringify(decoded, null , 4)}</pre>
      </Box>
      <Box sx={{padding: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button type="submit" disabled={!callData} variant="contained">Decode Call Data</Button>
      </Box>
    </ValidatorForm>
  )
}

export default DecodeCallForm;