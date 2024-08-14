const express = require("express");
const app = express();

require("dotenv").config();
require("./connections/conn");
const cors = require("cors");
const User = require("./routes/user");
const Books = require("./routes/book")
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors());

//route
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

//listening port
app.listen(process.env.PORT,()=>{
    console.log(`server started on port ${process.env.PORT}`);
});