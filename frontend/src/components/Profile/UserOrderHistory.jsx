import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const [orderHistory, setOrderHistory] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const response = await axios.get(
        url+"/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetchOrderHistory();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-yellow-100">Your Order History</h1>
      {!orderHistory ? (
        <div className="flex items-center justify-center h-auto">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-80">
              No Order History
            </h1>
            <img
              src="http://cdn-icons-png.Flaticon.com/128/9961/9961218.png"
              alt="No orders"
            />
          </div>
        </div>
      ) : (
        <div className="h-auto mt-2 rounded p-0 md:p-4 text-zinc-100 bg-zinc-800">
          <div className="h-[100vh] overflow-auto p-0 md:p-4 text-zinc-100 mx-2 lg:mx-0">
            <div className="bg-zinc-800 lg:bg-zinc-900 w-full rounded mb-2 py-2 px-4 flex gap-2">
              <div className="w-[3%]">
                <h1 className="text-center">Sl.</h1>
              </div>
              <div className="w-[22%]">
                <h1>Books</h1>
              </div>
              <div className="w-[45%]">
                <h1>Description</h1>
              </div>
              <div className="w-[9%]">
                <h1>Price</h1>
              </div>
              <div className="w-[16%]">
                <h1>Status</h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1>Mode</h1>
              </div>
            </div>

            {orderHistory.map((items, i) => (
              <div
                key={items._id}
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              >
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}</h1>
                </div>
                <div className="w-[22%]">
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-[45%]">
                  <h1>{items.book.desc.slice(0, 50)} ...</h1>
                </div>
                <div className="w-[9%]">
                  <h1>{items.book.price}</h1>
                </div>
                <div className="w-[16%]">
                  <h1 className="font-semibold">
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </h1>
                </div>
                <div className="w-none md:w-[5%] hidden md:block">
                  <h1 className="text-sm text-zinc-400">COD</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
