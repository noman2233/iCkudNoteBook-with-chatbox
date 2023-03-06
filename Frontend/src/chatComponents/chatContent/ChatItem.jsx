import React, { useContext, useEffect, useRef } from "react";
import "./chatContent.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ChatContext } from "../../context/authContext/ChatContext";
const ChatItem = ({ message }) => {
  const { firebaseUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message?.senderId === firebaseUser?.uid && "owner"
      }`}
    >
      <div className="messageInfo">
        <img
          src={
            message?.senderId === firebaseUser?.uid
              ? firebaseUser?.photoURL
              : data?.user?.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message?.text}</p>
        {message?.img && <img src={message?.img} alt="" />}
      </div>
    </div>
  );
};

export default ChatItem;
