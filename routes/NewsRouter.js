const express = require("express");
const router = express.Router();
const NewsService = require("../service/NewsService");

/* GET programming languages. */
router.get("/", async function (req, res, next) {
    try {
        res.json(await NewsService.getAll(req.query.page));
    } catch (err) {
        console.error(`Gagal Mengambil Data `, err.message);
        next(err);
    }
});
router.post("/", async function (req, res, next) {
    try {
        res.json(await NewsService.create(req.body));
    } catch (err) {
        console.error(`Gagal Menyimpan Data`, err.message);
        next(err);
    }
});
router.put("/:id", async function (req, res, next) {
    try {
        res.json(await NewsService.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Gagal`, err.message);
        next(err);
    }
});

router.delete("/:id", async function (req, res, next) {
    try {
        res.json(await NewsService.remove(req.params.id));
    } catch (err) {
        console.error(`Gagal`, err.message);
        next(err);
    }
});
router.get("/:id", async function (req, res, next) {
    try {
        res.json(await NewsService.search(req.params.id));
    } catch (err) {
        console.error(`Gagal Mengambil Data `, err.message);
        next(err);
    }
});
router.get("/detail/:id", async function (req, res, next) {
    try {
        res.json(await NewsService.detail(req.params.id));
    } catch (err) {
        console.error(`Gagal Mengambil Data `, err.message);
        next(err);
    }
});


module.exports = router;