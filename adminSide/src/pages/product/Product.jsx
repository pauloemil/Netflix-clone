import { Link, useParams } from "react-router-dom";
import "./product.css";
// import Chart from "../../components/chart/Chart";
// import { productData } from "../../dummyData";
import { useEffect, useState, useContext } from "react";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
export default function Product() {
  const { movieID } = useParams();
  // console.log(movieID);
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState(null);
  const { dispatch } = useContext(MovieContext);
  useEffect(() => {
    axios
      .get(`/movie/find/${movieID}`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      })
      .then((resp) => {
        console.log("resp", resp.data);
        setMovie(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        setError("There is an error please try again!");
      });
  }, [movieID]);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const updateHandle = (e) => {
    e.preventDefault();
    updateMovie(movie, dispatch);
  };
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      {err ? (
        <div class="alert alert-danger" role="alert">
          {err}
        </div>
      ) : (
        ""
      )}
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img
              //   src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              src={movie.image}
              alt=""
              className="productInfoImg"
            />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              type="text"
              value={movie.title}
              name="title"
              onChange={handleChange}
              required
            />
            <label>Year</label>
            <input
              type="text"
              value={movie.year}
              name="year"
              onChange={handleChange}
              required
            />
            <label>Genre</label>
            <input
              type="text"
              value={movie.genre}
              name="genre"
              onChange={handleChange}
              required
            />
            <label>Limit</label>
            <input
              type="text"
              value={movie.limit}
              name="limit"
              onChange={handleChange}
              required
            />
            <label>Trailer Link</label>
            <input
              type="text"
              value={movie.trailer}
              name="trailer"
              onChange={handleChange}
              required
            />
            <label>Video Link</label>
            <input
              type="text"
              value={movie.video}
              name="video"
              onChange={handleChange}
              required
            />
            <label>Image Link</label>
            <input
              type="text"
              id="image"
              name="image"
              value={movie.image}
              onChange={handleChange}
              required
            />
            <label>Thumbnail Image Link</label>
            <input
              type="text"
              id="imageSmall"
              name="imageSmall"
              value={movie.imageSmall}
              onChange={handleChange}
              required
            />
            <label>Title Image Link</label>
            <input
              type="text"
              id="imageTitle"
              name="imageTitle"
              value={movie.imageTitle}
              onChange={handleChange}
              required
            />
            <label>Description</label>
            <textarea
              value={movie.description}
              name="description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                // src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                src={movie.image}
                alt=""
                className="productUploadImg"
              />
            </div>
            <button className="productButton" onClick={(e) => updateHandle(e)}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
