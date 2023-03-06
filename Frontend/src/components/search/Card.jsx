import React from "react";
import { Link } from "react-router-dom";
import "../../components/All Notes/allnotes.css";
const Card = ({ note }) => {
  return (
    <div className="single_note_card_main">
      <div className="note_card">
        <div>
          <div className="note_card_title" key={note._id}>
            <b>Title</b> : {note?.title?.slice(0, 63)}......
          </div>
          <div className="note_card_desc">
            <b>Description</b> :{note?.description?.slice(0, 300)}.....
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

        <Link to={`/notepage/${note._id}`}>
          <div className="read_all">
            <h4>Complete Note Here</h4>
          </div>
        </Link>
        <div className="public_public">
          <h4>Publiic</h4>
        </div>
      </div>
    </div>
  );
};

export default Card;
