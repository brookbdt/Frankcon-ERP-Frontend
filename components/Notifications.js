import { Backdrop, Box, Fade, Modal, Stack, Typography } from "@mui/material";
import React from "react";

const Notifications = () => {
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const style = {
    position: "absolute",
    top: "60%",
    left: "31%",
    transform: "translate(-50%, -50%)",
    width: "440px",
    height: "604px",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    borderRadius: "4px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack direction="row" justifyContent="space-between">
            <Typography>Notifications</Typography>
            <Typography>Mark all as read</Typography>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Notifications;
