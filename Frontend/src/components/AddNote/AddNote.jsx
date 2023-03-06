import React, { useContext, useState } from "react";
import noteContext from "../../context/notes/noteContext";
import "./AddNote.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddNote = () => {
  const token=localStorage.getItem("access_token")
  console.log(token)
  const context = useContext(noteContext);
  const { addNote } = context;
  const navigate=useNavigate();

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    try {
      if (note.title.length < 5) {
        toast.error("Title length must be greater than Five", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (note.description.length < 5) {
        toast.error("Description length must be greater than Five", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!token){
        toast.error("Please login to add note", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login")
      }
      else{
        addNote(note.title, note.description, note.tag);
        toast.success("New Note has been added Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setNote({ title: "", description: "", tag: "" });
      }
    } catch (error) {
      toast.error(" Note has not been added ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
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
            <header>Add a Note</header>
            <form action="/">
              <div className="note-form   form_tags">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={note.title}
                  onChange={onChange}
                  minLength={5}
                  required
                  className="password form__input"
                />
              </div>

              <div className="note-form   form_tags">
                <label htmlFor="">Tags</label>

                <input
                  type="text"
                  placeholder="Enter Tags"
                  className="password form__input"
                  id="tag"
                  name="tag"
                  value={note.tag}
                  onChange={onChange}
                  minLength={5}
                  required
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div className="note-form input-field">
                <label htmlFor="">Description</label>

                <textarea
                  id="description"
                  name="description"
                  value={note.description}
                  onChange={onChange}
                  minLength={5}
                  required
                  cols="60"
                  rows="5"
                  className="description form__input_textarea"
                ></textarea>
              </div>

              <div className="field button-field">
                <button onClick={handleClick}>Add Note</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddNote;
