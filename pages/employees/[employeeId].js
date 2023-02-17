import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EmployeeDetailPage from "../../components/EmployeeDetailPage";
import Layout from "../../components/Layout";
import { readNotification } from "../../lib";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";

import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

function EmployeeDetails() {
  const router = useRouter();
  const id = router.query.employeeId;

  console.log("this", { id });
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);
  const [response, setResponse] = useState([]);

  useEffect(async () => {
    const jwt = getTokenFromLocalCookie();

    console.log(2, "end", { jwt });

    setJwt(jwt);

    readNotification(jwt).then((r) => {
      console.log("r is", r.data?.data);
      setResponse(r.data?.data);
    });

    console.log("index response is", { response });
  }, []);
  return (
    <Layout
      jwt={jwt}
      //   purchaseRequestResponse={purchaseRequestResponse}
      user={user}
      userDepartment={userDepartment}
    >
      <>
        <EmployeeDetailPage
          id={id}
          jwt={jwt}
          user={user}
          userDepartment={userDepartment}
          // jwt={jwt}
        />
      </>
    </Layout>
  );
}

export default EmployeeDetails;
