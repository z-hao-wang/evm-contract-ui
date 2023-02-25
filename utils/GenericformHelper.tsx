import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import SelectValidator from "../components/SelectValidator";
import { TextValidator } from "react-material-ui-form-validator";

export interface FormGroup {
  type: "FormGroup";
  columns: TextInputConfig[];
}

export interface TextInputConfig {
  type: "TextInput";
  name: string; // required for TextInput
  label: string;
  xs?: number;
  md?: number;
  lg?: number;
  rows?: number;
  multiline?: boolean;
  validators?: string[];
  errorMessages?: string[];
  autoComplete?: string;
  helperText?: string;
  inputType?: "password" | "text";
}

export interface TitleConfig {
  type: "Title";
  label: string;
}

export interface SelectConfig {
  type: "Select";
  name: string;
  label: string;
  options: { label: string; value: string }[];
  validators?: string[];
  errorMessages?: string[];
}
export interface CheckboxConfig {
  type: "Checkbox";
  name: string;
  label: string;
}
export interface SubmitConfig {
  type: "SubmitButton";
  name?: string;
  label: string;
  stateMutability: 'view' | 'pure' | 'nonpayable';
  variant?: "outlined" | "contained" | "text";
}

export type FormRowConfig =
  | TextInputConfig
  | TitleConfig
  | SubmitConfig
  | CheckboxConfig
  | SelectConfig
  | FormGroup;

export const XS_DEFAULT = 6;
export const MS_DEFAULT = 6;

export function createFormField(
  formConf: FormRowConfig,
  formValues: Record<string, any>,
  setFormValues: (value: any) => any
) {
  const setFormValue = (key: string, value: string) => {
    setFormValues({
      ...formValues,
      [key]: value,
    });
  };
  const { type } = formConf;
  switch (type) {
    case "FormGroup": {
      const { columns } = formConf;
      const row = columns.map((column) => {
        const {
          name,
          validators,
          errorMessages,
          xs = XS_DEFAULT,
          md = MS_DEFAULT,
          lg,
          ...otherProps
        } = column;
        return (
          <TextValidator
            fullWidth
            {...otherProps}
            name={name}
            label={column.label}
            value={formValues[name]}
            onChange={(e: any) => setFormValue(name, e.target.value)}
            validators={validators}
            errorMessages={errorMessages}
          />
        );
      });
      return row;
    }
    case "TextInput": {
      const {
        name,
        validators,
        errorMessages,
        inputType,
        xs = XS_DEFAULT,
        md = MS_DEFAULT,
        lg,
        ...otherProps
      } = formConf;
      return (
        <TextValidator
          fullWidth
          {...otherProps}
          name={name}
          type={inputType}
          label={formConf.label}
          value={formValues[name]}
          onChange={(e: any) => setFormValue(name, e.target.value)}
          validators={validators}
          errorMessages={errorMessages}
        />
      );
    }
    case 'Checkbox': {
      const { name, label } = formConf;
      const checkbox =  <Checkbox inputProps={{'aria-label': label}} name={name} checked={!!formValues[name]} onChange={(e:any) => setFormValue(name, !formValues[name] as any)}  />;
      return <FormControlLabel control={checkbox} label={name} />;
    }
    case "Select": {
      const { name, label, options, validators, errorMessages } = formConf;
      return (
        <SelectValidator
          value={formValues[name]}
          name={name}
          label={label}
          options={options}
          validators={validators}
          errorMessages={errorMessages}
          onChange={(e:any) => setFormValue(name, e.target.value)}
        />
      );
    }
    case "Title":
      return (
        <Typography variant="h6" component="h2">
          {formConf.label}
        </Typography>
      );
    case "SubmitButton":
      const { variant, name } = formConf as SubmitConfig;
      const btn = <Button name={name} type="submit" variant={variant}>
        {formConf.label}
      </Button>
      return (
        <Box>
          {name && formValues[name] ? <pre>{formValues[name]}</pre> : btn}
        </Box>
      );
  }
}
