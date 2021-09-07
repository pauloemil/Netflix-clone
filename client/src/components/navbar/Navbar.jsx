import "./Navbar.scss";
import { useState } from "react";
import { Search, Notifications, ArrowDropDown } from "@material-ui/icons";
const Navbar = () => {
  const [isScrolled, setisScrolled] = useState(false);
  window.onscroll = () => {
    setisScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onScroll = null);
  };
  console.log(isScrolled);
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
          />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://scontent.fcai19-2.fna.fbcdn.net/v/t1.6435-1/p160x160/240873246_887802952140936_8396707989231482742_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=x6bo14vFKIwAX8UV2vg&_nc_ht=scontent.fcai19-2.fna&oh=3029f97ae6e9287c067bed690452e8ab&oe=615BD30A"
            alt="profile"
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
