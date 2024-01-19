const express = require("express");
const router = express.Router();
const AuthService = require("../service/AuthService");


router.post("/", async function (req, res, next) {
    try {
        res.json(await AuthService.Login(req.body));
    } catch (err) {
        console.error(`Gagal Menyimpan Data`, err.message);
        next(err);
    }
});

module.exports = router;