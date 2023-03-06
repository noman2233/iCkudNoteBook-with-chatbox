import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import noteContext from "../../context/notes/noteContext";

const EditNote = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  console.log(notes);
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const [title, setTitle] = useState("");
  const [desccription, setDesccription] = useState("");
  const [tag, setTag] = useState("");
  const [product, setProduct] = useState([]);
  const { id } = useParams("");
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await axios.get(`/notes/findnote/${id}`);
        setProduct(res.data);
        setTitle(res.data.title);
        setTag(res.data.tag);
        setDesccription(res.data.description);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/notes/update/${product._id}`, {
        title,
        desccription,
        tag,
      });
      setDesccription("");
      setTag("");
      setTitle("");
      toast.success("Note has been updated Successfully. Back to notes page", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/mynotes");
      }, 1500);
    } catch (err) {
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
    <section className="container_login forms">
      <div className="form login">
        <div className="form-content">
          <header>Edit Note</header>
          <div action="/">
            <div className="note-form   form_tags">
              <label htmlFor="">Title</label>
              <input
                type="text"
                placeholder="Enter Title "
                className="input form__input"
                id="etitle"
                name="etitle"
                value={title}
                aria-describedby="emailHelp"
                onChange={(e) => setTitle(e.target.value)}
                minLength={5}
                required
              />
            </div>

            <div className="note-form   form_tags">
              <label htmlFor="">Tags</label>

              <input
                type="text"
                placeholder="Enter Tags"
                className="password form__input"
                id="etag"
                name="etag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="note-form input-field">
              <label htmlFor="">Description</label>

              <textarea
                id="edescription"
                name="edescription"
                value={desccription}
                onChange={(e) => setDesccription(e.target.value)}
                minLength={5}
                required
                cols="60"
                rows="5"
                className="description form__input_textarea"
              ></textarea>
            </div>

            <div className="field button-field">
              <button onClick={handleUpdate}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditNote;
