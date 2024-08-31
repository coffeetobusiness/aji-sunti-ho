"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function loginpage() {
  const router = useRouter();

  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onlogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("login  success", response.data);
      router.push("/profile");
    } catch (error) {
      console.log("signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div  className=" w-full min-h-screen bg-zinc-100 text-black p-10 ">
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
          {loading ? "processing" : "login your account"}
        </h1>
        <div className=" grid  justify-center items-center  ">
          <div>
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
            <button
              onClick={onlogin}
              style={{ background: "#4F5376" }}
              className="p-1 mt-10 w-20 rounded-lg block text-white  ml-14 mb-7  PY-1"
            >
              {buttonDisabled ? "fill details" : "Login"}
            </button>
            <Link className=" text-zinc-600" href="/signup">
              visit signup page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
