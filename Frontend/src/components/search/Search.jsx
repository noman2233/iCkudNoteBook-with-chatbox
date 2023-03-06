import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Card from "./Card";
import "./card.css";
const Search = () => {
  const [notes, setNotes] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/notes/search${query}`);
      setNotes(res.data);
    };
    fetchVideos();
  }, [query]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="search________note">
        <h1>{notes.length === 0 && "No item with this search result found"}</h1>
        {notes.map((note) => (
          <Card key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Search;
