"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function signuppage() {
  const router = useRouter();

  const [user, setuser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className=" w-full min-h-screen bg-zinc-100 text-black p-10 ">
      <div
        className="rounded-full"
        style={{
          position: "absolute",
          width: "488px",
          height: "488px",
          left: "calc(50% - 488px/2 - 0.5px)",
          top: "-285px",

          background:
            "linear-gradient(180deg, #FFFFFF 43.21%, #4F5376 102.46%)",
        }}
      ></div>
      <div className=" mt-60  reletive  text-center ">
        <h1
          style={{
            marginBottom: "0cap",
            margin: "20px",
            fontWeight: "1000",
            color: "#4F5376",
          }}
        >
          create account
        </h1>
        <div className=" grid  justify-center items-center  ">
          <div>
            <input
              className='class="px-3 py-2 mt-2 block outline-none bg-transparent border-solid border-4 border-zinc-300 rounded-lg text-center'
              id="username"
              value={user.username}
              onChange={(e) => setuser({ ...user, username: e.target.value })}
              placeholder="username"
              type="text"
            />
            <input
              className='class="px-3 py-2 mt-2 block  outline-none bg-transparent border-solid border-4 border-zinc-300 rounded-lg text-center'
              id="username"
              value={user.email}
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              placeholder="email"
              type="email"
            />
            <input
              className='class="px-3 py-2 mt-2 block outline-none bg-transparent border-solid border-4 border-zinc-300 rounded-lg text-center'
              id="username"
              value={user.password}
              onChange={(e) => setuser({ ...user, password: e.target.value })}
              placeholder="password"
              type="password"
            />
            <button onClick={onSignup}
              style={{ background: "#4F5376" }}
              className="p-1 mt-10 w-20 rounded-lg block text-white  ml-14 mb-7  PY-1"
            >
              {buttonDisabled ? "fill form" : "signup"}
            </button>
            <Link className=" text-zinc-600" href="/login">visit login page</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
