import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        url+"/api/v1/get-all-order",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, [AllOrders]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };
  const submitChange = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(
      url+`/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      <h1 className="text-3xl text-yellow-100">All Order History</h1>
      {!AllOrders && (
        <div className="h-[100vh] overflow-auto flex items-center justify-center">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100vh] overflow-auto p-5 md:p-4 text-zinc-100 m-2 lg:mx-0 bg-zinc-800">
          <div className="bg-zinc-800 lg:bg-zinc-900 w-full rounded mb-2 py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sl.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders &&
            AllOrders.map((items, i) => (
              <div
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
                key={items._id}
              >
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1>{items.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1>{items.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%]">
                  <h1 className="font-semibold">
                    <button
                      className="hover:scale-105 transition-all duration-300"
                      onClick={() => setOptions(i)}
                    >
                      {items.status === "Order placed" ? (
                        <div className="text-yellow-500">{items.status}</div>
                      ) : items.status === "Canceled" ? (
                        <div className="text-red-500">{items.status}</div>
                      ) : (
                        <div className="text-green-500">{items.status}</div>
                      )}
                    </button>
                    <div
                      className={`${
                        Options === i ? "flex" : "hidden"
                      } flex mt-4`}
                    >
                      <select
                        name="status"
                        id=""
                        className="bg-gray-800"
                        onChange={change}
                        value={Values.status}
                      >
                        {[
                          "Order placed",
                          "Out for delivery",
                          "Delivered",
                          "Canceled",
                        ].map((items, j) => (
                          <option value={items} key={j}>
                            {items}
                          </option>
                        ))}
                      </select>
                      <button
                        className="text-green-500 hover:text-pink-600 mx-2"
                        onClick={() => {
                          setOptions(-1);
                          submitChange(i);
                        }}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  </h1>
                </div>
                <div className="w-[10%] md:w-[5%]">
                  <button
                    className="text-xl hover:text-orange-500"
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                  >
                    <IoOpenOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
