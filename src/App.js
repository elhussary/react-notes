import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
 const [menu, setMenu] = useState(false);
 const [note, setNote] = useState([]);
 const [lightTheme, setlightTheme] = useState(true);
 useEffect(() => {
  if (
   localStorage.getItem("color-theme") === "dark" ||
   (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
   document.documentElement.classList.add("dark");
   setlightTheme(false);
  } else {
   setlightTheme(true);
   document.documentElement.classList.remove("dark");
  }
 }, []);
 return (
  <>
   <Sidebar menu={menu} note={note} setNote={setNote} />
   <Main
    menu={menu}
    setMenu={setMenu}
    note={note}
    setNote={setNote}
    lightTheme={lightTheme}
    setlightTheme={setlightTheme}
   />
  </>
 );
}

export default App;
