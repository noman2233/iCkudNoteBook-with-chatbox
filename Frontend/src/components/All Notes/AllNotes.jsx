import React, { useEffect } from "react";
import { useState } from "react";
import "./allnotes.css";
import axios from "axios";
import { Link } from "react-router-dom";
const Noteitem = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const res = await axios.get("/notes/random");
        setData(res.data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="note_card_main">
      {data.map((note) => {
        return (
          <>
            <div className="note_card" key={note._id}>
              <div>
                <div className="note_card_title">
                  <b>Title</b> : {note?.title?.slice(0, 63)}......
                </div>
                <div className="note_card_desc">
                  <b>Description</b> :{note?.description?.slice(0, 100)}.....
                </div>
                <div className="note_card_tag">
                  <h5>
                    <b>Tags</b> :{note.tag}
                  </h5>
                </div>

                <div className="iconBx">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
              </div>

              <Link to={`notepage/${note._id}`}>
                <div className="read_all">
                  <h4>Complete Note Here</h4>
                </div>
              </Link>
              <div className="public_public">
                <h4>Publiic</h4>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Noteitem;
