import axios from "axios";
import API_BASE_PATH from "../CommonServices";

export const getUserList = async () => {
  try {
    const response = await axios({
      // method: "GET",
      url: API_BASE_PATH.BasePath + "users",
      //   data: ReqData,
      headers: {
        // "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteUserByID = async (ReqData) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: API_BASE_PATH.BasePath + `users/${ReqData.userId}`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateUserByID = async (id, ReqData) => {
  try {
    const response = await axios({
      method: "PUT",
      url: API_BASE_PATH.BasePath + `users/${id}`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const AddNewUser = async (ReqData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_BASE_PATH.BasePath + `users`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getUserDetailsByID = async (id) => {
  try {
    const response = await axios({
      method: "GET",
      url: API_BASE_PATH.BasePath + `users/${id}`,
      //   data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};
