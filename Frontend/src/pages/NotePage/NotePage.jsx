import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "../../components/Reviews/Reviews";
import Navbar from "../../components/Navbar/Navbar";
import "./notepage.css";
const NotePage = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams("");
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const res = await axios.get(`/notes/getoneproduct/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedData();
  }, [id, product]);
  return (
    <>
      <Navbar />
      <div className="complete_____note">
        <h3 className="complate_note"> Complete Note Below</h3>
        <div className="single_notepage" key={product._id}>
          <h3 className="single_note_page_title">
            <b>Title</b> {product.title}
          </h3>
          <p className="single_note_page_desc">
            <b>Description</b> : {product.description}
          </p>
          <h6>
            <b>Tags : {product.tag}</b>
          </h6>
          <div className="notepage_box">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQCNFXSFNTiczYWeUhmG5jfytm68rllNDogfP1UhOx84eV6kB7hmdNeIfF_MApO1aU34E&usqp=CAU"
              alt=""
              width="40px"
              height="40px"
              className="notepage_box"
            />
          </div>
        </div>
        <Reviews noteId={id} />
      </div>
    </>
  );
};

export default NotePage;
