import axios from "../../axios";
import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutStart,
} from "./AuthActions";

export const login = (user, dispatch) => {
  dispatch(loginStart);
  axios
    .post("/auth/login", user)
    .then((resp) => {
      dispatch(loginSuccess(resp.data));
      //resp.data.isAdmin &&  //toDo for more security
      // decode the jwt and take isAdmin from it cause resp.data could be easly manipulated with request interception
    })
    .catch(dispatch(loginFailure));
};
export const logout = (dispatch) => {
  localStorage.setItem("user", null);
  // console.log(localStorage);
  dispatch(logoutStart);
};
