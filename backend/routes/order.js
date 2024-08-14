const router = require("express").Router();
const { authenticationToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// Place order and remove from cart
router.post("/place-order", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({
                user: id,
                book: orderData._id
            });

            const orderDataFromDb = await newOrder.save();
            //saving in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id }
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id }
            });
        }

        return res.status(200).json({ message: "Order placed successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get order history
router.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" } 
        });

        const ordersData = userData.orders.reverse();

        return res.status(200).json({ message: "success", data: ordersData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Get all orders
router.get("/get-all-order", authenticationToken, async (req, res) => {
    try {
        const ordersData = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });

        return res.status(200).json({ message: "success", data: ordersData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Update order status
router.put("/update-status/:id", authenticationToken, async (req, res) => { 
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });  // Fixed typo from "req.boby" to "req.body"

        return res.status(200).json({ message: "Status updated successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
