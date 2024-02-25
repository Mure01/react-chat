import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { authContext } from "../App";
const apiLink = import.meta.env.VITE_API_LINK;

const AllContacts = () => {
  const currentUser = localStorage.getItem("User")
    ? JSON.parse(localStorage.getItem("User"))
    : null;
  const [users, setUsers] = useState([]);
  const { userReciver, setUserReciver, isUserSelected, setIsUserSelected } =
    useContext(authContext);

  useEffect(() => {
    const getUsers = async () => {
      try {
        await axios
          .get(apiLink + "/getAllUsers")
          .then((res) => {
            setUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  const startChat = (user) => {
    console.log(user);
    setIsUserSelected(true);
    setUserReciver({ ...user });
  };

  return (
    <>
      <div className="h-[70%] w-full scrollbar-thin scrollbar-track-slate-800 overflow-y-scroll ">
        {users
          ? users.map((user) => {
              if (user._id !== currentUser?._id)
                return (
                  <div
                    onClick={() => startChat(user)}
                    className="w-10/12 bg-slate-800 text-white py-2 px-4  m-auto my-3 "
                    key={user.username}
                  >
                    <h1>{user.username}</h1>
                  </div>
                );
            })
          : "Loading..."}
      </div>
      <div className="h-[30%] w-full text-center text-white text-2xl uppercase p-5">
        <h1 className="w-10/12 bg-slate-800 text-white py-2 px-4  m-auto">
          {currentUser.username}
        </h1>
      </div>
    </>
  );
};

export default AllContacts;
