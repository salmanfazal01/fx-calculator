import { Container } from "@mui/material";

const GlassContainer = ({ children }) => {
  return (
    <Container
      maxWidth={"xs"}
      sx={{
        maxHeight: 650,
        m: 1,
        height: "100%",
        width: "95%",
        backgroundColor: "rgba(92,114,128,0.3)",
        borderRadius: "16px",
        boxShadow:
          "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        // filter: "blur(2px)",
      }}
    >
      {children}
    </Container>
  );
};

export default GlassContainer;
