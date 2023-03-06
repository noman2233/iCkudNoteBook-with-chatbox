import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../pages/signup/Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { ThemeContext } from "../../App";

const FirebaseSignUp = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [err, setErr] = useState(false);
  console.log(err)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res.email, res.password);
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            toast.success(
              "SignUp successful !. You are being redirected to Login page",
              {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              }
            );
            setTimeout(() => {
              navigate("/firebaselogin");
            }, 2000);
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
            toast.error(" Password length should be greater than 5", {
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
        });
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
      toast.error(" Password length should be greater than 6", {
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
            <header>Messenger Signup</header>
            <form onSubmit={handleSubmit}>
              <div className="field input-field">
                <input
                  type="text"
                  placeholder="Enter Name "
                  className="input"
                />
              </div>
              <div className="field input-field">
                <input
                  type="email"
                  placeholder="Enter Email "
                  className="input"
                />
              </div>

              <div className="field input-field">
                <input type="password" placeholder="Enter Password" />
                <i className="bx bx-hide eye-icon"></i>
              </div>
              <div className="field input-field">
                <p style={{ fontSize: "10px", padding: "10px 0px" }}>
                  Add an image
                </p>

                <input
                  style={{ border: "none", fontSize: "10px" }}
                  type="file"
                  id="file"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div
                className="field button-field"
                style={{ margin: "20px 0px" }}
              >
                <button disabled={loading}>Sign up</button>
                {loading &&
                  "Uploading and compressing the image please wait..."}
              </div>
            </form>

            <div className="form-link">
              <span className=" signup-link">
                Have an account ?
                <Link to="/firebaselogin" className="dark_login">
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

export default FirebaseSignUp;
