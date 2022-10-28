import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { currentUserContext } from "./currentUserContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { fetchUser } from "./util/contextFuncs";

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser }

  useEffect(() => {
    // console.log("Effect fired!");
    fetchUser()
      .then((response) => {
        setCurrentUser(response.data);
      })
  }, []);

  return (
    <div className="container">
      <currentUserContext.Provider value={value}>
        <Header />
        <Outlet />
        <Footer />
      </currentUserContext.Provider>
    </div>
  )
};

export default App;
