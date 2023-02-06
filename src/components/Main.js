import React, { useState, useEffect } from "react";
import {
 RiSearch2Line,
 RiSunLine,
 RiMoonLine,
 RiHeart3Line,
 RiMenu3Line,
 RiDeleteBin7Line,
} from "react-icons/ri";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Main = ({ menu, setMenu, note, setNote, lightTheme, setlightTheme }) => {
 const [noteid, setNoteid] = useState(false);
 const [emoji, setEmoji] = useState(false);
 const [Serach, setSerach] = useState("");
 useEffect(() => {
  if (emoji) {
   document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
     setEmoji(false);
     console.log(true);
    }
   });
  }
 }, [emoji]);

 const toggleTheme = () => {
  setlightTheme(!lightTheme);
  if (localStorage.getItem("color-theme")) {
   if (localStorage.getItem("color-theme") === "light") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
   } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
   }

   // if NOT set via local storage previously
  } else {
   if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
   } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
   }
  }
 };
 return (
  <main className="lg:w-[calc(100%_-_130px)] relative min-h-screen lg:left-28 py-10 px-8">
   <section className="pb-5">
    <form>
     <div className="relative">
      <RiSearch2Line
       size={24}
       className="absolute top-4 left-1.5 text-gray-400"
      />
      <input
       type="text"
       placeholder="Search"
       onChange={(e) => setSerach(e.target.value)}
       className="py-4 border-none focus:ring-0 px-8 w-full rounded-xl dark:bg-slate-800 dark:text-slate-300"
      />
     </div>
    </form>
   </section>
   <header className="flex items-end justify-between mb-10">
    <h1 className="text-4xl font-semibold dark:text-slate-300">Notes</h1>
    <div className="flex items-center">
     <span>
      <RiSunLine size={21} className={!lightTheme ? "text-gray-400" : ""} />
     </span>

     <div
      className={`w-14 h-7 flex items-center  rounded-full transition ease-in-out  mx-3 px-1 ${
       lightTheme ? "bg-gray-300" : "bg-blue-600"
      } `}
      onClick={toggleTheme}
     >
      <div
       className={`bg-white w-5 h-5 rounded-full shadow-md transition ease-in-out  ${
        lightTheme ? "translate-x-0" : "translate-x-7"
       } `}
      ></div>
     </div>

     <span>
      <RiMoonLine
       size={22}
       className={lightTheme ? "text-gray-400" : "dark:text-slate-300"}
      />
     </span>
    </div>
    <button
     className="lg:hidden dark:text-slate-300"
     onClick={() => setMenu(!menu)}
    >
     <RiMenu3Line size={24} />
    </button>
   </header>
   <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
    {note
     .filter((value) => {
      if (Serach === "") {
       return value;
      } else if (value.text.toLowerCase().includes(Serach.toLowerCase())) {
       return value;
      }
     })
     .map((element) => {
      return (
       <div className={element.theme} key={element.id}>
        <form className="w-full ">
         <textarea
          placeholder="Write a note..."
          value={element.text}
          onChange={(e) => {
           setNote(
            note.map((item) => {
             if (item.id === element.id) {
              return { ...item, text: e.target.value };
             }
             return item;
            })
           );
          }}
          className="leading-relaxed resize-none h-48 w-full p-2.5 shadow-none border-none rounded-2xl focus:ring-transparent  mb-7"
         ></textarea>
        </form>
        <div className="flex items-center justify-between">
         <small>{element.date}</small>
         <div className="flex items-end gap-1">
          <button
           className="outline-none"
           onClick={() => {
            setNoteid(element.id);
            setEmoji(true);
           }}
          >
           <RiHeart3Line size={21} />
          </button>
          <button
           className="outline-none"
           onClick={() => {
            setNote(note.filter((el) => el.id !== element.id));
           }}
          >
           <RiDeleteBin7Line size={20.5} />
          </button>
         </div>
         {emoji && element.id === noteid && (
          <div className="z-20 absolute translate-y-56 pb-4">
           <Picker
            perLine={10}
            showPreview={false}
            showSkinTones={true}
            theme={lightTheme ? "light" : "dark"}
            native={true}
            emojiSize={17}
            color={"#6366f1"}
            enableFrequentEmojiSort={false}
            onSelect={(emoji) => {
             setNote(
              note.map((item) => {
               if (item.id === element.id) {
                return { ...item, text: (item.text += emoji.native) };
               }
               return item;
              })
             );
            }}
           />
          </div>
         )}
        </div>
       </div>
      );
     })}
   </section>
  </main>
 );
};

export default Main;
