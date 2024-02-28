import React, { useContext, useEffect, useRef } from "react";
import { authContext } from "../App";
import axios from "axios";
const apiLink = import.meta.env.VITE_API_LINK;
import io from "socket.io-client";

const socket = io.connect(apiLink);

const ChatContainer = () => {
  const currentUser = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : null;

  const { userReciver, setUserReciver, isUserSelected, setIsUserSelected } =
    useContext(authContext);
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const addMessage = async (e) => {
    e.preventDefault();
    await axios
      .post(apiLink + "/addMessage", {
        reciver: userReciver._id,
        sender: currentUser._id,
        message,
      })
      .then((res) => {
        socket.emit("sendMessage", message);
        console.log("Message added: "), setMessages(res.data.allMessage);
        scrollChat();
        setMessage("");
      })
      .catch((err) => console.log("Error in adding the message : ", err));
  };
  socket.on("getMessage", function (msg) {
  setMessages(msg);
    scrollChat()
  });
  useEffect(() => {
    const getMessage = async () => {
      await axios
        .get(apiLink + "/getMessage")
        .then((res) => {
          console.log("Message returned: ", res.data.allMessage);
          setMessages(res.data.allMessage);
          scrollChat()

        })
        .catch((err) => console.log("Error in adding the message : ", err));
    };
    getMessage()
  }, [userReciver]);
  const myDivRef = useRef(null);

  function scrollChat() {
    var chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
}

  return (
    <>
      <div className="w-11/12 m-auto bg-slate-800 relative h-[80%] mt-2 flex flex-col">
        <div className="text-white border-b-2 w-full flex items-center justify-between px-3 text-xl uppercase py-2">
          <h1>Chating with {userReciver.username}</h1>
          <p className="text-red-700" onClick={() => setIsUserSelected(false)}>
            X
          </p>
        </div>

        <div ref={myDivRef} id="chatBox" className="h-[90%] overflow-y-scroll pb-20 text-white px-4">
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
                <div key={mess.createdAt} className="flex flex-col items-end my-2" >
                  <div className="bg-sky-800 px-4 py-1 rounded-xl">
                    <h1 className="w-full text-right" >
                      {mess.message}
                    </h1>
                    <p className="text-xs font-semibold border-t-2 uppercase mt-1"> {currentUser.username} {new Date(mess.createdAt).getHours() < 10 ? '0'+new Date(mess.createdAt).getHours() : new Date(mess.createdAt).getHours()} 
                    : {new Date(mess.createdAt).getMinutes() <10 ? '0'+new Date(mess.createdAt).getMinutes() : new Date(mess.createdAt).getMinutes()}</p>
                    </div>
                  </div>
                  );
                else
                  return (
                    <div key={mess.createdAt} className="flex flex-col items-start my-2" >
                    <div className="bg-green-800 px-4 py-1 rounded-xl">
                      <h1 className="w-full text-right" >
                        {mess.message}
                      </h1>
                      <p className="text-xs font-semibold border-t-2 uppercase mt-1"> {userReciver.username} {new Date(mess.createdAt).getHours() < 10 ? '0'+new Date(mess.createdAt).getHours() : new Date(mess.createdAt).getHours()} 
                      : {new Date(mess.createdAt).getMinutes() <10 ? '0'+new Date(mess.createdAt).getMinutes() : new Date(mess.createdAt).getMinutes()}</p>
                      </div>
                    </div>
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
