import express from "express";
import {isAuthenticated, register, login, logout, userDetails } from '../controllers/auth.js'

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/user", isAuthenticated, userDetails)


export default router;