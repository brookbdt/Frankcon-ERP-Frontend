import {
  AccountBox,
  AddIcCallOutlined,
  Article,
  Edit,
  Group,
  Home,
  ModeNight,
  Person,
  Settings,
  Storefront,
  UnfoldMore,
} from "@mui/icons-material";
import DomainIcon from "@mui/icons-material/Domain";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
  Stack,
  styled,
  Avatar,
  Typography,
  ListItemAvatar,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  createTheme,
  ThemeProvider,
  Divider,
  Collapse,
  Fade,
  Modal,
  Backdrop,
} from "@mui/material";
import Image from "next/image";
import Login from "../pages/login";
import React, { useEffect, useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  useFetchUser,
  useFetchUserDepartment,
  useUser,
} from "../components/lib/authContext";
import Notifications from "./Notifications";
import { readPurchaseRequest } from "../pages/api";

const SideBar = ({
  children,
  firstListIcon,
  secondListIcon,
  thirdListIcon,
  fourthListIcon,
  fifthListIcon,
  sixthListIcon,
  seventhListIcon,
  eighthListIcon,
  firstListItemText,
  secondListItemText,
  thirdListItemText,
  fourthListItemText,
  fifthListItemText,
  sixthListItemText,
  seventhListItemText,
  eighthListItemText,
  firstDropDownItems,
  secondDropDownItems,
  thirdDropDownItems,
  fourthDropDownItems,
}) => {
  // const { user, userDepartment, loading } = useFetchUser();

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [components, setComponents] = useState([""]);

  function addComponent() {
    setComponents([...components, <Notifications />]);
  }

  const handleClose = () => setOpen(false);

  const SideBox = styled(Box)(({ theme }) => ({
    // display: "column",
    alignItems: "center",
    // gap: "10px",
    // [theme.breakpoints.up("sm")]: {
    // 	display: "none",
    // },
  }));

  const style = {
    position: "absolute",
    top: "70%",
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

  const Status = styled("div")(({ theme }) => ({
    display: "flex",
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "8px",
    width: "100%",
  }));

  const theme = createTheme({
    components: {
      MuiListItemText: {
        variants: [
          {
            props: {
              variant: "title",
            },
            style: {
              fontSize: 14,
              fontWeight: 400,
              color: "white",
            },
          },
        ],
      },
    },
  });

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const [response, setResponse] = useState([]);
  const [refreshToken, setRefreshToken] = useState(Math.random());
  useEffect(() => {
    const fetchData = async () => {
      const result = await readPurchaseRequest();
      setResponse(result.data);
    };
    fetchData().finally(() => {
      // Update refreshToken after 3 seconds so this event will re-trigger and update the data
      setTimeout(() => setRefreshToken(Math.random()), 3000);
    });
    console.log("the data is", response);
  }, [refreshToken]);

  return (
    <ThemeProvider theme={theme}>
      <SideBox
        bgcolor="#0F112E"
        color="white"
        width="244px"
        height="1032px"
        // flex={1}
        paddingX="24px"
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        {/* <Stack
          direction="column"
          alignItems="center"
          spacing={2}
          justifyContent="space-between"
        ></Stack> */}
        <Box height="32px" />
        <Box display="flex" justifyContent="center" alignItems="center">
          <Image src="/static/Logo.png" alt="logo" width={40} height={41.38} />
        </Box>
        <Box height="80px" />

        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#home">
              <ListItemIcon>
                <Home sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Home"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="/tasks">
              <ListItemIcon>
                <Group sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="My Tasks"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <Article sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Notifications"
              />
            </ListItemButton>
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
                    <Typography>Notifications </Typography>
                    <Typography>Mark all as read</Typography>
                  </Stack>
                  {response?.data?.map((response, index) => (
                    <Stack direction="row">
                      <>
                        <Avatar />
                        <Typography>
                          {response?.attributes?.requesterName}
                        </Typography>
                      </>
                    </Stack>
                  ))}
                </Box>
              </Fade>
            </Modal>
          </ListItem>
          <Box height="20px" />
          <Divider sx={{ width: "192px", backgroundColor: "#404158" }} />
          <Box height="20px" />
          {/* conditional rendering starts from here */}
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                {userDepartment === "admin" && (
                  <DomainIcon sx={{ color: "white" }} />
                )}
                {/* ("architecture" && <DomainIcon sx={{ color: "white" }} />)} */}
                {userDepartment === "architecture" && (
                  <DomainIcon sx={{ color: "white" }} />
                )}
                {userDepartment === "human resource" && (
                  <DomainIcon sx={{ color: "white" }} />
                )}
                {userDepartment === "finance" && (
                  <AttachMoneyIcon sx={{ color: "white" }} />
                )}
              </ListItemIcon>

              {userDepartment === "admin" && (
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Architecture"
                />
              )}
              {userDepartment == "architecture" && (
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Architecture"
                />
              )}
              {userDepartment === "human resource" && (
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Architecture"
                />
              )}
              {userDepartment === "finance" && (
                <ListItemText
                  primaryTypographyProps={{ fontSize: "14px" }}
                  primary="Finance"
                />
              )}

              {/* <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary={}
              /> */}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>{/* <StarBorder /> */}</ListItemIcon>
                  {/* <ListItemText primary="Starred" /> */}
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Person sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Projects"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <Settings sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Human Resource"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Inventory"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Workshop"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Settings"
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemIcon>
                <AccountBox sx={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primaryTypographyProps={{ fontSize: "14px" }}
                primary="Profiles"
              />
            </ListItemButton>
          </ListItem>
        </List>
        {/* username and online status */}

        <Box height="56px">
          <Card height="56px">
            <CardHeader
              sx={{ paddingLeft: "8px" }}
              avatar={
                <Avatar
                  alt="UserImage"
                  src="/static/Avatar.png"
                  sx={{ paddingLeft: "0px" }}
                />
              }
              title={
                <Typography fontWeight="400" fontSize="14px">
                  {" "}
                  {user}
                </Typography>
              }
              titleTypographyProps={{ variant: "h6", component: "span" }}
              subheader={
                <Box display="flex">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    paddingRight="8px"
                  >
                    <Image
                      src="/static/online.png"
                      alt="online badge"
                      width={8}
                      height={8}
                    />
                  </Box>
                  <Typography fontSize="12px">Online</Typography>
                </Box>
              }
              // action={
              //   <Box>
              //     <IconButton aria-label="settings">
              //       <UnfoldMore onClick={(event) => handleClick()} />
              //     </IconButton>
              //   </Box>
              // }
            />
          </Card>
        </Box>
      </SideBox>
    </ThemeProvider>
  );
};

export default SideBar;
