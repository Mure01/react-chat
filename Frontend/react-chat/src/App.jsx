import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import React, { createContext, useContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const authContext = createContext();
function App() {
  const [userLogged, setUserLogged] = useState(localStorage.getItem("User"));
  const [userReciver, setUserReciver] = useState("");
  const [isUserSelected, setIsUserSelected] = useState(false);

  useEffect(() => {
    setUserLogged(localStorage.getItem("User"));
  }, []);

  const router = createBrowserRouter([
    { path: "/", element: userLogged ? <Chat /> : <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return (
    <>
      <authContext.Provider
        value={{
          setUserLogged,
          userReciver,
          setUserReciver,
          isUserSelected,
          setIsUserSelected,
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </authContext.Provider>
    </>
  );
}

export default App;
