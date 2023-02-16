import { Avatar, Box, Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  getEmployeeId,
  readEmployee,
  readEmployeeByDepartment,
} from "../../lib";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
import DataTable from "../DataTable";

const EmployeesTable = ({ jwt }) => {
  dayjs.extend(relativeTime);
  let today = new Date();

  let thisMonth = today.toLocaleString("default", { month: "long" });
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 300,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Box display="flex" sx={{ paddingY: "20px" }}>
            <Avatar
              src={cellValues.row.employeeImage}
              width="44px"
              height="44px"
            />
            <Box width="12px" />

            <Stack justifyContent="center">
              <Box display="flex">
                <Typography fontWeight="500" color="#101010" fontSize="14px">
                  {cellValues.row.employeeName}
                </Typography>
              </Box>
              <Typography fontSize="12px" color="#CFCFD5">
                {cellValues.row.position}
              </Typography>
            </Stack>
          </Box>
        );
      },
    },
    {
      field: "department",
      headerName: "Department",
      width: 250,
      renderCell: (cellValues) => {
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500" color="#101010" fontSize="14px">
              {cellValues.row.department}
            </Typography>
            <Typography fontSize="12px" color="#CFCFD5">
              Joined on{" "}
              {dayjs(cellValues.row.employmentDate).format("DD.MM.YYYY")}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "contact",
      headerName: "Contact",
      width: 200,
      renderCell: (cellValues) => {
        console.log({ cellValues });
        return (
          <Stack justifyContent="center">
            <Typography fontWeight="500" color="#101010" fontSize="14px">
              {cellValues.row.contact}
            </Typography>
            <Typography fontSize="12px" color="#CFCFD5">
              {cellValues.row.email}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "activity",
      headerName: "Activity",
      width: 400,
      renderCell: (cellValues) => {
        // console.log({ cellValues });
        return (
          <Button component="a" href={`/employees/${cellValues.row.id}`}>
            VIEW
          </Button>
        );
      },
    },
  ];

  const taskTableStyles = {
    height: "950px",
    border: 0,
    width: "100%",
  };

  const [activity, setActivity] = useState("ONLINE");

  const [checked, setChecked] = React.useState(false);

  const [value, setValue] = React.useState(dayjs(new Date()));
  const [selected, setSelected] = useState([]);

  const [firstName, setFirstname] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [employmentDate, setEmploymentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [employeeGrossSalary, setEmployeeGrossSalary] = useState("");
  const [employeeNetSalary, setEmployeeNetSalary] = useState("");
  const [employeeImage, setEmployeeImage] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [previewImage, setPreviewImage] = useState();
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await readEmployee(jwt);
      const financeDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Finance"
      );
      const architectureDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Architecture"
      );
      const humanResourceDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Human Resource"
      );
      const InventoryDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Inventory"
      );
      const engineeringDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Engineering"
      );
      const purchaserDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Purchaser"
      );
      const workshopDepartment = await readEmployeeByDepartment(
        jwt,
        user,
        "Workshop"
      );

      setResponse(result.data);
      console.log(response);

      const lastEmployee = await getEmployeeId(jwt);
      const lastEmployeeId = lastEmployee?.data?.data?.[0]?.id || 1;
      setEmployeeId(`EM - ${new Date().getFullYear()} - ${lastEmployeeId + 1}`);
      console.log({ lastEmployee });
    };
    fetchData();
  }, [user]);

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var currDate = new Date();
  var currMonth = currDate.getMonth();
  var monthName = months[currMonth];
  return (
    <>
      {/* <pre>{JSON.stringify({ response }, null, 2)}</pre> */}

      <>
        <DataTable
          rows={
            response?.data?.map((e) => {
              return {
                id: e?.id,
                employeeName:
                  e?.attributes?.firstName + " " + e?.attributes?.lastName,
                //   date: dayjs(e?.attributes?.date).format("DD MMM YYYY"),
                priority: e.attributes?.priority,
                employeeImage: `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${e?.attributes?.employeeImage?.data?.attributes?.url}`,
                employmentDate: e.attributes?.employmentDate,
                contact: e.attributes?.phone,
                email: e.attributes?.email,
                position:
                  e.attributes?.department +
                  " " +
                  "-" +
                  " " +
                  e.attributes?.position,
                department: e?.attributes?.department,
              };
            }) ?? []
          }
          columns={columns}
          // className={classes.root}
          loading={!response?.data?.length}
          sx={taskTableStyles}
          checkboxSelection
        />
      </>
    </>
  );
};

export default EmployeesTable;
