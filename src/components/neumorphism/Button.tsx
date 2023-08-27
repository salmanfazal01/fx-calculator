import React from "react";
import { styled } from "@mui/system";
import { Button, ButtonProps } from "@mui/material";

interface NeumorphicButtonProps {
  children: React.ReactNode;
}

const NeumorphicStyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  color: "#000",
  background: "linear-gradient(145deg, #f0f0f0, #e5e5e5)",
  boxShadow: "1px 6px 12px #bebebe,-6px -6px 12px #ffffff",

  "&:hover": {
    background: "linear-gradient(145deg, #f0f0f0, #e5e5e5)",
    boxShadow: "6px 6px 12px #d0d0d0,-6px -6px 12px #f0f0f0",
  },
}));

const NButton: React.FC<ButtonProps & NeumorphicButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <NeumorphicStyledButton fullWidth variant="contained" {...props}>
      {children}
    </NeumorphicStyledButton>
  );
};

export default NButton;
