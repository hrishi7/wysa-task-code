import { proxy } from "../proxy";
import axios from "axios";
let store = JSON.parse(localStorage.getItem("state"));
if(store && store.token){
  axios.defaults.headers.common = { Authorization: `Bearer ${store.token}` };
}


export const updateProperty = async (nickname, data) => {
  try {
    let result = await axios.patch(
      `${proxy}/api/user-properties/nickname/${nickname}`,
      data
    );
    return result.data;
  } catch (error) {
    return {
      success: false,
      message: "Updating Properties Failed Due to Server error",
    };
  }
};

export const getStatus = async (nickname) => {
  try {
    let result = await axios.get(
      `${proxy}/api/user-properties/nickname/${nickname}`
    );
    return result.data;
  } catch (error) {
    console.log(error)
    return {
      success: false,
      message: "getting Properties Failed Due to Server error",
    };
  }
};
