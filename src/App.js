import React, { useEffect } from "react";
import "./App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Profilescreen from "./screens/Profilescreen";
import Homescreen from "./screens/Homescreen";
import Loginscreen from "./screens/Loginscreen";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        // Logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return <div className="App">{!user ? <Loginscreen /> : <Profilescreen /> /*<Homescreen />*/}</div>;
}

export default App;
