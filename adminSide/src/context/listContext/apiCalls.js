import axios from "../../axios";
import {
  getListsStart,
  getListsFailure,
  getListsSuccess,
  deleteListsStart,
  deleteListsSuccess,
  deleteListsFailure,
  createListsStart,
  createListsSuccess,
  createListsFailure,
} from "./ListActions";

export const getLists = (dispatch) => {
  dispatch(getListsStart);
  axios
    .get("/list", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(getListsSuccess(resp.data));
    })
    .catch(() => dispatch(getListsFailure));
};

export const deleteList = (id, dispatch) => {
  dispatch(deleteListsStart);
  axios
    .delete(`/list/${id}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(deleteListsSuccess(id));
    })
    .catch(() => dispatch(deleteListsFailure));
};

export const createList = (list, dispatch) => {
  dispatch(createListsStart);
  axios
    .post("/list", list, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(createListsSuccess(resp.data));
    })
    .catch(() => dispatch(createListsFailure));
};
