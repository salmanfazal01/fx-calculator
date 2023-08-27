import React from "react";
import { Box } from "@mui/material";

const NPaper = ({ children }) => {
  return (
    <Box
      sx={{
        p: 2,
        maxHeight: 800,
        height: "100%",
        width: "100%",
        maxWidth: 444,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: "20px",
          boxShadow: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default NPaper;
