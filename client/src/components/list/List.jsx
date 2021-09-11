import "./List.scss";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../listItem/ListItem";
import { useEffect, useRef, useState } from "react";

const List = ({ list }) => {
  const [items, setitems] = useState([]);
  const listRef = useRef();
  const [slideNumber, setslideNumber] = useState(0);

  useEffect(() => {
    setitems(list.content);
  }, [list]);

  const handleClick = (direction) => {
    console.log(slideNumber, 0);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    const itemWidth = 250 + 5;
    console.log(distance);
    if (direction === "left" && slideNumber > 0) {
      setslideNumber(slideNumber - 1);
      console.log("left");
      listRef.current.style.transform = `translateX(${distance + itemWidth}px)`;
    } else if (direction === "right" && slideNumber < 5) {
      setslideNumber(slideNumber + 1);
      console.log("right");
      listRef.current.style.transform = `translateX(${distance - itemWidth}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={(e) => handleClick("left")}
        />
        <div className="container" ref={listRef}>
          {items.map((item) => (
            <ListItem item={item} key={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={(e) => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
