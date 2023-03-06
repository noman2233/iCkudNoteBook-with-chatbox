import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noteContext from "../../context/notes/noteContext";
import AddNote from "../AddNote/AddNote";
import Noteitem from "../singleNote/Noteitem";
import "./Note.css";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    if (localStorage.getItem("access_token")) {
      getNotes();
      // eslint-disable-next-line
    } else {
      navigate("/login");
    }
  }, [getNotes, navigate]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  console.log(note);
  const updateNote = (currentNote) => {
    try {
      setNote({
        id: currentNote._id,
        etitle: currentNote.title,
        edescription: currentNote.description,
        etag: currentNote.tag,
      });
      toast.success("Note has been updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error("Note has not been updated", {
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
      <AddNote />
      <div className="note___note">
        <h4>{notes?.length === 0 && "Your added note will be shown here"}</h4>
        <div className="note_item_item"></div>
        {notes?.map((note) => {
          return (
            <Noteitem note={note} key={note._id} updateNote={updateNote} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
