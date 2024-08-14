import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      url+"/api/v1/remove-book-from-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img
              src={data.url}
              alt="book img"
              className="h-[30vh] object-cover"
            />
          </div>
          <div className="">
            <h2 className="mt-4 text-xl text-white font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              {data.title}
            </h2>
            <p className="mt-2 text-zinc-400 font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
              by {data.author}
            </p>
            <p className="mt-2 text-zinc-200 font-semibold text-xl">
              ₹{data.price}
            </p>
          </div>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4"
          onClick={handleRemoveBook}
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
