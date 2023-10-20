import { User } from "../model/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { sendCookie } from "../utils/sendCook.js";


// verify user middleware
export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    // if token not exists
    if (!token) {
        return res.json({ success: false, message: "Login first" })
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // saving the user details in req object named as req.user
        req.user = await User.findById(decoded._id, "-password");
        next();
    }
}


// used to check in frontend if user is athenticated or not and return user details
export const userDetails = async (req, res) => {
    res.json({ success: true, user: req.user })
}


export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        //if user exists return error
        let user = await User.findOne({ email })  // shortHand for email:email
        if (user) return res.status(400)
            .json({ success: false, message: "User already exists." })

        // hashing the received password
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating user
        user = await User.create({ name, email, password: hashedPassword });

        // sending cookies so that user don't need to log in again now
        // user, res, message, statusCode 
        sendCookie(user, res, "Registered Successfully", 201);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Can't register"
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        // if user email not exists or password incorrect
        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid user or Password"
        })

        // matching password
        const isMatch = await bcrypt.compare(password, user.password); // input password, password saved in database

        // if password not matched
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid user or Password"
            })
        }

        // // everything matched , login user 
        // user, res, message, statusCode 
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "backend error."
        })
    }
}


export const logout = (req, res) => {

    try {
        res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
            })
            .json({
                success: true,
                message: "Logout successfull",
            });

    } catch (error) {
        res.json({
            success: false,
            message: error,
        });
    }
}