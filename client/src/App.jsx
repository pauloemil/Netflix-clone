import "./app.scss";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Watch from "./pages/watch/Watch";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/register">
            {!user ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/watch">
            {user ? <Watch /> : <Redirect to="/register" />}
          </Route>
          <Route exact path="/movies">
            {user ? <Home type="movies" /> : <Redirect to="/register" />}
          </Route>
          <Route exact path="/series">
            {user ? <Home type="series" /> : <Redirect to="/register" />}
          </Route>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/register" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
