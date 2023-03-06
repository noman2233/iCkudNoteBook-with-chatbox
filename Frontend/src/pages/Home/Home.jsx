import React from "react";
import Notes from "../../components/Notes/Notes";
import Navbar from "../../components/Navbar/Navbar";
import "./home.css";
import Footer from "../../components/footer/Footer";
const MainPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="main_note__note">
        <Notes />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
