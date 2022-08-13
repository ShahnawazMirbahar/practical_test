import React from "react";
import { Box } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";

function Footer() {
  return (
    <Box
      bgcolor="#111517"
      pb={2}
      display="flex"
      flexWrap="wrap"
      sx={{ width: "100vw" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flex={3}
        flexWrap="wrap"
      >
        <Box flex={1}>
          <Box display="flex" pt={3} pl={2} color="white">
            <h5>Created For Practical Test</h5>
          </Box>
        </Box>
        <Box flex={1} pb={2} pt={5}>
          <Box display="flex" flexWrap="wrap" pb={2} alignItems="center">
            <Box color="white">©2022</Box>
            <Box color="#FFC20B" fontWeight={600}>
              Task Manager{" "}
            </Box>
            <Box color="white"> - All Rights Reserved</Box>
          </Box>
        </Box>
        <Box>
          <Box display="flex" pt={3} pl={2} pr={2} color="white">
            <Box pt={2} pl={2}>
              <SpaIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
