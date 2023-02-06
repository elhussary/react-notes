import React, { useState, useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";
const Sidebar = ({ menu, note, setNote }) => {
 const [colors, setColors] = useState(false);
 const [rotate, setRotate] = useState(false);
 const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
   opacity: 1,
   scale: 1,
   transition: {
    delayChildren: 0.3,
    staggerChildren: 0.2,
   },
  },
 };

 const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
   y: 0,
   opacity: 1,
  },
 };
 // LOAD NOTES IF ComponentDidMount
 useEffect(() => {
  if (localStorage.getItem("notes") === null) {
   localStorage.setItem("notes", JSON.stringify([]));
  } else {
   let loadNotes = JSON.parse(localStorage.getItem("notes"));
   setNote(loadNotes);
  }
 }, []);

 // SAVE NEW NOTES TO localStorage
 useEffect(() => {
  if (note.length > 0) {
   localStorage.setItem("notes", JSON.stringify(note));
  }
 }, [note]);

 const SaveANote = (e) => {
  const date = new Date();
  setNote([
   ...note,
   {
    text: "",
    id: Math.floor(Math.random() * 100000 + 1),
    theme: e.target.getAttribute("theme"),
    date: moment().format("LL"),
   },
  ]);
 };
 return (
  <div
   className={
    menu
     ? "fixed top-0 left-0 bg-white dark:bg-slate-900 shadow-md dark:border-r dark:border-slate-700 w-20 h-full p-6 translate-x-0 transition ease-in-out duration-500 z-40 lg:transition-none"
     : "fixed top-0 left-0 bg-white dark:bg-slate-900 dark:border-r dark:border-slate-700 shadow-md w-20 h-full p-6 lg:translate-x-0 -translate-x-full transition lg:transition-none ease-in-out duration-500 z-40"
   }
  >
   <header className="mx-auto font-semibold text-center pb-10 dark:text-slate-200">
    <h1>Logo</h1>
   </header>
   <motion.div
    animate={{ rotate: rotate ? 180 : 0 }}
    className="mb-10 flex justify-center"
   >
    <button
     className="bg-white dark:bg-slate-900 dark:border-slate-600 dark:text-slate-300 shadow-sm rounded-full py-2 px-2 border border-gray-100 flex justify-center items-center"
     onClick={() => {
      setColors(!colors);
      setRotate(!rotate);
     }}
    >
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       d={colors ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
      />
     </svg>
    </button>
   </motion.div>

   {/* Colors */}
   <section className="flex justify-center">
    <motion.div
     variants={container}
     initial="hidden"
     animate={colors ? "visible" : ""}
    >
     <motion.span
      className="bg-white border-gray-200 border py-2.5 px-2.5 block rounded-full w-5 h-5 mb-6 cursor-pointer"
      variants={item}
      theme={"white"}
      onClick={SaveANote}
     ></motion.span>

     <motion.span
      className="bg-indigo-500 block rounded-full w-5 h-5 mb-6 cursor-pointer"
      variants={item}
      theme={"indigo"}
      onClick={SaveANote}
     ></motion.span>

     <motion.span
      className="bg-yellow-400 block rounded-full w-5 h-5 mb-6 cursor-pointer"
      variants={item}
      theme={"yellow"}
      onClick={SaveANote}
     ></motion.span>

     <motion.span
      className="bg-orange-400 block rounded-full w-5 h-5 mb-6 cursor-pointer"
      variants={item}
      theme={"orange"}
      onClick={SaveANote}
     ></motion.span>

     <motion.span
      className="bg-blue-500 block rounded-full w-5 h-5 mb-6 cursor-pointer"
      variants={item}
      theme={"blue"}
      onClick={SaveANote}
     ></motion.span>
    </motion.div>
   </section>
  </div>
 );
};
export default Sidebar;
