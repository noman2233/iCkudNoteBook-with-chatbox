import React, {
  useState,
  useEffect,
  useContext,
} from "react";
import { doc, onSnapshot } from "firebase/firestore";
import "./chatContent.css";
import ChatItem from "./ChatItem";
import Sidebar from "../sidebar/Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import Input from "../input/Input";
import { ChatContext } from "../../context/authContext/ChatContext";
import { signOut } from "firebase/auth";
import { auth, db } from "../../Firebase";


const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="main__chatcontent">
        <div className="enjoy_chats_logo">
          <div className="sidebar_sidebar">
            {isOpen && (
              <MenuIcon
                onClick={() => setOpenSidebar(!openSidebar)}
                className="menu_item"
              />
            )}
            {openSidebar && <Sidebar />}
          </div>
          <div className="logo_chats_friends">
            <img src="./messenger.png" width="40px" height="40px" alt="" />
            <h5>Enjoy Chats with friends</h5>
            <button className="logout_fire" onClick={() => signOut(auth)}>
              Logout
            </button>
          </div>
        </div>
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <p>{data.user?.displayName}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="content__body">
            {messages.map((m) => (
              <ChatItem message={m} key={m.id} />
            ))}
          </div>
        </div>

        <div className="content__footer">
          <Input />
        </div>
      </div>
    </>
  );
};

export default ChatContent;
