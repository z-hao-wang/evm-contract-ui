import { ValidatorComponent } from "react-material-ui-form-validator";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { SelectProps } from "@mui/material/Select/Select";

interface Props extends SelectProps {
  errorMessages?: string[];
  name: string;
  onChange: any;
  validators?: string[];
  label: string;
  options: { label: string; value: string }[];
  requiredError?: any;
  validatorListener?: any;
  helperText?: string;
  value: any;
}

class SelectValidator extends (ValidatorComponent as unknown as typeof React.Component<
  Props,
  any
>) {
  renderValidatorComponent() {
    const { isValid } = this.state;
    /* eslint-disable no-unused-vars */
    const {
      errorMessages,
      name,
      label,
      onChange,
      validators,
      options,
      helperText,
      requiredError,
      error,
      validatorListener,
      value = "",
      ...rest
    } = this.props;
    const helperTextCombined =
      (!isValid && (this as any).getErrorMessage()) || helperText;
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel sx={{ color: isValid ? "inherit" : "error.main" }}>
            {label}
          </InputLabel>
          <Select
            value={value}
            name={name}
            label={label}
            onChange={onChange}
            error={!isValid || error}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperTextCombined && (
            <FormHelperText sx={{ color: isValid ? "inherit" : "error.main" }}>
              {helperTextCombined}
            </FormHelperText>
          )}
        </FormControl>
      </Box>
    );
  }

  render() {
    return super.render() as any;
  }
}

export default SelectValidator;
