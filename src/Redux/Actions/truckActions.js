import { message } from "antd";
import axios from "axios";

export const getAllTrucks = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/trucks/getAllTrucks");
    dispatch({ type: "GET_ALL_TRUCKS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addTruck = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("http://localhost:5000/trucks/addTruck", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New truck added successfully");
    setTimeout(() => {
      window.location.href = "/adminHome";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editTruck = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/trucks/editTruck", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Truck details updated successfully");
    setTimeout(() => {
      window.location.href = "/adminHome";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteTruck = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/trucks/deleteTruck", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Truck deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
