import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';

const AllBooks = () => {
  const url = "http://localhost:3000";

  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url+"/api/v1/get-all-book");
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching recently added books:', error);
      }
    };

    fetchBooks();
  }, []);
  
  return (
    <div className='bg-zinc-900 h-auto px-14 py-8'>
      <h4 className='text-3xl text-yellow-100'>All Books</h4>
      {!Data && (<div className="w-full h-[100%] flex items-center justify-center"><Loader/></div>)}
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>        
        {Data && Data.map((items, i) => (
            <div key={i}>
                 <BookCard data={items} />{" "}
            </div>
         ))}
      </div>
    </div>
  )
}

export default AllBooks;
