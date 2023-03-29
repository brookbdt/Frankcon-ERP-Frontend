import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box, InputBase, styled, Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
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
