import axios from "axios";
// const url = "http://localhost:1337/api";
const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}`;
// export const readTask = (jwt) =>
//   axios.get(`${url}/tasks`, {
//     headers: {
//       Authorization: "Bearer " + jwt,
//     },
//   });
export const readTask = (jwt, id) =>
  axios.get(`${url}/tasks?filters[employee][id][$eq]=${id}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readTaskEmployee = async (jwt, user) =>
  axios.get(
    `${url}/employees?filters[users_permissions_user][username][$eq]=${user}&populate=%2A`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );

export const readUser = (jwt, user) =>
  axios.get(
    `${url}/users?filters[username][$eq]=${user}&populate[0]=employee&populate[1]=employee.employeeImage}`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );

export const readEmployee = (jwt) =>
  axios.get(`${url}/employees?populate=%2A`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readPayroll = (jwt) =>
  axios.get(`${url}/payrolls?populate=%2A`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const readEmployeeTask = (jwt, user) =>
  axios.get(
    `${url}/tasks?filters[employee][users_permissions_user][username]=${user}&populate[0]=employee&populate[1]=employee.employeeImage`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readPaymentsRequests = (jwt, user) =>
  axios.get(`${url}/paymentRequests?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readEmployeeUnresolvedTask = (jwt, user) =>
  axios.get(
    `${url}/tasks?filters[employee][users_permissions_user][username]=${user}&filters[status][$ne]=DONE`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
// export const readProjectResolvedTask = (id, jwt, user) =>
//   axios.get(
//     `${url}/projects/${id}?filters[employees][users_permissions_user][username]=${user}&populate[0]=comments.employee&populate[1]=projectImage&populate[2]=tasks&filters[tasks][status][$eq]=DONE&populate[3]=tasks.employee_checkeds&populate[4]=tasks.employee_checkeds.employeeImage`,
//     {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     }
//   );

export const readProjectResolvedTask = (id, jwt, user) =>
  axios.get(
    `${url}/tasks/?filters[projects]=${id}&filters[status]=DONE&populate[0]=employee&populate[1]=employee_checkeds&populate[2]=employee_checkeds.employeeImage&populate[3]=employee.employeeImage&populate[4]=comments&populate[5]=taskFiles`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readProjectInprogressTask = (id, jwt, user) =>
  axios.get(
    `${url}/tasks/?filters[projects]=${id}&filters[status]=INPROGRESS&populate[0]=employee&populate[1]=employee_checkeds&populate[2]=employee_checkeds.employeeImage&populate[3]=employee.employeeImage&populate[4]=comments&populate[5]=taskFiles`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readProjectBacklogTask = (id, jwt, user) =>
  axios.get(
    `${url}/tasks/?filters[projects]=${id}&filters[status]=INREVIEW&populate[0]=employee&populate[1]=employee_checkeds&populate[2]=employee_checkeds.employeeImage&populate[3]=employee.employeeImage&populate[4]=comments&populate[5]=taskFiles`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readProjectTodoTask = (id, jwt, user) =>
  axios.get(
    `${url}/tasks/?filters[projects]=${id}&filters[status]=TO%20DO&populate[0]=employee&populate[1]=employee_checkeds&populate[2]=employee_checkeds.employeeImage&populate[3]=employee.employeeImage&populate[4]=comments&populate[5]=taskFiles`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readEmployeeInprogressTask = async (jwt, user) =>
  axios.get(
    `${url}/tasks?filters[employee][users_permissions_user][username]=${user}&filters[status][$eq]=INPROGRESS`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readDepletingItems = async (jwt, user) =>
  axios.get(
    `${url}/tag-registrations?filters[employee][users_permissions_user][username]=${user}&filters[status][$eq]=INPROGRESS`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readEmployeeByDepartment = (jwt, department) =>
  axios.get(
    `${url}/employees?populate=%2a&filters[department][$eq]=${department}`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
// export const readEmployeeByDepartmentTask = (jwt, user, department) =>
//   axios.get(
//     `${url}/employees?populate=%2a&filters[department][$eq]=${department}`,
//     {
//       headers: {
//         Authorization: "Bearer " + jwt,
//       },
//     }
//   );
export const readEmployeeTodoTask = (jwt, user) =>
  axios.get(
    `${url}/tasks?filters[employee][users_permissions_user][username]=${user}&filters[status][$eq]=TO+DO`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readEmployeeDepartmentTask = (jwt, department) =>
  axios.get(`${url}/tasks?filters[department][$eq]=${department}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readEmployeeDetail = (jwt, user) =>
  axios.get(
    `${url}/employees?filters[users_permissions_user][username][$eq]=${user}&populate=%2a`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readAccountBalanceId = (jwt) =>
  axios.get(
    `${url}/account-balances?sort=id%3adesc&pagination[limit]=1`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readOneEmployeeDetail = (id, jwt) =>
  axios.get(
    `${url}/employees/${id}?populate=*`,
    // `${url}/projects/${id}?filters[employees][users_permissions_user][username]=${user}&populate=*`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );

export const readOrder = (jwt) =>
  axios.get(`${url}/orders`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const readInventory = (jwt) =>
  axios.get(`${url}/tag-registrations?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const readMaterialTransferRequest = (id, jwt) =>
  axios.get(`${url}/materialtransferrequests/${id}?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readAllMaterialTransferRequest = (jwt) =>
  axios.get(`${url}/materialtransferrequests?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readInventoryDocs = (jwt) =>
  axios.get(`${url}/inventory-documentations?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readWorkshopTasks = (jwt) =>
  axios.get(`${url}/Workshop-Tasks?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const createQuestion = (newQuestion) =>
  axios.post(`${url}/faqs`, newQuestion);

export const readPurchaseRequest = (jwt) =>
  axios.get(`${url}/purchaserequests?populate=*`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readVendor = (jwt) =>
  axios.get(`${url}/vendors?populate=*`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readInboundReceivingForm = (jwt) =>
  axios.get(`${url}/inbound-receiving-forms?populate=*`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createTask = (newTask, jwt) =>
  axios.post(`${url}/tasks`, newTask, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createComment = (newComment, jwt) =>
  axios.post(`${url}/comments`, newComment, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createNotification = async (newNotification, jwt) =>
  await axios.post(`${url}/notifications`, newNotification, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editNotification = async (editedNotification, id, jwt) =>
  await axios.put(`${url}/notifications/${id}`, editedNotification, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPaymentRequestNotification = async (newNotification, jwt) =>
  await axios.post(`${url}/payment-request-notifications`, newNotification, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPayout = async (newPayout, jwt) =>
  await axios.post(`${url}/payouts`, newPayout, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPayin = async (newPayin, jwt) =>
  await axios.post(`${url}/payins`, newPayin, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editTaskStatus = async (editTask, id, jwt) =>
  await axios.put(`${url}/tasks/${id}`, editTask, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editAccountBalance = async (editedAccountBalance, id, jwt) =>
  await axios.put(`${url}/account-balances/${id}`, editedAccountBalance, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editPurchaseRequest = async (editedPurchaseRequest, id, jwt) =>
  await axios.put(`${url}/purchaserequests/${id}`, editedPurchaseRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editPaymentRequest = async (editedPaymentRequest, id, jwt) =>
  await axios.put(`${url}/paymentRequests/${id}`, editedPaymentRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getPaymentRequest = async (paymentRequest, id, jwt) =>
  await axios.get(`${url}/paymentRequests/${id}`, paymentRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editVendorRequest = async (editedVendorRequest, id, jwt) =>
  await axios.put(`${url}/vendors/${id}`, editedVendorRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editLeaveRequest = async (editedLeaveRequest, id, jwt) =>
  await axios.put(`${url}/leave-Requests/${id}`, editedLeaveRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const editMaterialTransfer = async (editedMaterialTransfer, id, jwt) =>
  await axios.put(
    `${url}/materialtransferrequests/${id}`,
    editedMaterialTransfer,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const editInventory = async (itemQuantity, id, jwt) =>
  await axios.put(`${url}/tag-registrations/${id}`, itemQuantity, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getInventoryQuantity = async (id, jwt) =>
  await axios.get(`${url}/tag-registrations/${id}`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
// export const editPurchaseRequest = async (editedPurchaseRequest, id, jwt) =>
//   await axios.put(`${url}/notifications/${id}`, editedPurchaseRequest, {
//     headers: {
//       Authorization: "Bearer " + jwt,
//     },
//   });
export const readProjectDetail = async (id, jwt, user) =>
  await axios.get(
    `${url}/projects/${id}?filters[employees][users_permissions_user][username]=${user}&populate=*`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const createEmployee = (newEmployee, jwt) =>
  axios.post(`${url}/employees`, newEmployee, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPayroll = (newPayroll, jwt) =>
  axios.post(`${url}/payrolls`, newPayroll, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createNewProject = (newProject, jwt) =>
  axios.post(`${url}/projects`, newProject, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const updateProject = (updatedProject, id, jwt) =>
  axios.put(`${url}/projects/${id}`, updatedProject, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readProject = (jwt, user) =>
  axios.get(
    `${url}/projects?filters[employees][users_permissions_user][username]=${user}&populate=*`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const readAllProjects = (jwt, user) =>
  axios.get(`${url}/projects?populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const getProjectId = async (jwt) =>
  axios.get(`${url}/projects?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getVendorId = async (jwt) =>
  axios.get(`${url}/vendors?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getPaymentId = async (jwt) =>
  axios.get(`${url}/paymentrequests?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const getPurchaseId = async (jwt) =>
  axios.get(`${url}/purchaserequests?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getTagRegistrationId = async (jwt) =>
  axios.get(`${url}/Tag-Registrations?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getMaterialId = async (jwt) =>
  axios.get(
    `${url}/materialtransferrequests?sort=id%3adesc&pagination[limit]=1`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const getInboundReceivingId = async (jwt) =>
  axios.get(
    `${url}/inbound-receiving-forms?sort=id%3adesc&pagination[limit]=1`,
    {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    }
  );
export const getPurchaseRequestId = async (jwt) =>
  axios.get(`${url}/purchaserequests?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const getEmployeeId = async (jwt) =>
  axios.get(`${url}/employees?sort=id%3adesc&pagination[limit]=1`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createLeaveRequest = (newLeaveRequest, jwt) =>
  axios.post(`${url}/leave-requests`, newLeaveRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createInventory = (newInventory, jwt) =>
  axios.post(`${url}/inventories`, newInventory, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPurchaseRequest = async (newPurchaseRequest, jwt) =>
  await axios.post(`${url}/purchaserequests`, newPurchaseRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createVendorRequest = async (newVendorRequest, jwt) =>
  await axios.post(`${url}/vendors`, newVendorRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createPaymentRequest = async (newPaymentRequest, jwt) =>
  await axios.post(`${url}/paymentrequests`, newPaymentRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createMaterialTransferRequest = async (
  materialTransferRequest,
  jwt
) =>
  await axios.post(`${url}/materialtransferrequests`, materialTransferRequest, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createInboundReceivingForm = async (
  newInboundReceivingForm,
  jwt
) =>
  await axios.post(`${url}/inbound-receiving-forms`, newInboundReceivingForm, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const createTagRegistration = async (newTagRegistration, jwt) =>
  await axios.post(`${url}/Tag-Registrations`, newTagRegistration, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

export const readNotification = async (jwt, user) =>
  await axios.get(`${url}/notifications?filters[$or][0][employees][users_permissions_user][username][$eq]=${user}&filters[$or][1][employee][users_permissions_user][username][$eq]=${user}&populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });
export const readPaymentNotification = async (jwt, user) =>
  await axios.get(`${url}/payment-request-notifications?filters[$or][0][employees][users_permissions_user][username][$eq]=${user}&filters[$or][1][employee][users_permissions_user][username][$eq]=${user}&populate=%2a`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });


// http://localhost:1337/api/notifications?populate=%2a
// export const editPurchaseRequest = (editedPurchaseRequest, jwt) =>
//   axios.put(`${url}/purchaserequests`, editedPurchaseRequest, {
//     headers: {
//       Authorization: "Bearer " + jwt,
//     },
//   });



// export const readForum = () => axios.get(url);
