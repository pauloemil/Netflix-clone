import Chart from "../../components/chart/Chart";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "../../axios";
import { useEffect, useMemo, useState } from "react";
import { CircularProgress } from "@material-ui/core";

export default function Home() {
  const [isLoading, setisLoading] = useState(true);
  const [userData, setuserData] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    axios
      .get("/user/stats", {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzljYzNkMmYyNzNkZTU2ZDk1ODc4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE3Nzg5MCwiZXhwIjoxNjMxNjA5ODkwfQ.JW5b-p63IP9SoeTJxjmlXTa5NqBynzrdqb0YBPUO4c0"}`,
        },
      })
      .then((resp) => {
        const datalist = resp.data.sort((a, b) => {
          return a._id - b._id;
        });
        datalist.map((item) =>
          setuserData((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Total Users": item.total },
          ])
        );
        setisLoading(false);
      })
      .catch((err) => {
        setisLoading(false);
        console.log("adminHomelist", err);
      });
  }, [MONTHS]);
  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="home">
      {/* <FeaturedInfo /> */}
      <Chart
        data={userData}
        title="User Analytics"
        grid
        dataKey="Total Users"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
