import React from "react";
import ChatBody from "../../chatComponents/chatBody/ChatBody";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
const Messenger = () => {
  return (
    <div>
      <Navbar/>
      <ChatBody />
      <Footer/>
    </div>
  );
};

export default Messenger;
