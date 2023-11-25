import express from "express";
import * as authController from "./authController.js";

const authRouter = express.Router();

authRouter.use(authController.locals);
authRouter.post("/auth/login", authController.login);
authRouter.get("/logout", authController.logout);

export {authRouter};