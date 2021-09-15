import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";

export default function WidgetSm() {
  const [usersData, setusersData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/user?new=true", {
        headers: {
          Authorization: `Bearer ${
            localStorage.getItem("user")
              ? JSON.parse(localStorage.getItem("user")).accessToken
              : null
          }`,
        },
      })
      .then((resp) => {
        setisLoading(false);
        setusersData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        setisLoading(false);
        console.log("adminSmallWidgList", err);
      });
  }, []);

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {usersData.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.profilePic ||
                `https://dummyimage.com/600x600/000000/fff&text=${user.username[0]}`
              }
              alt="profile"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
