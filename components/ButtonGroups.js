import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";

const ButtonGroups = ({
  clickedButtonColor,
  unClickedButtonColor,
  buttons,
  selectedIndex,
  onClick,
}) => {
  return (
    <ButtonGroup variant="plain" aria-label="outlined primary button group">
      {buttons?.map((button, index) => (
        <Button
          sx={{
            color:
              index === selectedIndex
                ? clickedButtonColor
                : unClickedButtonColor,
          }}
          onClick={() => onClick(index)}
        >
          {button}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroups;
