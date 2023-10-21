import axios from "axios";
import API_BASE_PATH from "../CommonServices";

export const getRegisterUserList = async () => {
  try {
    const response = await axios({
    //   method: "GET",
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
