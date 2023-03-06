import React, { useState } from "react";
import "./Login.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../App";

const Login = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [credentials, setCredentials] = useState({ name: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:80/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        password: credentials.password,
      }),
    });
    console.log(credentials.name, credentials.password);
    const json = await response.json();
    // console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("access_token", json.authtoken);
      toast.success("You are being redirected to add note page", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/mynotes");
      }, 3000);
    } else {
      toast.error("Invalid credentials");
      alert("Invalid credentials");
      setError(true);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <section className="container_login forms">
        <div className="form login">
          <div className="form-content">
            <div className="switch">
              <p
                className="dark_mode"
                onClick={toggleTheme}
                checked={theme === "dark"}
              ></p>
              <p
                className="light_mode"
                onClick={toggleTheme}
                checked={theme === "light"}
              ></p>
            </div>
            <header>Login</header>
            <form onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Username"
                  className="Input"
                  value={credentials.name}
                  onChange={onChange}
                  id="name"
                  name="name"
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={onChange}
                  name="password"
                  id="password"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div className="field button-field">
                <button type="submit">Login</button>
              </div>
              {error && <h5 className="invalid_error">Invalid Credentials</h5>}
            </form>

            <div className="form-link">
              <span className=" signup-link">
                Don't have an account?
                <Link to="/signup" className="dark_login">
                  Signup
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
