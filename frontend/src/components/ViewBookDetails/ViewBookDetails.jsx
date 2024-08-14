import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          url+`/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBooks();
  }, [id]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  // for add to favourite
  const handleFavourite = async () => {
    const response = await axios.put(
      url+"/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  //add to cart
  const handleCart = async () => {
    const response = await axios.put(
      url+"/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };

  //delete
  const  deleteBook = async () => {
    const confirmDelete = window.confirm("Do you want to delete the book?");
    if(confirmDelete){
      const response = await axios.delete(url+"/api/v1/delete-book",{ headers });
    alert(response.data.message);
    navigate("/all-books");
    }
    else{
      alert("delete canceled");
    }
  }

  return (
    <>
      {Data ? (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full lg:w-3/6">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded">
              {" "}
              <img
                src={Data.url}
                alt="Book cover"
                className="h-[50vh] md:h-[60vh] rounded lg:h-[70vh] object-contain lg:mr-4"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-row lg:flex-col mt-8 gap-4 lg:mt-0 justify-center lg:justify-start">
                  <button
                    className="rounded-full text-4xl p-2 text-red-500 bg-white"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="text-white rounded-full text-4xl p-2 bg-blue-500"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-row lg:flex-col mt-8 gap-4 lg:mt-0 justify-center lg:justify-start">
                  <Link to={`/updateBook/${id}`} className="rounded-full text-3xl p-2 bg-white">
                    <FaEdit />
                  </Link>
                  <button className="bg-white rounded-full text-3xl p-2 text-red-500" onClick={deleteBook}>
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹{Data.price}
            </p>
          </div>
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
