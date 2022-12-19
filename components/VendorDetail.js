import CloseIcon from "@mui/icons-material/Close";
import { Box, Paper, Stack } from "@mui/material";
import React from "react";

const VendorDetail = () => {
  return (
    <Paper
      sx={{ m: 1, zIndex: 1, borderColor: "#4339F2", borderRadius: "10px" }}
      elevation={4}
      variant="outlined"
    >
      <Box
        sx={{
          width: "566px",
          height: "680px",
          paddingX: "22px",
          paddingTop: "16px",
          //   bgcolor: "white",
          borderRadius: "10px",
        }}
      >
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="700" fontSize="20px">
              Vendor Detail
            </Typography>
            <Button onClick={handleSlide}>
              <Box
                bgcolor="#F6F6F6"
                width="24px"
                height="24px"
                borderRadius="50%"
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <CloseIcon
                  sx={{
                    color: "#9FA0AB",
                    width: "15px",
                    height: "15px",
                  }}
                />
              </Box>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default VendorDetail;
