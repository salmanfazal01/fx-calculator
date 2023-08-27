import React from "react";
import {
  Select,
  SelectProps,
  styled,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "12px",
  color: "#000",
  background: "#e0e0e0",
  boxShadow: "inset 5px 5px 10px #cacaca,inset -5px -5px 10px #f6f6f6",
  "& fieldset": { border: "none" },
}));

const NSelect: React.FC<SelectProps & { label: string; items: any }> = ({
  label,
  items = [],
  ...props
}) => {
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="body2" sx={{ ml: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      <StyledSelect fullWidth size="small" {...props}>
        {items?.map((quote: string) => (
          <MenuItem key={quote} value={quote}>
            {quote}
          </MenuItem>
        ))}
      </StyledSelect>
    </Stack>
  );
};

export default NSelect;
