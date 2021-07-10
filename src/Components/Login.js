import React, { useState } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { useHistory } from "react-router-dom";

// import LandingPage from '../Pages/LandingPage';



const Login = (props) => {
  const [details, setDetails] = useState({ email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    Login(details);
  };

  const history = useHistory();

  // const adminUser = {
  //   email: "admin@a.com",
  //   password: "admin123",
  // };

  const [user, setUser] = useState({ email: "" });
  const [error, setError] = useState("");

  const Login = (details) => {
    console.log(details);

    // Axios.post("http://localhost:3003/getUserAuth", {
    //   username: details.email,
    //   pwd: details.password,
    // }).then(
    //   (res) => {
    //     console.log("printing user details : ", res.data[0].RESULT);

    //     const userAuth = res.data[0].RESULT;

    //     if (userAuth == 2) {
    //       Auth.login(() => {
    //         props.history.push("/landing");
    //       });
    //     } else {
    //       setError("Details do not match!");
    //     }
    //   },
    //   (err) => {
    //     console.log("Error while fetching user details : ", err);
    //   }
    // );
         
            props.history.push("/dashboard");
         
    
  };

  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <title>
                <h1 style={{ marginLeft: "170px", color: "gray" }}>STICHpad</h1>
              </title>
             
            </div>
            <form className="login100-form" onSubmit={submitHandler}>
              <span className="login100-form-title">User Login</span>
              {error != "" ? <div className="error">{error}</div> : ""}
              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is required: ex@abc.xyz"
              >
                <input
                  className="input100 login-input"
                  type="text"
                  name="email"
                  placeholder="User Name"
                  onChange={(e) =>
                    setDetails({ ...details, email: e.target.value })
                  }
                  value={details.email}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa" aria-hidden="true">
                    <FaEnvelope />
                  </i>
                </span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <input
                  className="input100 login-input"
                  type="password"
                  name="pass"
                  placeholder="Password"
                  onChange={(e) =>
                    setDetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa" aria-hidden="true">
                    <FaLock />
                  </i>
                </span>
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
