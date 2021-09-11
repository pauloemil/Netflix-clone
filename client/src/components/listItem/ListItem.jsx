import "./ListItem.scss";
import {
  PlayArrow,
  Add,
  ThumbDownAltOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
  const [isHovered, setisHovered] = useState(false);
  const [itemInfo, setitemInfo] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`/movie/find/${item}`, {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzljYzNkMmYyNzNkZTU2ZDk1ODc4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE3Nzg5MCwiZXhwIjoxNjMxNjA5ODkwfQ.JW5b-p63IP9SoeTJxjmlXTa5NqBynzrdqb0YBPUO4c0"}`,
        },
      })
      .then((resp) => {
        setitemInfo(resp.data);
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
        console.log("itemFetch", err);
      });
  }, [item]);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Link className="link" to={{ pathname: "/watch", item: itemInfo }}>
      <div
        className="listItem"
        onMouseEnter={() => setisHovered(true)}
        onMouseLeave={() => setisHovered(false)}
      >
        {isHovered ? (
          <>
            <video
              // src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
              src={itemInfo.trailer}
              autoPlay={true}
              loop
              muted
            ></video>
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbDownAltOutlined className="icon" />
                <ThumbUpOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <div className="genre">{itemInfo.genre}</div>
                <span>:</span>
                <span>1 hour 14 mins</span>
                <span className="limit">+{itemInfo.limit}</span>
                <span>{itemInfo.year}</span>
              </div>
              <div className="desc">{itemInfo.description}</div>
            </div>
          </>
        ) : (
          <img src={itemInfo.image} alt="item" />
        )}
      </div>
    </Link>
  );
};

export default ListItem;
