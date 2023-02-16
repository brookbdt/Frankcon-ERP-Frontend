import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Layout from "../../components/Layout";
import Projects from "../../components/Projects";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
const ProjectsPage = () => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const [jwt, setJwt] = useState(null);

  const [response, setResponse] = useState([]);

  useEffect(async () => {
    console.log(1, "params console is");

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
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      <Box paddingLeft="48px">
        <Projects user={user} userDepartment={userDepartment} jwt={jwt} />
      </Box>
    </Layout>
  );
};

export default ProjectsPage;
