const express = require("express");
const app = express();
const port = 6000;
const cors = require("cors"); 
const newsRouter = require("./routes/NewsRouter");
const AuthRouter = require("./routes/AuthRouter");
app.use(express.json());

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: true
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/news", newsRouter);
app.use("/login", AuthRouter);

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
