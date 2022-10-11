import { Mail, Notifications, Pets } from "@mui/icons-material";
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Button,
	ButtonGroup,
	Divider,
	Icon,
	InputBase,
	Menu,
	MenuItem,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { borderRadius } from "@mui/system";
import React, { useState } from "react";

const Navbar = () => {
	const StyledToolbar = styled(Toolbar)({
		display: "flex",
		justifyContent: "space-between",
		background: " #F6F6F6",
		color: "black",
		boxShadow: "none",
		border: "0px",
	});

	const Search = styled("div")(({ theme }) => ({
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		// backgroundColor: alpha(theme.palette.common.white, 0.15),
		// "&:hover": {
		// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
		// },
		marginLeft: 0,
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			marginLeft: theme.spacing(1),
			width: "auto",
		},
	}));

	const SearchIconWrapper = styled("div")(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}));

	const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: "inherit",
		"& .MuiInputBase-input": {
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)})`,
			transition: theme.transitions.create("width"),
			width: "100%",
			[theme.breakpoints.up("sm")]: {
				width: "12ch",
				"&:focus": {
					width: "20ch",
				},
			},
		},
	}));
	return (
		<Box width="100%">
			<AppBar position="sticky" elevation="0">
				<StyledToolbar>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<ButtonGroup
						variant="plain"
						aria-label="outlined primary button group"
					>
						<Button font>Order Request</Button>
						<Button>Leave Request</Button>
						<Button>Status</Button>
						<Button>Help</Button>
					</ButtonGroup>
				</StyledToolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
