import React, { useContext, useEffect } from "react";
import { authContext } from "../App";
import axios from "axios";
const apiLink = import.meta.env.VITE_API_LINK;
import io from 'socket.io-client'

const socket = io.connect(apiLink)

const ChatContainer = () => {
  const currentUser = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : null;

  const { userReciver, setUserReciver, isUserSelected, setIsUserSelected } = useContext(authContext);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const addMessage = async (e) => {
    e.preventDefault();
    setMessages((prevMess) => [...prevMess, message]);
    await socket.emit('sendMessage', message)
    setMessage("");
    await axios
      .post(apiLink + "/addMessage", {
        reciver: userReciver._id,
        sender: currentUser._id,
        message,
      })
      .then((res) => {
        console.log("Message added: "), setMessages(res.data.allMessage);
      })
      .catch((err) => console.log("Error in adding the message : ", err));
  };
  const getMessage = async () => {
    await socket.on('getMessage', function (msg) {
      setMessages(msg)
      getMessage()
    });
  }
  useEffect(() => {
    const getMessage = async () => {
      await axios
        .get(apiLink + "/getMessage")
        .then((res) => {
          console.log("Message returned: ", res.data.allMessage);
          setMessages(res.data.allMessage);
        })
        .catch((err) => console.log("Error in adding the message : ", err));
    };
    getMessage();
  }, [userReciver]);
  
  return (
    <>
      <div className="w-11/12 m-auto bg-slate-800 relative h-[80%] mt-2 flex flex-col">
        <div className="text-white border-b-2 w-full flex items-center justify-between px-3 text-xl uppercase py-2">
          <h1>Chating with {userReciver.username}</h1>
          <p className="text-red-700" onClick={() => setIsUserSelected(false)}>
            X
          </p>
        </div>

        <div className="h-[90%] overflow-y-scroll pb-10 text-white px-4">
          {messages.length !== 0 ? (
            messages.map((mess) => {
              if (
                (mess.reciver === currentUser._id ||
                  mess.sender === currentUser._id) &&
                (mess.reciver === userReciver._id ||
                  mess.sender === userReciver._id)
              ) {
                if (mess.sender === currentUser._id)
                  return (
                    <h1 className="w-full text-right" key={mess.createdAt}>
                      {mess.message}
                    </h1>
                  );
                else
                  return (
                    <h1 className="w-full text-left" key={mess.createdAt}>
                      {mess.message}
                    </h1>
                  );
              }
            })
          ) : (
            <h1>Nemate poruka</h1>
          )}
        </div>

        <form
          onSubmit={(e) => addMessage(e)}
          className="w-full absolute bottom-0"
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-[90%] py-1 px-2"
            type="text"
            name="message"
            required
            placeholder="Message..."
          ></input>
          <button
            className="w-[10%] bg-sky-700 text-white uppercase font-semibold py-1"
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatContainer;
