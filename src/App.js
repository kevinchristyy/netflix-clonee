import React, { useEffect } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Loginscreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<Homescreen />} />
            <Route exact path="/home" element={<Homescreen />} />
            <Route exact path="/profile" element={<Profilescreen />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
