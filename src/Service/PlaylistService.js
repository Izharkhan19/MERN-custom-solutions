import axios from "axios";
import API_BASE_PATH from "../CommonServices";

export const AddNewSong = async (ReqData) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_BASE_PATH.BasePath + `songs`,
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

export const getSongList = async () => {
    try {
      const response = await axios({
        // method: "GET",
        url: API_BASE_PATH.BasePath + "songs",
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

  export const DeleteSongByID = async (ReqData) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: API_BASE_PATH.BasePath + `songs/${ReqData.userId}`,
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