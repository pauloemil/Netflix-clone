import "./Featured.scss";
import { PlayArrow, InfoOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const Featured = ({ type }) => {
  const [isLoading, setisLoading] = useState(true);
  const [item, setitem] = useState({});
  useEffect(() => {
    axios
      .get("/movie/random", {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzljYzNkMmYyNzNkZTU2ZDk1ODc4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE3Nzg5MCwiZXhwIjoxNjMxNjA5ODkwfQ.JW5b-p63IP9SoeTJxjmlXTa5NqBynzrdqb0YBPUO4c0"}`,
        },
      })
      .then((resp) => {
        // console.log(resp);
        setisLoading(false);
        setitem(resp.data[0]);
      })
      .catch((err) => {
        setisLoading(false);
        console.log("homelist", err);
      });
  }, [type]);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}

      <img src={item.image} alt="cover" />
      <div className="info">
        <img src={item.imageTitle} alt="" />
        <span className="desc">{item.description}</span>
        <div className="buttons">
          <Link to={{ pathname: "/watch", item: item }}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined /> <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
