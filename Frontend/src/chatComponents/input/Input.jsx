import React, { useContext, useState } from "react";
import "./input.css";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { AuthContext } from "../../context/authContext/AuthContext";
import { ChatContext } from "../../context/authContext/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { db, storage } from "../../Firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../chatContent/chatContent.css";
const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { firebaseUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: firebaseUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: firebaseUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", firebaseUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  return (
    <div className="sendNewMessage">
      <button className="addFiles">
        <i className="fa fa-plus"></i>
      </button>
      <input
        placeholder="Type message here"
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <label>
          <AttachFileIcon lassName="attach__icon" />
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
        </label>
      </div>
      <button className="btnSendMsg">
        <SendOutlinedIcon className="send_____icon" onClick={handleSend} />
      </button>
    </div>
  );
};

export default Input;
