import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../App";

const SignUp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Regular expression patterns
  // const usernamePattern = credentials.name.trim().length < 1;
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordPattern = credentials.password.trim().length < 1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://127.0.0.1:80/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    console.log(credentials.name, credentials.password);
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      toast.success("Account created! You are being redirected to Login page", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("Invalid credentials");
      alert("Invalid credentials");
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
            <header>Register</header>
            <form onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Enter Name "
                  className="input"
                  id="name"
                  name="name"
                  onChange={onChange}
                />
              </div>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Enter Email "
                  className="input"
                  id="email"
                  name="email"
                  onChange={onChange}
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  onChange={onChange}
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div className="field button-field">
                <button type="submit">Register</button>
              </div>
            </form>

            <div className="form-link">
              <span className=" signup-link">
                Have an account ?
                <Link to="/login" className="dark_login">
                  {" "}
                  Login
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
