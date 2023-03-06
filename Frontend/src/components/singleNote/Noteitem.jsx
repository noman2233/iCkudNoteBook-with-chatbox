import React, { useContext } from "react";
import noteContext from "../../context/notes/noteContext";
import "./note.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Noteitem = (props) => {
  console.log(props)
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  console.log(note)
  const deleteHandler = (e) => {
    e.preventDefault();
    deleteNote(note._id);
    toast.success("Note has been deleted Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="single_note_card_main" key={props.note._id}>
      <div className="single_note_card">
        <h4 className="single_note_card_title">Title : {props.note.title}</h4>
        <p className="single_note_card_desc">
          Description : {props.note.description}
        </p>

        <h5 className="single_note_card_tag">Tags :{props.note.tag}</h5>

        <div className="iconBx">
          <ion-icon name="eye-outline"></ion-icon>
        </div>
        <div className="single_read_all">
          <h4>Your Note</h4>
        </div>
        <div className="single_public_public">
          <h4>Public</h4>
        </div>
        <div className="buttons_two">
          <Link to={`/edit/${props.note._id}`}>
            <button
              type="submit"
              className="edit_button"
              onClick={() => {
                updateNote(note);
              }}
            >
              Edit
            </button>
          </Link>

          <button
            type="submit"
            className="delete_button"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
