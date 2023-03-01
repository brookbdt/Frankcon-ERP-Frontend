import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Popper from "@mui/material/Popper";
import React, { useState } from "react";

const Dropdown = ({
  children,
  selectedItemText,
  dropDownBorderRadius,
  dropDownBackgroundColor,
  dropDownHeight,
  dropDownFontSize,
  dropDownColor,
  dropDownWidth,
  buttonTitle,
  buttonTitleColor,
  buttonTitleFontSize,
  buttonTitleFontWeight,
  placeholder = "",
}) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = (evt) => {
    // const id = evt.target.id;
    setOpen((prevOpen) => !prevOpen);
    // setOpen({
    //   ...open,
    //   [evt.target.id]: ![evt.target.id],
    // });
    //     console.log("the button is", id);
    //     setOpen((prev) => {
    //       return { [id]: !prev[id] };
    //     });
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  return (
    <>
      <Button
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select merge strategy"
        // id="priority"
        aria-haspopup="menu"
        onClick={handleToggle}
        disableElevation
        // justifyContent="left"
        variant="contained"
        ref={anchorRef}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
          borderRadius: dropDownBorderRadius,
          backgroundColor: dropDownBackgroundColor,
          padding: 0,
          margin: 0,
          height: dropDownHeight,
          fontSize: dropDownFontSize,
          color: dropDownColor,
          width: dropDownWidth,
        }}
        // onClick={handleClick}
      >
        <Box
          display="flex"
          width="100%"
          paddingX="12px"
          paddingY="6px"
          padding
          //   direction="row"
          //   justifyContent="space-between"
          alignItems="center"
          justifyContent="space-between"
          //   gap="10px"
        >
          <Stack alignItems="flex-start">
            <Typography
              sx={{
                color: buttonTitleColor,
                fontSize: buttonTitleFontSize,
                fontWeight: buttonTitleFontWeight,
                margin: 0,
                padding: 0,
              }}
            >
              {buttonTitle}
            </Typography>

            {selectedItemText ?? placeholder}
          </Stack>

          <ArrowDropDownIcon
            sx={{ width: "20px", height: "20px", padding: 0, margin: 0 }}
          />
        </Box>
      </Button>
      <Popper
        // id="priority"
        sx={{
          zIndex: 2,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal

        // id="department"
        // sx={{
        //   zIndex: 1,
        // }}
        // open={open.department}
        // anchorEl={departmentRef.current}
        // role={undefined}
        // transition
        // disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {children}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Dropdown;
