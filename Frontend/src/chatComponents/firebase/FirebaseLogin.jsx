import React, { useContext, useState } from "react";
import "../../pages/login/Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";

import { ThemeContext } from "../../App";

const FirebaseLogin = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success(
        "Login successful!. You are being redirected to Message page",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      setTimeout(() => {
        navigate("/message");
      }, 3000);
    } catch (err) {
      setErr(true);
      toast.error("Invalid Credentials", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
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
                  placeholder="Email address Please"
                  className="Input"
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Password"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div className="field button-field">
                <button type="submit">Messenger Login</button>
              </div>
              {err && (
                <span style={{ color: "red" }}>Something went wrong</span>
              )}
            </form>

            <div className="form-link">
              <span className=" signup-link">
                Don't have an account?
                <Link to="/firebasesignup" className="dark_login">
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

export default FirebaseLogin;
