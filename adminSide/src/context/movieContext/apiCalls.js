import axios from "../../axios";
import {
  getMoviesStart,
  getMoviesSuccess,
  getMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  deleteMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  createMoviesFailure,
  updateMoviesStart,
  updateMoviesSuccess,
  updateMoviesFailure,
} from "./MovieActions";

export const getMovies = (dispatch) => {
  dispatch(getMoviesStart);
  axios
    .get("/movie", {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(getMoviesSuccess(resp.data));
    })
    .catch(() => {
      dispatch(getMoviesFailure);
    });
};

export const deleteAMovie = (id, dispatch) => {
  dispatch(deleteMoviesStart);
  axios
    .delete(`/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(deleteMoviesSuccess(id));
      // console.log(resp.data);
    })
    .catch(() => {
      dispatch(deleteMoviesFailure);
    });
};

export const createMovie = (movie, dispatch) => {
  dispatch(createMoviesStart);
  // console.log(movie);
  axios
    .post("/movie", movie, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(createMoviesSuccess(movie));
      // console.log(resp.data);
    })
    .catch(() => {
      dispatch(createMoviesFailure);
    });
};

export const updateMovie = (movie, dispatch) => {
  dispatch(updateMoviesStart);
  // console.log("movie", movie);
  axios
    .put(`/movie/${movie._id}`, movie, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user")).accessToken
            : null
        }`,
      },
    })
    .then((resp) => {
      dispatch(updateMoviesSuccess(movie));
      // console.log(resp.data);
    })
    .catch(() => {
      dispatch(updateMoviesFailure);
    });
};
