import axios from "axios";
import { message } from "antd";

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      reqObj
    );
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user?.role === "admin"){
        window.location.href = "/rent";
      }else{
        window.location.href = "/";
      }
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      reqObj
    );
    message.success("Registration successfull")
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);

    dispatch({ type: "LOADING", payload: false })
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
    dispatch({ type: "LOADING", payload: false })
  }
};
