import "./ListItem.scss";
import {
  PlayArrow,
  Add,
  ThumbDownAltOutlined,
  ThumbUpOutlined,
} from "@material-ui/icons";
import { useState } from "react";
const ListItem = () => {
  const [isHovered, setisHovered] = useState(false);
  return (
    <div
      className="listItem"
      onMouseEnter={() => setisHovered(true)}
      onMouseLeave={() => setisHovered(false)}
    >
      {isHovered ? (
        <>
          <video
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761"
            // src=""
            autoPlay={true}
            loop
          ></video>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbDownAltOutlined className="icon" />
              <ThumbUpOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <div className="genre">Action</div>
              <span>:</span>
              <span>1 hour 14 mins</span>
              <span className="limit">+18</span>
              <span>2017</span>
            </div>
            <div className="desc">
              Set in Madrid, a mysterious man known as "The Professor" recruits
              a group of eight people, who choose cities for code-names, to
              carry out an ambitious plan that involves entering the Royal Mint
              of Spain, and escaping with €984 million.
            </div>
          </div>
        </>
      ) : (
        <img src="https://wallpapercave.com/wp/wp2402464.jpg" alt="item" />
      )}
    </div>
  );
};

export default ListItem;
