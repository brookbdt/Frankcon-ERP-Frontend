import { Button, Typography } from "@mui/material";
import React, { useState } from "react";

const ChangingButton = ({ values, color, selectedValue, onChange }) => {
  const buttonValues = [...values, values[0]];
  return (
    <>
      <Button
        onClick={() => {
          onChange(
            buttonValues[buttonValues.findIndex((v) => v === selectedValue) + 1]
          );
        }}
        sx={{ backgroundColor: color, borderRadius: "20px", color: "#F6F6F6" }}
      >
        {selectedValue}
      </Button>
    </>
  );
};

export default ChangingButton;
