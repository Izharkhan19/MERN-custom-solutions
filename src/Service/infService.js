import axios from "axios";

let tokenValue = "6Y7m41voFtkQ7AQg0fW7gziQg4VWqOeaNpQ6urxOcc657860";

function getHeadersFromData() {
  return {
    "Content-Type": "multipart/form-data",
    accept: "*/*",
    Authorization: "Bearer 6Y7m41voFtkQ7AQg0fW7gziQg4VWqOeaNpQ6urxOcc657860",
  };
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    accept: "*/*",
    Authorization: "Bearer 6Y7m41voFtkQ7AQg0fW7gziQg4VWqOeaNpQ6urxOcc657860",
  };
}

export const apiCall = async (data, formType) => {
  if (tokenValue !== "" && tokenValue !== undefined && tokenValue !== null) {
    try {
      let formData = new FormData();

      if (formType) {
        for (const [key, value] of Object.entries(data?.body)) {
          if (
            typeof value === "object" &&
            Array.isArray(value) &&
            key !== "componentjson"
          ) {
            value?.map((item, index) => {
              for (const [nestedKey, nestedValue] of Object.entries(item)) {
                formData.append(`${key}[${index}].${nestedKey}`, nestedValue);
              }
            });
          } else {
            formData.append(`${key}`, value);
          }
        }
      }
      let response = await axios({
        method: data.method,
        url: data?.url,
        maxBodyLength: Infinity,
        data: formType ? formData : data?.body,
        headers: formType ? getHeadersFromData() : getHeaders(),
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  } else {
    try {
      let formData = new FormData();

      if (formType) {
        for (const [key, value] of Object.entries(data?.body)) {
          if (
            typeof value === "object" &&
            Array.isArray(value) &&
            key !== "componentjson"
          ) {
            value?.map((item, index) => {
              for (const [nestedKey, nestedValue] of Object.entries(item)) {
                formData.append(`${key}[${index}].${nestedKey}`, nestedValue);
              }
            });
          } else {
            formData.append(`${key}`, value);
          }
        }
      }
      let response = await axios({
        method: data.method,
        url: data?.url,
        data: formType ? formData : data?.body,
      });
      return response?.data;
    } catch (error) {
      return error;
    }
  }
};
