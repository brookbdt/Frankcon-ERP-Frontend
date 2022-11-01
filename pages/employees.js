import { Box } from "@mui/system";
import React from "react";
import Layout from "../components/Layout";
import Employees from "../components/Employees";

const EmployeesPage = () => {
	return <Layout>
		<Box paddingLeft="48px">
		<Employees/>
		</Box>
	</Layout>;
};

export default EmployeesPage;
