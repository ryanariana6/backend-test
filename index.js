const express = require("express");
const app = express();
const port = 3000;
const newsRouter = require("./routes/NewsRouter");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/news", newsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
