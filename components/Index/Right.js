import { Add, Mail, Notifications, Pets } from "@mui/icons-material";
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
	List,
	ListItem,
	ListItemText,
	Menu,
	MenuItem,
	styled,
	Toolbar,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { borderRadius } from "@mui/system";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";

const Right = () => {
	const Search = styled("div")(({ theme }) => ({
		position: "relative",
		display: "flex",
		borderRadius: theme.shape.borderRadius,
		background: "white",
		// backgroundColor: alpha(theme.palette.common.white, 0.15),
		// "&:hover": {
		// 	backgroundColor: alpha(theme.palette.common.white, 0.25),
		// },
		marginLeft: 0,
		width: "100%",
		// [theme.breakpoints.up("sm")]: {
		// 	marginLeft: theme.spacing(1),
		// 	width: "auto",
		// },
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
			// [theme.breakpoints.up("sm")]: {
			// 	width: "12ch",
			// 	"&:focus": {
			// 		width: "20ch",
			// 	},
			// },
		},
	}));

	const ExpandMore = styled((props) => {
		const { expand, ...other } = props;
		return <IconButton {...other} />;
	})(({ theme, expand }) => ({
		transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	}));
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<Box paddingTop="27px" width="100%" paddingRight="104px">
			<Search>
				<StyledInputBase
					placeholder="Search your question"
					inputProps={{ "aria-label": "search" }}
				/>
				<SearchIconWrapper>
					<SearchIcon />
				</SearchIconWrapper>
			</Search>
			<Typography paddingTop="26px" fontSize="32px" fontWeight="700">
				Frequently Asked Questions
			</Typography>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					background="red"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
			<Box
				borderTop="1px solid gray"
				borderBottom="1px solid gray"
				justifyContent="space-between"
			>
				<Card
					width="100%"
					variant="plain"
					display="flex"
					alignItems="center"
					style={{ backgroundColor: "#F6F6F6" }}
				>
					<CardHeader
						action={
							<Box>
								<ExpandMore
									expand={expanded}
									onClick={handleExpandClick}
									aria-expanded={expanded}
									aria-label="show more"
								>
									<Add />
								</ExpandMore>
							</Box>
						}
						title="Where can I watch?"
					/>
					<CardActions disableSpacing></CardActions>
					<Collapse in={expanded} timeout="auto" unmountOnExit>
						<CardContent>
							<Typography paragraph>
								Nibh quisque suscipit fermentum netus nulla cras porttitor
								euismod nulla. Orci, dictumst nec aliquet id ullamcorper
								venenatis.{" "}
							</Typography>
						</CardContent>
					</Collapse>
				</Card>
			</Box>
		</Box>
	);
};

export default Right;
