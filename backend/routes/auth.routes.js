import express, { Router } from "express"
import { signUp,login, logout } from "../controllers/auth.controllers.js"

const authRouter = Router()

authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/logout", logout)


export default authRouter