const router = require("express").Router();
const User = require("../models/user");
const {authenticationToken} = require("./userAuth");


//put book to cart
router.put("/add-to-cart", authenticationToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart){
            return res.status(200).json({message: "Book is already in cart"});
        }
        await User.findByIdAndUpdate(id, {
            $push: {cart: bookid}
        });
        return res.status(200).json({message: "Book is added to cart"});

    }
    catch{
        return res.status(500).json({message: "internal server error"});
    }
});

//remove book from cart
router.put("/remove-from-cart/:bookid", authenticationToken, async (req, res)=>{
    try{
        const {bookid} = req.params;        
        const {id} = req.headers;        
        await User.findByIdAndUpdate(id, {
            $pull: {cart: bookid}
        });
        return res.status(200).json({message: "Book is removed from cart"});

    }
    catch{
        return res.status(500).json({message: "internal server error"});
    }
});

//get favourite books of perticular user
router.get("/get-cart-book", authenticationToken, async (req, res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        
        return res.status(200).json({
            message: "success",
            data: cart,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
});

module.exports = router;