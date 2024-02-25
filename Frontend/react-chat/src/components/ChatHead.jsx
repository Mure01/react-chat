import React from "react";
import { useNavigate } from "react-router";
const ChatHead = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("User");
    navigate("/login");
  };
  return (
    <>
      <div className="w-full h-[10%] border-b-2 border-white p-3 flex items-center justify-between">
        <h1 className="text-xl uppercase text-white">MB Media</h1>
        <button
          className="text-white bg-red-700 p-2 rounded-full uppercase"
          onClick={Logout}
        >
          ODJAVA
        </button>
      </div>
    </>
  );
};

export default ChatHead;
