import { useRouter } from "next/router";
import EmployeeDetailPage from "../../components/EmployeeDetailPage";
import Layout from "../../components/Layout";
import { fetcher } from "../../lib/api";
import {
  getTokenFromLocalCookie,
  getTokenFromServerCookie,
} from "../../lib/auth";

import { useFetchUser, useFetchUserDepartment } from "../../lib/authContext";

function EmployeeDetails({ id, jwt }) {
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
export async function getServerSideProps({ req, params }) {
  const id = params.employeeId;
  console.log("params is ", params);
  console.log("id is ", id);
  const jwt =
    typeof window !== "undefined"
      ? getTokenFromLocalCookie
      : getTokenFromServerCookie(req);
  const employeeResponse = await fetcher(
    `http://localhost:1337/api/employees`,
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
  if (employeeResponse.data || purchaseRequestResponse.data) {
    // const plot = await markdownToHtml(filmResponse.data.attributes.plot);
    return {
      props: {
        taskResponse: employeeResponse.data,
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
        error: employeeResponse.error.message,
      },
    };
  }
}

export default EmployeeDetails;
