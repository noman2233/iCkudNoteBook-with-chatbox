import React from "react";
import AllNotes from "../../components/All Notes/AllNotes";
import Customers from "../../components/Customers/Customers";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Testimonials from "../../components/Testimonials/Testimonials";
import "./mainPage.css";
const MainPage = () => {
  return (
    <div className="change____mode">
      <Navbar />
      <h2 className="all_notes_notes">
        All Public Notes of different users are here
      </h2>
      <div className="main_note__note">
        <AllNotes />
      </div>
      <Testimonials />
      <Customers />
      <Footer />
    </div>
  );
};

export default MainPage;
