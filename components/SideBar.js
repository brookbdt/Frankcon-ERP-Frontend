import {
	AccountBox,
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
} from "@mui/material";
import Image from "next/image";
import Login from "../pages/login";
import React from "react";

const SideBar = () => {
	const SideBox = styled(Box)(({ theme }) => ({
		// display: "column",
		alignItems: "center",
		// gap: "10px",
		// [theme.breakpoints.up("sm")]: {
		// 	display: "none",
		// },
	}));

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

	const handleClick = () => {};

	return (
		<ThemeProvider theme={theme}>
			<SideBox
				bgcolor="#0F112E"
				color="white"
				width="240px"
				// flex={1}
				p={2}
				sx={{ display: { xs: "none", sm: "block" } }}
			>
				<Stack
					direction="column"
					alignItems="center"
					spacing={2}
					justifyContent="space-between"
				></Stack>
				<Image src="/static/Logo.png" alt="logo" width={40} height={41.38} />
				<List>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#home">
							<ListItemIcon>
								<Home />
							</ListItemIcon>
							<ListItemText
								primaryTypographyProps={{ fontSize: "14px" }}
								primary="Home"
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<Article />
							</ListItemIcon>

							<ListItemText
								primaryTypographyProps={{ fontSize: "14px" }}
								primary="Notifications"
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<Group />
							</ListItemIcon>

							<ListItemText
								primaryTypographyProps={{ fontSize: "14px" }}
								primary="My Tasks"
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<Storefront />
							</ListItemIcon>

							<ListItemText
								primaryTypographyProps={{ fontSize: "14px" }}
								primary="Finance"
							/>
						</ListItemButton>
					</ListItem>
					<ListItem disablePadding>
						<ListItemButton component="a" href="#simple-list">
							<ListItemIcon>
								<Person />
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
								<Settings />
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
								<AccountBox />
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
								<AccountBox />
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
								<AccountBox />
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
								<AccountBox />
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
											Bethel Kebede
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
									action={
										<Box>
											<IconButton aria-label="settings">
												<UnfoldMore onClick={(event) => handleClick()} />
											</IconButton>
										</Box>
									}
								/>
							</Card>
						</Box>
					
			</SideBox>
		</ThemeProvider>
	);
};

export default SideBar;
