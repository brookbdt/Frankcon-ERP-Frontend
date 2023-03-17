import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardComponent from "../components/Dashboard/DashboardComponent";
import Layout from "../components/Layout";
import {
  readEmployeeInprogressTask,
  readInventory,
  readNotification,
  readProject,
} from "../lib";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import Login from "./login";

export default function Home() {
  const [response, setResponse] = useState([]);
  const [taskResponse, setTaskResponse] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [depletingItems, setDepletingItems] = useState([]);

  const [jwt, setJwt] = useState(null);
  const [purchaseRequestResponse, setPurchaseRequestResponse] = useState();
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  // const [taskResponse, taskResponse] = useState([]);

  useEffect(async () => {
    const jwt = getTokenFromLocalCookie();

    setJwt(jwt);

    const fetchData = async () => {
      const taskRequestResponse = await readEmployeeInprogressTask(jwt, user);
      setTaskResponse(taskRequestResponse.data);

      const activeProjectsResponse = await readProject(jwt, user);
      setActiveProjects(activeProjectsResponse.data?.data);

      const depletingItemsResponse = await readInventory(jwt);
      setDepletingItems(depletingItemsResponse.data?.data);
    };
    fetchData();

    const purchaseRequestResponse = await fetcher(
      // `https://frankconerp.herokuapp.com/api/purchaseRequests`,
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/purchaseRequests`,
      jwt
        ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
        : ""
    );

    // const taskResponse = await

    if (purchaseRequestResponse.data) {
      setPurchaseRequestResponse(purchaseRequestResponse.data);
    }

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    readEmployeeInprogressTask(jwt, user).then((r) => {
      // console.log("task in progress is", r.data);
      // setTaskResponse(r?.data?);
    });

    console.log("index response is", { response });
  }, []);
  // const { user, userDepartment, loading } = useFetchUser();

  console.log("the user is", user);
  console.log("the user department is", userDepartment);

  const depletingItemsAmount = depletingItems?.filter(
    (res) =>
      (Number(res.attributes?.originalItemQuantity) *
        Number(res.attributes?.itemAmount)) /
      100 >
      Number(res.attributes?.itemQuantity)
  );
  const outOfStockItemsAmount = depletingItems?.filter(
    (res) => Number(res.attributes?.itemQuantity) <= 0
  );

  const activeProjectsAmount = activeProjects?.filter(
    (res) => res.attributes?.projectStatus === "Ongoing"
  );

  const pendingMaterialRequest = response?.filter(
    (res) =>
      res.attributes?.materialtransferrequest &&
      res.attributes?.materialtransferrequest?.data?.attributes &&
      res.attributes?.materialtransferrequest?.data?.attributes?.isApproved ===
      "pending"
  );
  const pendingLeaveRequest = response?.filter(
    (res) =>
      res.attributes?.leaverequest &&
      res.attributes?.leaverequest?.data?.attributes &&
      res.attributes?.leaverequest?.data?.attributes?.isApproved === "pending"
  );
  const pendingPurchaseRequest = response?.filter(
    (res) =>
      res.attributes?.purchaseRequest &&
      res.attributes?.purchaseRequest?.data?.attributes &&
      res.attributes?.purchaseRequest?.data?.attributes?.isApproved ===
      "pending"
  );
  const activePurchaseRequest = response?.filter(
    (res) =>
      res.attributes?.purchaseRequest &&
      res.attributes?.purchaseRequest?.data?.attributes &&
      res.attributes?.purchaseRequest?.data?.attributes?.isApproved ===
      "approved"
  );
  const pendingPaymentRequest = response?.filter(
    (res) =>
      res.attributes?.paymentRequest &&
      res.attributes?.paymentRequest?.data?.attributes &&
      res.attributes?.paymentRequest?.data?.attributes?.isApproved === "pending"
  );
  console.log({ activeProjectsAmount });

  if (jwt === null) {
    return <h1>Loading</h1>;
  } else {
    return (
      <Layout
        jwt={jwt}
        purchaseRequestResponse={purchaseRequestResponse}
        user={user}
        userDepartment={userDepartment}
      >
        <Head>
          <title>Frankcon ERP Design System</title>
          <meta name="description" content="Frankcon ERP" />
        </Head>

        {!loading && !user ? (
          <>
            <Login />
          </>
        ) : (
          <Stack direction="row">
            {/* <SideBar />  */}
            <Stack direction="column" width="80%" height="100%">
              {/* <Navbar /> */}
              <Box height="24px" />
              <Stack
                paddingLeft="48px"
                // paddingRight="60px"
                width="100%"
                height="100%"
              >
                <Stack direction="row" gap="4px">
                  <Typography fontSize="32px" fontWeight="700" color="#0F112E">
                    Good Morning{" "}
                  </Typography>
                  <Typography fontSize="32px" fontWeight="700" color="#4339F2">
                    {" "}
                    {user},
                  </Typography>
                </Stack>
                <Typography fontSize="16px" fontWeight="400" color="#6F7082">
                  Please manage your inventory and upcoming tasks and projects.
                </Typography>
                <Box height="32px" />
                <Stack direction="row" gap="12px">
                  {userDepartment === "admin" ||
                    userDepartment === "Finance" ||
                    userDepartment === "Architect" ||
                    userDepartment === "Human Resource" ||
                    userDepartment === "Engineering" ||
                    userDepartment === "Purchaser" ||
                    userDepartment === "Workshop" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",
                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        <CardContent sx={{ px: "24px" }}>
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            {pendingMaterialRequest.length +
                              pendingPaymentRequest.length +
                              pendingPurchaseRequest.length +
                              pendingLeaveRequest.length}
                          </Typography>
                          {/* </Box> */}
                          {/* <Box height="12px" /> */}
                          <Typography fontWeight="500px" fontSize="20px">
                            Pending Approvals
                          </Typography>
                          {/* <Box height="8px" /> */}

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is for pending approval on purchase
                            orders, leave requests, and more.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : userDepartment === "Inventory" ? (
                    <Card
                      sx={{
                        width: "427px",

                        height: "170px",
                        p: 0,
                        borderRadius: "10px",
                      }}
                    >
                      <CardContent>
                        {/* <Box> */}
                        <Typography
                          fontWeight="700px"
                          fontSize="48px"
                          color="#F35B05"
                        // sx={{ p: 0 }}
                        >
                          {pendingPurchaseRequest.length}
                        </Typography>
                        {/* </Box> */}
                        {/* <Box height="12px" /> */}
                        <Typography fontWeight="500px" fontSize="20px">
                          Purchase Orders
                        </Typography>
                        {/* <Box height="8px" /> */}

                        <Typography
                          // sx={{ p: 0 }}
                          fontWeight="400px"
                          fontSize="12px"
                          lineHeight="14px"
                        >
                          This number is for pending approval on purchase
                          orders.
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    ""
                  )}
                  {userDepartment === "admin" ||
                    userDepartment === "Finance" ||
                    userDepartment === "Purchaser" ? (
                    <Card
                      sx={{
                        width: "427px",

                        height: "170px",
                        p: 0,
                        borderRadius: "10px",
                      }}
                    >
                      <CardContent>
                        {/* <Box> */}
                        <Typography
                          fontWeight="700px"
                          fontSize="48px"
                          color="#F35B05"
                        // sx={{ p: 0 }}
                        >
                          {pendingPaymentRequest.length}
                        </Typography>
                        {/* </Box> */}
                        {/* <Box height="12px" /> */}
                        <Typography fontWeight="500px" fontSize="20px">
                          Pending Payments
                        </Typography>
                        {/* <Box height="8px" /> */}

                        <Typography
                          // sx={{ p: 0 }}
                          fontWeight="400px"
                          fontSize="12px"
                          lineHeight="14px"
                        >
                          This number is for pending payments.
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : userDepartment === "Architect" ||
                    userDepartment === "Engineering" ||
                    userDepartment === "Workshop" ? (
                    <Card
                      sx={{
                        width: "427px",

                        height: "170px",
                        p: 0,
                        borderRadius: "10px",
                      }}
                    >
                      {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}

                      <CardContent sx={{ px: "24px" }}>
                        {/* <Box> */}
                        <Typography
                          fontWeight="700px"
                          fontSize="48px"
                          color="#F35B05"
                        // sx={{ p: 0 }}
                        >
                          {/* {taskResponse.length} */}
                        </Typography>

                        <Typography fontWeight="500px" fontSize="20px">
                          <pre>{JSON.stringify({ tr: taskResponse }, null, 2)}</pre>
                          Ongoing Tasks
                        </Typography>

                        <Typography
                          // sx={{ p: 0 }}
                          fontWeight="400px"
                          fontSize="12px"
                          lineHeight="14px"
                        >
                          This number is for upcoming tasks.
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : userDepartment === "Inventory" ? (
                    <Card
                      sx={{
                        width: "427px",

                        height: "170px",
                        p: 0,
                        borderRadius: "10px",
                      }}
                    >
                      {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}

                      <CardContent sx={{ px: "24px" }}>
                        {/* <Box> */}
                        <Typography
                          fontWeight="700px"
                          fontSize="48px"
                          color="#F35B05"
                        // sx={{ p: 0 }}
                        >
                          {depletingItemsAmount.length}
                        </Typography>
                        {/* </Box> */}
                        {/* <Box height="12px" /> */}
                        <Typography fontWeight="500px" fontSize="20px">
                          {/* <pre>{JSON.stringify({ taskResponse }, null, 2)}</pre> */}
                          Depleting Items
                        </Typography>
                        {/* <Box height="8px" /> */}

                        <Typography
                          // sx={{ p: 0 }}
                          fontWeight="400px"
                          fontSize="12px"
                          lineHeight="14px"
                        >
                          This number is for depeleting items.
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    ""
                  )}
                  {userDepartment === "admin" ||
                    userDepartment === "Finance" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",

                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}

                        <CardContent sx={{ px: "24px" }}>
                          {/* <Box> */}
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            243k+
                          </Typography>
                          {/* </Box> */}
                          {/* <Box height="12px" /> */}
                          <Typography fontWeight="500px" fontSize="20px">
                            {/* <pre>{JSON.stringify({ taskResponse }, null, 2)}</pre> */}
                            Account Balance
                          </Typography>
                          {/* <Box height="8px" /> */}

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is the balance in your account.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : userDepartment === "Architect" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",

                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}
                        <pre>{JSON.stringify({ activeProjects }, null, 2)}</pre>
                        <CardContent sx={{ px: "24px" }}>
                          {/* <Box> */}
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            {activeProjectsAmount.length}
                          </Typography>

                          <Typography fontWeight="500px" fontSize="20px">
                            {/* <pre>{JSON.stringify({ taskResponse }, null, 2)}</pre> */}
                            Active Projects
                          </Typography>
                          {/* <Box height="8px" /> */}

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is for depeleting items.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : userDepartment === "Inventory" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",

                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}

                        <CardContent sx={{ px: "24px" }}>
                          {/* <Box> */}
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            {outOfStockItemsAmount.length}
                          </Typography>

                          <Typography fontWeight="500px" fontSize="20px">
                            {/* <pre>{JSON.stringify({ taskResponse }, null, 2)}</pre> */}
                            Out-of-stock Items
                          </Typography>
                          {/* <Box height="8px" /> */}

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is for out-of-stock items.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : userDepartment === "Engineering" ||
                    userDepartment === "Workshop" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",

                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        <CardContent sx={{ px: "24px" }}>
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            {activePurchaseRequest.length}
                          </Typography>

                          <Typography fontWeight="500px" fontSize="20px">
                            Purchase Orders
                          </Typography>

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is for purchase Orders.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : userDepartment === "Purchaser" ? (
                    <>
                      <Card
                        sx={{
                          width: "427px",

                          height: "170px",
                          p: 0,
                          borderRadius: "10px",
                        }}
                      >
                        {/* <pre>
                        {JSON.stringify({ task }, null, 2)}
                      </pre> */}

                        <CardContent sx={{ px: "24px" }}>
                          {/* <Box> */}
                          <Typography
                            fontWeight="700px"
                            fontSize="48px"
                            color="#F35B05"
                          // sx={{ p: 0 }}
                          >
                            123k
                          </Typography>

                          <Typography fontWeight="500px" fontSize="20px">
                            {/* <pre>{JSON.stringify({ taskResponse }, null, 2)}</pre> */}
                            Monthly Expenses
                          </Typography>
                          {/* <Box height="8px" /> */}

                          <Typography
                            // sx={{ p: 0 }}
                            fontWeight="400px"
                            fontSize="12px"
                            lineHeight="14px"
                          >
                            This number is for total monthly expenses.
                          </Typography>
                        </CardContent>
                      </Card>
                    </>
                  ) : (
                    ""
                  )}
                </Stack>
                <Box height="46px" />
                <DashboardComponent jwt={jwt} />
              </Stack>
            </Stack>
          </Stack>
        )}
      </Layout>
    );
  }
}

// }
