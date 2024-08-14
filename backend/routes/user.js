const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticationToken} = require("./userAuth");

// Sign-up functionality
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Validate username
    const usernameRegex = /^[\w]+$/;
    if (username.length < 4) {
      return res.status(400).json({ message: "Username should be more than 3 characters." });
    }
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: "Username should not contain spaces or special characters." });
    }

    // Check if username already exists
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if email already exists
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({ message: "Password should be at least 6 characters long." });
    }
    if (/\s/.test(password)) {
      return res.status(400).json({ message: "Password should not contain spaces." });
    }

    const hashPass = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashPass,
      address,
    });

    await newUser.save();
    return res.status(201).json({ message: "Sign up successful." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


//sign-in functionality
router.post("/sign-in", async (req, res) => {
    try {
      const {username, password} = req.body;

      //check username existance
      const existingUser = await User.findOne({username});
      if(!existingUser){
        res.status(400).json({message: "Invalid credentials! please sign up first"})
      }
      await bcrypt.compare(password, existingUser.password, (err, data)=>{
        if(data){
            const authClaims = [
                {name: existingUser.username},
                {role: existingUser.role},
            ];

            const token = jwt.sign({authClaims}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30d"});
            res.status(200).json({
              id: existingUser._id, 
              role: existingUser.role, 
              token: token
            });
        }
        else{
            res.status(400).json({message: "Invalid credentials! please entre correct username and password"});
        }
      })

    } 

    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

//get user infomations
router.get("/get-user-information", authenticationToken, async (req, res)=>{
  try{
    const {id} = req.headers;
    const data = await User.findById(id).select('-password');
    return res.status(200).json(data);
  }
  catch(error){
    return res.status(500).json({message: "internal server error"});
  }
})

//update address
router.put("/update-address", authenticationToken, async (req, res)=>{
  try{
    const {id} = req.headers;
    const {address} = req.body;
    await User.findByIdAndUpdate(id, {address: address});
    return res.status(200).json({message: "Address updated successfully"});
  }
  catch(error){
    return res.status(500).json({message: "internal server error"});
  }
})
  
module.exports = router;
