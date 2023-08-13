// register
// login
//current
//&&
const registerUser = (req, res) => {
    const {fullName, userName, email, phone, password, confirmPassword} = req.body;
    if (!fullName  || !email || !phone || !password || !confirmPassword || !userName) {
        res.status(206);
        throw new Error ("All fields are required");
        //res.status(206).json({message: "Please fill every required field"}).send();
    }
    res.status(200).json({message: 'User registration successful'});
};

const loginUser = (req, res) => {
    const {userName, email, password} = req.body;
    if ((!userName || !email) && !password) {
        res.status(401);
        throw new Error ('User login failed');
    }
    if ((userName || email) && password) {
        res.status(200).json({message: 'User login successful'});
    }
}

const currentUser = (req, res) => {
    res.status(200).json({message: 'Current user'});
}

const logoutUser = (req, res) => {
    res.status(200).json({message: 'Log out'});
}

module.exports = {registerUser, loginUser, currentUser, logoutUser};