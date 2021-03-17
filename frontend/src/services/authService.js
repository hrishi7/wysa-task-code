import { proxy } from "../proxy";
import axios from "axios";

export async function loginUser(data) {
  try {
    let result = await axios.post(`${proxy}/api/authentication/login`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Login Failed Due to Server error",
    };
  }
}

export async function registerUser(data) {
  try {
    let result = await axios.post(`${proxy}/api/user/`, data);
    return result.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Registration Failed Due to Server error",
    };
  }
}

