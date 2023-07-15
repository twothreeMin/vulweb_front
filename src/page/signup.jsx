import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 서버에 회원 가입 요청을 보냅니다.
      const response = await axios.post(
        "http://localhost:8080/api/member/signup",
        form
      );
      if (response.status === 200) {
        toast.success("회원가입에 성공했습니다!");
        navigate("/login");
      }
      console.log(response.data);
    } catch (error) {
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="name"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="username"
              placeholder="UserName"
              onChange={handleInputChange}
            />

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-full text-center py-3 rounded text-white bg-sky-500/100 hover:bg-cyan-600 my-2"
            >
              Create Account
            </button>
          </form>
          <div className={`alert ${alert?.type}`}>{alert?.message}</div>
        </div>

        <div className="text-grey-dark mt-6">
          Already have an account?
          <a
            href="/login"
            className="font-semibold leading-6 text-sky-600 hover:text-indigo-500"
          >
            {"  "}
            Log In
          </a>
        </div>
      </div>
    </div>
  );
}
