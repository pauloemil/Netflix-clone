import "./Register.scss";
import { useState } from "react";

const Register = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [started, setstarted] = useState(false);
  const submitHandle = () => {};
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            className="logo"
          />

          <button className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {started ? (
          <>
            <div className="input">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <button className="registerButton" onClick={() => submitHandle()}>
                Start
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="input">
              <input
                type="email"
                placeholder="Email Adress"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              <button
                className="registerButton"
                onClick={() => setstarted(true)}
              >
                Get Started
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
