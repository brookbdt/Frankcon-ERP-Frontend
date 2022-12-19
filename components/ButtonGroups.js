import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";

const ButtonGroups = ({
  //   firstButton,
  //   secondButton,
  //   thirdButton,
  //   fourthButton,
  //   fifthButton,
  clickedButtonColor,
  unClickedButtonColor,
  buttons,
  selectedIndex,
  onClick,
}) => {
  const [clicked, setClicked] = useState({
    firstButton: true,
    secondButton: false,
    thirdButton: false,
    fourthButton: false,
    fifthButton: false,
  });
  const anchorRef = React.useRef(null);
  //   const [selectedIndex, setSelectedIndex] = useState();

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
          {/* {index} === {selectedIndex} ?{" "} */}
          {/* {(index === selectedIndex).toString()}{" "} */}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroups;
