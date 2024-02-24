import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from 'axios'
const apiLink = import.meta.env.VITE_API_LINK

const Chat = () => {
  const navigate = useNavigate()
  const Logout = () => {
    localStorage.removeItem("User")
    navigate("/login");
  }
  const currentUser = localStorage.getItem( "User" ) ? JSON.parse(localStorage.getItem('User')) : null;
  console.log(currentUser)
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async () => {
      try{
        await axios.get(apiLink + "/getAllUsers")
          .then((res) => {
            console.log(res.data)
            setUsers(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
      }catch(err){console.log(err)}
    }
    getUsers()
  }, [])


  return(
    <><div className="bg-slate-800 h-[100vh] pt-[10vh]">

      <div className="bg-slate-900 w-10/12 m-auto h-[80vh]">
        <div className="w-full border-b-2 border-white p-3 flex items-center justify-between">
        <h1 className="text-xl uppercase text-white">MB Media</h1>
        <div>
        <button className="text-white bg-red-700 p-2 rounded-full uppercase" onClick={Logout}>ODJAVA</button>
        </div>
        </div>
        <div className="h-[70%] scrollbar-thin scrollbar-track-slate-800 overflow-y-scroll w-1/4">
          {
            users ? 
            users.map((user) => {
              if(user._id !== currentUser?._id)
              return(
                <div className="w-10/12 bg-slate-800 text-white py-2 px-4  m-auto my-3 " key={user.username}>
                    <h1>{user.username}</h1>
                  </div>
                )
              }) : "Loading..."
            }
        </div>
          <div className="h-[30%] w-1/4 text-center text-white text-2xl uppercase p-5">
            <h1 className="w-10/12 bg-slate-800 text-white py-2 px-4  m-auto">{currentUser.username}</h1>
          </div>


    </div>
    </div> </>
  )
}
export default Chat;
