import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import ProjectDetailPage from "../../components/ProjectDetail";
import { readNotification } from "../../lib";
import { getTokenFromLocalCookie } from "../../lib/auth";

import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

function ProjectDetails() {
  const router = useRouter();
  const id = router.query.employeeId;

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(() => {
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
        <ProjectDetailPage
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

export default ProjectDetails;
