import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import DashboardComponent from "../components/Dashboard/DashboardComponent";
import Layout from "../components/Layout";
import { fetcher } from "../lib/api";
import { getTokenFromLocalCookie, getTokenFromServerCookie } from "../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../lib/authContext";
import { readNotification } from "./api";
import Login from "./login";

export default function Home({ jwt, purchaseRequestResponse }) {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  // const { user, userDepartment, loading } = useFetchUser();
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  console.log("the user is", user);
  console.log("the user department is", userDepartment);

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
  const pendingPaymentRequest = response?.filter(
    (res) =>
      res.attributes?.paymentRequest &&
      res.attributes?.paymentRequest?.data?.attributes &&
      res.attributes?.paymentRequest?.data?.attributes?.isApproved === "pending"
  );

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
                "Finance" ||
                "Architect" ||
                "Human Resource" ||
                "Engineering" ||
                "Purchaser" ||
                "Workshop" ? (
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
                ) : (
                  "h"
                )}
                <Card
                  sx={{
                    width: "427px",

                    height: "170px",
                    p: 0,
                    borderRadius: "10px",
                  }}
                >
                  <CardContent sx={{ px: "24px" }}>
                    {/* <Box> */}
                    <Typography
                      fontWeight="700px"
                      fontSize="48px"
                      color="#F35B05"
                      // sx={{ p: 0 }}
                    >
                      4
                    </Typography>
                    {/* </Box> */}
                    {/* <Box height="12px" /> */}
                    <Typography fontWeight="500px" fontSize="20px">
                      Ongoing Tasks
                    </Typography>
                    {/* <Box height="8px" /> */}

                    <Typography
                      // sx={{ p: 0 }}
                      fontWeight="400px"
                      fontSize="12px"
                      lineHeight="14px"
                    >
                      This number is for upcoming approval on purchase orders,
                      leave requests, and more tasks.
                    </Typography>
                  </CardContent>
                </Card>
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
                      8
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
                      This number is for pending approval on purchase orders,
                      leave requests, and more.
                    </Typography>
                  </CardContent>
                </Card>
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

export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const taskResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/tasks`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  const purchaseRequestResponse = await fetcher(
    `https://frankconerp.herokuapp.com/api/purchaseRequests`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (taskResponse.data || purchaseRequestResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        taskResponse: taskResponse.data,
        purchaseRequestResponse: purchaseRequestResponse.data,
        // data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: taskResponse.error.message,
      },
    };
  }
}
