import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
const apiLink = import.meta.env.VITE_API_LINK;
import AllContacts from './AllContacts'

const Chat = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };
  const currentUser = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : null;


  return (
    <>
      <div className="bg-slate-800 h-[100vh] pt-[10vh]">
        <div className="bg-slate-900 w-10/12 m-auto h-[80vh]">
          <div className="w-full border-b-2 border-white p-3 flex items-center justify-between">
            <h1 className="text-xl uppercase text-white">MB Media</h1>
              <button
                className="text-white bg-red-700 p-2 rounded-full uppercase"
                onClick={Logout}
              >
                ODJAVA
              </button>
          </div>

        <div className="flex w-full">
          <div className="w-1/4 h-full"> <AllContacts/></div>

          <div className="w-9/12 items-center flex  flex-col">
            <img src="./robot.gif" className="bg-transparent h-[300px] bg-blend-lighten "></img>
            <h1 className="text-white text-3xl">Welcome <span className="text-sky-800">{currentUser.username}</span></h1>
            <p className="text-white text-xl pt-2">Please select a chat to start messaging</p>
          </div>


        </div>



        </div>
      </div>
    </>
  );
};
export default Chat;
