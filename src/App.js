import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { currentUserContext, themeContext } from "./Context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import { fetchUser } from "./util/contextFuncs";

const App = () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };

  const [ theme, setTheme ] = useState(null);
  const themeValue = { theme, setTheme };

  useEffect(() => {
    // console.log("Effect fired!");
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
    fetchUser()
      .then((response) => {
        setCurrentUser(response.data);
      })
  }, []);

  return (
    <div className="container" data-theme={theme}>
      <currentUserContext.Provider value={value}>
        <themeContext.Provider value={themeValue}>
          <Header />
        </themeContext.Provider>
        <Outlet />
        <Footer />
      </currentUserContext.Provider>
    </div>
  )
};

export default App;
