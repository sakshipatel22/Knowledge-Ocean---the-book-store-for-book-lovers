import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const url = "http://localhost:3000";
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();
  const change = (e)=>{
    const {name, value} = e.target;
    setValues({...Values, [name]: value});
  };
  const submit = async() => {
    try{
      if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === ""){
        alert("Please fill all required fields");
      }
      else{
        const response = await axios.post(url+"/api/v1/sign-up", Values);
        alert(response.data.message);
        navigate("/LogIn");
      }
    }
    catch(error){
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-auto bg-zinc-900 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full mx-3 md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              name="username"
              id=""
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your name"
              required
              value={Values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Email
            </label>
            <input
              type="text"
              name="email"
              id=""
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              required
              value={Values.email}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id=""
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter password"
              required
              value={Values.password}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Address
            </label>
            <textarea
              rows="5"
              name="address"
              id=""
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter addresss"
              required
              value={Values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 hover:text-zinc-800 transition-all duration-300" onClick={submit}>
              SignUp
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-2 items-center justify-center text-zinc-400 font-semibold">
            Already have an account?{" "}
            <Link to="/LogIn" className="underline ml-2 hover:text-blue-500">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
