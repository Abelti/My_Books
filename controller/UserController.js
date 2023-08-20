const asyncHandler = require('express-async-handler');
const user = require ('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const cookie = require('cookie-parser');

// register
// login
//current
//&&

let accessToken;
let thisUser;

const registerUser = asyncHandler( async (req, res) => {
    const {fullName, userName, email, phone, password, confirmPassword} = req.body;
    if (!fullName  || !email || !phone || !password || !confirmPassword || !userName) {
        res.status(206);
        throw new Error ("All fields are required");
    }

    const userExist = await user.findOne({userName, email});
    if(userExist) {
        res.status(206);
        throw new Error ("User already exists");
    }
    if (password !== confirmPassword) {
        res.status(206);
        throw new Error ("Password do not match");
    }

    const HashedPassword = await bcrypt.hash(password, 9);
    const HashedConfirmedPassword = await bcrypt.hash(confirmPassword, 9)
        bookUser = await user.create({
            fullName: fullName,
            userName: userName,
            email: email,
            phone: phone,
            password: HashedPassword,
            confirmPassword: HashedConfirmedPassword
        });

        res.status(200).json({_id: user.id, UserName: user.userName} + ' ' + "Successfully registered!");
    }
);

const loginUser = asyncHandler( async (req, res) => {
    const {credential, password} = req.body;
    if (!credential || !password) {
        res.status(401);
        throw new Error ('User login failed: fill all the fields');
    }
    if (credential.includes('@')) {
        thisUser = await user.findOne({email: credential});
        console.log(thisUser)
    }

    else {
        thisUser = await user.findOne({userName: credential});
        console.log(thisUser)
    }

    if (thisUser && (await bcrypt.compare(password, thisUser.password))){
        
        accessToken = jwt.sign({
            users: {
                userName: user.userName,
                email: user.email,
                id: user.id,
                password: user.password,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '5m'
        });
        
        //res.status(200).cookie("My_Token", accessToken).json({accessToken, password: password, secret: process.env.ACCESS_TOKEN_SECRET});
        res.status(200).cookie("My_Token", accessToken).redirect("/api/books");
    }

    else {
        throw new Error ('User login failed: wrong username or password');
    }
});


const currentUser = (req, res) => {

    if(!accessToken) {
        res.status(206).json({message: "Access Token not provided"});
    }

    else if (accessToken){
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send(thisUser);
    }

    else {
        throw new Error ("Access Token not working properly");
    }
}


const logoutUser = (req, res) => {
    
    accessToken = null;
    res.status(200).clearCookie("My_Token").json({message: 'Log out'});
}

module.exports = {registerUser, loginUser, currentUser, logoutUser, accessToken};