import React from "react";
import { Box } from "@mui/system";
import Layout from "../../components/Layout";
import Projects from "../../components/Projects";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";
import { fetcher } from "../../lib/api";
import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";
const ProjectsPage = ({ jwt }) => {
  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();
  return (
    <Layout jwt={jwt} user={user} userDepartment={userDepartment}>
      <Box paddingLeft="48px">
        <Projects user={user} userDepartment={userDepartment} jwt={jwt} />
      </Box>
    </Layout>
  );
};
export async function getServerSideProps({ req, params }) {
  // const { slug } = params;
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const projectResponse = await fetcher(
    `http://localhost:1337/api/projects`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  if (projectResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        projectResponse: projectResponse.data,
        // plot,
        jwt: jwt ? jwt : "",
      },
    };
  } else {
    return {
      props: {
        error: projectResponse.error.message,
      },
    };
  }
}

export default ProjectsPage;
