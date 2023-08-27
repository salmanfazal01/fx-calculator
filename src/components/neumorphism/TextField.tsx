import React from "react";
import { styled } from "@mui/system";
import { TextField, TextFieldProps, Stack, Typography } from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: "12px",
  color: "#000",
  background: "#e0e0e0",
  boxShadow: "inset 5px 5px 10px #cacaca,inset -5px -5px 10px #f6f6f6",
  "& fieldset": { border: "none" },
}));

const NTextField: React.FC<TextFieldProps & { label: string | number }> = ({
  label,
  ...props
}) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      <StyledTextField size="small" fullWidth {...props} label={null} />
    </Stack>
  );
};

export default NTextField;
