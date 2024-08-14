const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book")
const {authenticationToken} = require("./userAuth");


//add books --> admin
router.post("/add-book", authenticationToken, async (req, res)=>{
    try{

        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role!== "admin"){
            return res.status(400).json({message: "You do not have access to perform admin activities"});
        };

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({message: "book added successfully"})
    }
    catch(error){
        res.status(500).json({message: "internal server error"});
    }
})

//update books 
router.put("/update-book", authenticationToken, async (req, res)=>{
    try{

        const {bookid} = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });

        return res.status(200).json({message: "book update successfully"})
    }
    catch(error){
        res.status(500).json({message: "internal server error"});
    }
})

//delete book
router.delete("/delete-book", authenticationToken, async (req, res)=>{
    try{
        const {bookid} = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({message: "Book deleted successfully"});
    }
    catch{
        return res.status(500).json({message:"internal server error"});
    }
})

//get all books
router.get("/get-all-book", async (req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1});
        return res.json({
            message: "Success", 
            data: books
        })
    }
    catch(error){
        return res.status(500).json({message: "internal server error"});
    }
})

//get recently added books
router.get("/get-recent-book", async (req, res)=>{
    try{
        const books = await Book.find().sort({createdAt: -1}).limit(4);
        return res.json({
            message: "Success", 
            data: books
        })
    }
    catch(error){
        return res.status(500).json({message: "internal server error"});
    }
})

//get book by id
router.get("/get-book-by-id/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const book = await Book.findById(id);
        return res.json({
            message: "Success", 
            data: book
        })
    }
    catch(error){
        return res.status(500).json({message: "internal server error"});
    }
})

module.exports = router;