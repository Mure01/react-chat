import React, { useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { authContext } from "../App";

const apiLink = import.meta.env.VITE_API_LINK
const Register = () => {
  const { setUserLogged } = useContext(authContext);

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      await axios
        .post(apiLink+"/register", userData)
        .then((response) => {
          console.log(response.data.msg);
          if (!response.data.status) {
            toast.error(response.data.msg, toastOption);
          } else {
            console.log(response.data.user);
            localStorage.setItem("User", JSON.stringify(response.data.user));
            setUserLogged((prevLogg) => localStorage.getItem("User"));
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    }
  };

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = userData;

    if (username.length < 4) {
      toast.error("Username should be grater than 3 characters", toastOption);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same", toastOption);
      return false;
    } else if (email.length < 8) {
      toast.error("Email should be grater than 8 characters", toastOption);
      return false;
    }
    return true;
  };

  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-800">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col px-20 py-10 w-1/3 rounded-3xl bg-slate-900 items-center top-1/2 left-1/2 -translate-x-1/2 fixed -translate-y-1/2	 "
      >
        <h1 className=" top-4 text-4xl text-white uppercase font-semibold">
          MB Media
        </h1>

        <input
          className="mt-10 p-2 rounded-md mb-4 bg-transparent text-white border-2 border-sky-900 w-full"
          required
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUserData({ ...userData, username: e.target.value });
          }}
        ></input>

        <input
          className=" p-2 rounded-md mb-4 bg-transparent text-white border-2 border-sky-900 w-full"
          type="email"
          required
          name="email"
          placeholder="email@example.com"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        ></input>

        <input
          className=" p-2 rounded-md mb-4 bg-transparent text-white border-2 border-sky-900 w-full"
          required
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        ></input>

        <input
          className=" p-2 rounded-md mb-4 bg-transparent text-white border-2 border-sky-900 w-full"
          type="password"
          required
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => {
            setUserData({ ...userData, confirmPassword: e.target.value });
          }}
        ></input>

        <button
          type="submit"
          className="bg-sky-700 text-white w-1/2 px-5 py-2 uppercase font-semibold my-3 rounded-full"
        >
          Register
        </button>
        <p className="text-white">Already have an account?
        <a className="pl-1 text-sky-900 uppercase font-semibold" href="/login"> Login</a>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
