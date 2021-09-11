import { ArrowBackOutlined } from "@material-ui/icons";
import { useLocation } from "react-router";
import "./Watch.scss";

const Watch = () => {
  //this
  const location = useLocation();
  console.log(location.item.video);
  // is a bad way to do it.. but idk what's better :"
  // maybe make it do it's own request meh..

  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined /> Home
      </div>
      <video
        src={location.item.video}
        // src="https://r1---sn-uxaxjvhxbt2u-50xe.googlevideo.com/videoplayback?expire=1631033316&ei=hEM3YcvUJoiZ0wWzz43YDQ&ip=41.238.169.164&id=o-AJYYsfwJnhISyUxmqH7hrqbfp3AHPmQJSBBCORNfJpW8&itag=22&source=youtube&requiressl=yes&mh=iG&mm=31%2C29&mn=sn-uxaxjvhxbt2u-50xe%2Csn-hgn7rne7&ms=au%2Crdu&mv=m&mvi=1&pl=20&initcwndbps=307500&vprv=1&mime=video%2Fmp4&ns=qJDUmRnWjBNrgq1gTbUbcNMG&cnr=14&ratebypass=yes&dur=109.644&lmt=1627919273436556&mt=1631011279&fvip=1&fexp=24001373%2C24007246&c=WEB&txp=5532434&n=bV-LgO5Qom6Kb6p&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJBT2GRJTMTSfWGCPAoalWg1gF_JJRRVuaB5sLGi_4YDAiEA0OCXkNjk55tnEYRgqaNpXEp3DkfuodDu8Vjy2HZ1hOg%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgbsHMUnRobNyTPl1x5hiA3u5Aj_-RagdLQTE_-W3yL9kCIHa1nIEBRAUoF9L4wk2lse-bscGBEo7k4CoHWBCuDKHn"
        className="video"
        autoPlay
        progress
        controls
      ></video>
    </div>
  );
};

export default Watch;
