import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Employees from "../../components/Employees";
import Layout from "../../components/Layout";
import { readNotification } from "../../lib";
import { fetcher } from "../../lib/api";
import { getTokenFromServerCookie } from "../../lib/auth";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

const EmployeesPage = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);
  const [purchaseRequestResponse, setPurchaseRequestResponse] = useState();
  const [response, setResponse] = useState([]);

  useEffect(async () => {
    console.log(1, "start");

    const jwt = getTokenFromLocalCookie();

    // typeof window !== "undefined"
    //   ? getTokenFromLocalCookie
    //   : getTokenFromServerCookie(req);
    console.log(2, "end", { jwt });

    setJwt(jwt);

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
    console.log(2, { purchaseRequestResponse });
    if (purchaseRequestResponse.data) {
      setPurchaseRequestResponse(purchaseRequestResponse.data);
    }

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);

  console.log("the user is", user);
  console.log("the user department is", userDepartment);
  return (
    <>
      {userDepartment === "Human Resource" ? (
        <>
          <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <Employees jwt={jwt} />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
      {userDepartment === "admin" ? (
        <>
          <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
            <Box paddingLeft="48px">
              <Employees jwt={jwt} />
            </Box>
          </Layout>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default EmployeesPage;
