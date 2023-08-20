const asyncHandler = require('express-async-handler');
const user = require ('../model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

// register
// login
//current
//&&
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
        const bookUser = await user.create({
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
    const userCredential = credential.split('');
    const at = '@';
    let thisUser;
    if (credential.includes(at)) {
        thisUser = user.findOne({email: credential});
    }

    else {
        thisUser = user.findOne({userName: credential});
    }

    if (thisUser && bcrypt.compare(password, user.password)){
        res.status(200).send("User logged in Successfully " + password + " " + user.email);
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                id: user.id,
                password: user.password,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1m'
        });
        res.status(200).json(accessToken);
    }

    else {
        throw new Error ('User login failed: wrong username or password');
    }
});


const currentUser = (req, res) => {
    res.status(200).json({message: 'Current user'});
}

const logoutUser = (req, res) => {
    res.status(200).json({message: 'Log out'});
}

module.exports = {registerUser, loginUser, currentUser, logoutUser};