import { useContext, useEffect, useState } from "react";
import "./chatList.css";
import { doc, onSnapshot } from "firebase/firestore";
import Search from "./Search";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ChatContext } from "../../context/authContext/ChatContext";
import { db } from "../../Firebase";


const ChatList = () => {
  const [chats, setChats] = useState([]);

  const { firebaseUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, "userChats", firebaseUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsub();
      };
    };

    firebaseUser.uid && getChats();
  }, [firebaseUser.uid]);
  console.log(chats);
  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="main__chatlist noman">
      <div className="name_photo">
        <img
          src={firebaseUser.photoURL}
          alt=""
          className="yaur____photo"
        />
        <hp>{firebaseUser.displayName}</hp>
      </div>
      <div className="chatlist__heading">
        <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button>
      </div>
      <Search />
      <div className="margin_top">
        <small> Friends List</small>
        <div className="chatlist__items">
          {Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="chat_item"
                key={chat[0]}
                onClick={() => handleSelect(chat[1]?.userInfo)}
              >
                <img
                  src={chat[1]?.userInfo?.photoURL}
                  alt=""
                  className="user______image"
                />
                <div className="userMeta">
                  <span className="name__name">
                    {chat[1]?.userInfo?.displayName}
                  </span>
                  <p className="activeTime lastMessege">
                    {chat[1]?.lastMessage?.text.slice(0,12)}..
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
