"use client";

import axios from "axios";

import Head from "next/head";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const TimeManagementPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null); 
  const [savedNotes, setSavedNotes] = useState([]); //
  const gettopics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users/list", {
        Cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("faild to fetch todo list");
      }
      return res.json();
    } catch (error) {
      console.log("Erorr loading", error);
    }
  };
  //List of notes
  // let id = sessionStorage.getItem("id");

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     if (id) {
  //       const response = await axios.get(`/api/users/gettask/${id}`);
  //       setNote(response.data.list);
  //     }
  //   };
  //   fetchNotes();
  // }, [id]);

  useEffect(() => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
      mic.onstart = () => {
        console.log("Mics on");
      };

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
      };

      mic.onerror = (event) => {
        console.log(event.error);
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
  }, [isListening]);

  const handleSaveNote = async () => {
    setSavedNotes([...savedNotes, note]);
    // gettopics();
    try {
      const response = await axios.post("/api/users/list", {
        body: note,
        // id: id ?? "uncategoried", // list ID
      });
      console.log(response);
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save note");
    }
    setNote("");
  };

  const categories = [
    { icon: "💼", label: "Work", color: "text-blue-500" },
    { icon: "👤", label: "Personal", color: "text-purple-500" },
    { icon: "🛍️", label: "Shopping", color: "text-green-500" },
    { icon: "❤️", label: "Health", color: "text-red-500" },
  ];

  const navItems = [
    { icon: "🏠", label: "Home" },
    { icon: "🔍", label: "Explore" },
    { icon: "💼", label: "Work" },
    { icon: "👤", label: "Profile" },
  ];

  return (
    <>
      <Head>
        <title>Time Management App</title>
        <meta name="description" content="Manage your time effectively" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-100 min-h-screen">
        <div className="max-w-md mx-auto pt-8 px-4 pb-20">
          <div className="bg-blue-200 rounded-xl p-4 mb-6 flex items-center">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-800">
                Manage your time well
              </h2>
            </div>
            <span className="text-2xl">⏰</span>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Categories
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-white flex items-center justify-center ${category.color} text-2xl`}
                  >
                    {category.icon}
                  </div>
                  <span className="text-xs mt-1 text-gray-600">
                    {category.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-200 rounded-xl p-4 flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white text-2xl">
              <button onClick={() => setIsListening((prevState) => !prevState)}>
                {isListening ? (
                  <div className="flex justify-center items-center h-screen">
                    <div className="relative inline-flex">
                      <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                      <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  "🎙️"
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            "Say, Aji Sunte Ho"
          </p>
          <p className="mt-10 text-center">
            {note}{" "}
            <button
              className="bg-blue-300 hover:bg-blue-400 text-gray-800  py-2 font-semibold px-4 rounded-full"
              onClick={handleSaveNote}
              disabled={!note}
            >
              Save Todo
            </button>
          </p>
          <div className="box mt-4 text-center">
            <h1 className="flex items-center pt-5 pl-32 text-4xl text-gray-800">
              your
              <span className="bg-blue-100 text-gray-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-blue-200 ms-2">
                todos
              </span>
            </h1>

            {savedNotes.map((n, index) => (
              <li key={index}>{n}</li>
            ))}
          </div>
        </div>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="flex justify-around py-2 max-w-md mx-auto">
            {navItems.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`p-2 text-2xl ${
                    index === 2 ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-xs ${
                    index === 2 ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </nav>
      </main>
    </>
  );
};

export default TimeManagementPage;
