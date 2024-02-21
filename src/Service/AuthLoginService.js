import axios from "axios";
import API_BASE_PATH from "../CommonServices";

export const registeruser = async (ReqData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_BASE_PATH.BasePath + `registeruser`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getregisteruserDetails = async (ReqData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_BASE_PATH.BasePath + `getforgetpassword`,
      data: ReqData,
      headers: {
        "Content-Type": "application/json",
        // Authorization: "bearer " + accessToken,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getRegisterUserList = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: API_BASE_PATH.BasePath + `registeruserlist`,
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
