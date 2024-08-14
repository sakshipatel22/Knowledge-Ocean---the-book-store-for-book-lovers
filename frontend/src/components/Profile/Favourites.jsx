import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const [FavouriteBook, setFavouriteBook] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        url+"/api/v1/get-favourite-book",
        { headers }
      );
      setFavouriteBook(response.data.data);
    };
    fetch();
  }, [FavouriteBook]);

  return (
    <div>
      <h1 className="text-3xl text-yellow-100">Favourite Books</h1>
      <>
        {FavouriteBook && FavouriteBook.length === 0 && (
          <div className="text-5xl h-[60vh] font-semibold text-zinc-500 flex items-center justify-center ">
            No Favourite Book!
          </div>
        )}
      
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {FavouriteBook &&
          FavouriteBook.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
      </>
    </div>
  );
};

export default Favourites;
