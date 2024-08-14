const router = require("express").Router();
const User = require("../models/user");
const {authenticationToken} = require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite", authenticationToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            return res.status(200).json({message: "Book is already in favourite"});
        }

        await User.findByIdAndUpdate(id, {$push: {favourites: bookid}});
        return res.status(200).json({message: "Book added favourite"});
    }
    catch(error){
        return res.status(500).json({message: "internal server error"});
    }
});

//remove book to favourite
router.put("/remove-book-from-favourite", authenticationToken, async (req, res)=>{
    try{
        const {bookid, id} = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if(isBookFavourite){
            await User.findByIdAndUpdate(id, {$pull: {favourites: bookid}});
        }        
        return res.status(200).json({message: "Book is removed from favourite"});
    }
    catch(error){
        return res.status(500).json({message: "internal server error"});
    }
});

//get favourite books of perticular user
router.get("/get-favourite-book", authenticationToken, async (req, res)=>{
    try{
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        
        return res.status(200).json({
            message: "success",
            data: favouriteBooks,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "internal server error"});
    }
});

module.exports = router;