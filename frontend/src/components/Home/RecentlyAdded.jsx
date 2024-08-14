import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';

const RecentlyAdded = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const [Data, setData] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url+"/api/v1/get-recent-book");
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching recently added books:', error);
        setError('Failed to load books.'); 
      } finally {
        setLoading(false); 
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
      {loading ? (
        <div className='flex items-center justify-center my-8'>
          <Loader />
        </div>
      ) : error ? (
        <div className='flex items-center justify-center my-8'>
          <p className='text-red-500'>{error}</p> 
        </div>
      ) : (
        <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {Data && Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
          {Data.length === 0 && (
            <div className='flex items-center justify-center col-span-full'>
              <p className='text-red-500'>No books found.</p> 
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecentlyAdded;
