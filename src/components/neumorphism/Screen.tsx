import React from "react";
import { Box } from "@mui/material";

const NScreen = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#e0e0e0",
        borderRadius: "12px",
        boxShadow: "5px 5px 13px #cacaca,-5px -5px 13px #f6f6f6",
        p: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default NScreen;
