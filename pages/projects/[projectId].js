import { useRouter } from "next/router";
import Layout from "../../components/Layout";

import ProjectDetailPage from "../../components/ProjectDetail";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";

import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

function ProjectDetails({ id, jwt }) {
  const router = useRouter();

  const { user, loading } = useFetchUser();
  const { userDepartment } = useFetchUserDepartment();

  const handleSlide = () => {
    setChecked((prev) => !prev);
  };
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
export async function getServerSideProps({ req, params }) {
  const id = params.projectId;
  console.log("params is ", params);
  console.log("id is ", id);
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const taskResponse = await fetcher(
    `http://localhost:1337/api/tasks`,
    jwt
      ? {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      : ""
  );
  const purchaseRequestResponse = await fetcher(
    `http://localhost:1337/api/purchaseRequests`,
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
        id,
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

export default ProjectDetails;
