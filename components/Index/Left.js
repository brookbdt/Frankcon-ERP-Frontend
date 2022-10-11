import { Delete, East, Send } from "@mui/icons-material";
import {
	Button,
	createTheme,
	Divider,
	TextField,
	ThemeProvider,
	Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

import Image from "next/image";
import React, { useState } from "react";
// import { readForum, createQuestion } from "./api";
import { createQuestion } from "../../pages/api";

const theme = createTheme({
	status: {
		danger: "#e53e3e",
	},
	palette: {
		primary: {
			main: "#E1E0F6",
			darker: "#053e85",
		},
		neutral: {
			main: "#64748B",
			contrastText: "#fff",
		},
	},
});

const Left = () => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	watch,
	// 	formState: { errors },
	// } = useForm();
	const [faq, setFaq] = useState("");
	const defaultValues = {
		faq: "",
	};
	const sendData = () => {
		const newQuestion = {
			// Title: name,
			FAQ: faq,
		};
		createQuestion(newQuestion);
	};

	// const onSubmit = async (data) => {
	// 	if (grecaptcha.getResponse() === "") {
	// 		setErrMessage("Please Click on Recaptcha");
	// 	} else {
	// 		setIsSubmitting(true);
	// 		const faqs = {
	// 			faq: data.faq,
	// 		};

	// 		const add = await fetch(`https://localhost:1337/api/faq}`, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ data: faqs }),
	// 		});
	// 	}
	// };

	return (
		<>
			<Box
				paddingLeft="48px"
				paddingTop="24px"
				display="flex"
				flexDirection="column"
			>
				<Typography variant="span" fontSize="32px" fontWeight="700">
					Help Center
				</Typography>
				<Image src="/static/indexart.png" alt="" width={461} height={345} />
				<Box paddingTop="85px" display="flex" flexDirection="column">
					<Typography variant="p" fontSize="20px" fontWeight="700">
						Didn’t find your answer?
					</Typography>
					<Typography variant="p" fontSize="20px" fontWeight="700">
						Ask us anything.
					</Typography>
				</Box>
				<Stack direction="row" justifyContent="flex-start">
					<Typography variant="p">Forward Your Question.</Typography>
					<Divider />
				</Stack>
				<Box
					sx={{
						width: 500,
						maxWidth: "100%",
						paddingTop: "12px",
					}}
				>
					<TextField
						onChange={(e) => setFaq(e.target.value)}
						value={faq}
						fullWidth
						label=""
						id="fullWidth"
						multiline
					/>
					<Stack
						direction="row"
						spacing={2}
						justifyContent="space-between"
						paddingTop="11px"
						paddingBottom="54px"
					>
						<Button variant="plain">Cancel</Button>
						<ThemeProvider theme={theme}>
							<Box borderRadius="10px">
								<Button
									onClick={() => sendData()}
									variant="contained"
									endIcon={<East />}
									color="primary"
									type="submit"
								>
									<Box padding="6px">Send Question</Box>
								</Button>
							</Box>
						</ThemeProvider>
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default Left;
