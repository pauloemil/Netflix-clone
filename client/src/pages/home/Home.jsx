import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import "./Home.scss";
import { useEffect, useState } from "react";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
const Home = ({ type }) => {
  const [lists, setlists] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [genre, setgenre] = useState(null);
  useEffect(() => {
    console.log("useEfftct");
    const getRandomList = () => {
      axios
        .get(
          `list${type ? "?type=" + type : ""}${
            genre !== null ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMzljYzNkMmYyNzNkZTU2ZDk1ODc4ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMTE3Nzg5MCwiZXhwIjoxNjMxNjA5ODkwfQ.JW5b-p63IP9SoeTJxjmlXTa5NqBynzrdqb0YBPUO4c0"}`,
            },
          }
        )
        .then((resp) => {
          setisLoading(false);
          setlists(resp.data);
        })
        .catch((err) => {
          setisLoading(false);
          console.log("homelist", err);
        });
    };
    getRandomList();
  }, [genre, type]);
  return (
    <div className="home">
      <Navbar />

      <Featured type={type} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {lists.map((list) => (
            <List list={list} key={list._id} />
          ))}
        </>
      )}
    </div>
  );
};

export default Home;
{
  /* <div key={list._id}>
              <List list={list} />
            </div> */
}
