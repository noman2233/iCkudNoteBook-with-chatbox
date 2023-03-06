import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "react-toastify/dist/ReactToastify.css";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../../App";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  console.log(isOpen);
  const Logout = () => {
    localStorage.removeItem("access_token")
    navigate("/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="right_nav">
          <div className="logo_mode">
            <div className="logo">
              <Link to="/">
                <img
                  src="https://play-lh.googleusercontent.com/yJDIE7ZQfRg0kulmphl3MSMWWC6LaYMQn8zgJbE48FSrdk4SBzuKMiikXWp6p4B8AsQ"
                  width="50px"
                  alt=""
                  className="logo_____logo"
                />
              </Link>
            </div>
            <div className="mode">
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
            </div>
          </div>
          <nav className="pages">
            <ul></ul>
            <ul>
              <Link to="/mynotes">
                <li>Your Notes</li>
              </Link>
              <li>
                <div className="searchbar">
                  <input
                    type="text"
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search here"
                    className="search_input_search"
                  />
                  <SearchIcon onClick={() => navigate(`/search?q=${q}`)} />
                </div>
              </li>
              <li>
                <Link to="/message">
                  <img
                    src="https://www.clipartmax.com/png/small/463-4631742_facebook-messenger-for-business-facebook-messenger-logo.png"
                    width="50px"
                    alt=""
                    className="logo_____logo"
                  />
                </Link>
              </li>
              <li>
                <img src="./google.webp" width="0px" alt="" />
              </li>

              {!localStorage.getItem("access_token") && (
                <>
                  <li>
                    <Link to="/login">
                      <button type="submit" className="login_button">
                        Login
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button type="submit" className="login_button">
                        SignUp
                      </button>
                    </Link>
                  </li>
                </>
              )}

              {localStorage.getItem("access_token") && (
                <>
                  <li>
                    <button
                      type="submit"
                      onClick={Logout}
                      className="login_button"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
