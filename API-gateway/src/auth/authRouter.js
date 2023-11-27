import express from "express";
import axios from "axios";

const authRouter = express.Router();



authRouter.post("/login", async (req, res) => {
    const { credential } = req.body;

    const axiosResponse = await axios.post('http://localhost:3000/auth/login', { credential });

    const tokenBearer = `Bearer ${axiosResponse.data.token}`;

    req.session.user = axiosResponse.data.user;

    res.cookie('access_token', tokenBearer, {maxAge: 3600000, httponly: false});
    res.set('Authorization', tokenBearer);
    res.redirect("/search");
})

export default authRouter;