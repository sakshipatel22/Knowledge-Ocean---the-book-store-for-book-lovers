import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const url = "https://knowledge-ocean-the-book-store-for-book.onrender.com";
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        url+"/api/v1/get-cart-book",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]); 
    
  const deleteItem = async(bookid) => {
    const response = await axios.put(url+`/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  }

  useEffect(()=>{
    if(Cart && Cart.length > 0){
      let total = 0;
      Cart.map((items)=>{
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  },[Cart]);

  const PlaceOrder = async () => {
    try{
      const response = await axios.post(url+"/api/v1/place-order", {order: Cart}, { headers });
      alert(response.data.message);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div className="bg-zinc-900 px-12 py-4 h-[100vh] overflow-auto">
      <h1 className="text-3xl text-yellow-100 font-semibold">Your Cart</h1>
      <>
        {!Cart && <div className="w-full h-auto flex items-center justify-center"><Loader/></div>}
        {Cart && Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-[100%] flex items-center justify-center flex-col">
              <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
                No Items!
              </h1>
              <img src="/empty-cart.png" alt="" className="lg:h-[50vh]"/>
            </div>
          </div>
        )}
        {Cart && Cart.length > 0 && (
          <>
            {Cart.map((items, i) => (
              <div
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                key={i}
              >
                <img
                  src={items.url}
                  alt="book"
                  className="h-[30vh] lg:h-[10vh] object-cover"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {items.title}
                  </h1>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 hidden lg:hidden md:block">
                    {items.desc.slice(0, 65)}...
                  </p>
                  <p className="text-normal text-zinc-300 mt-2 block lg:hidden">
                    {items.desc.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-3xl font-semibold flex">
                    ₹{items.price}
                  </h2>
                  <button
                    className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </>
      {Cart && Cart.length>0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{Cart.length} books </h2>
              <h2>{Total}</h2>
            </div>
            <div>
              <button className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300" onClick={PlaceOrder}>
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Cart;
