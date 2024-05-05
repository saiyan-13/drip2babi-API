const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const userRoute = require("./routes/user");
const offerRoute = require("./routes/offer");
const offersRoute = require("./routes/offers");
const payRoute = require("./routes/payment");
const useroffersRoute = require("./routes/useroffers");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Vinted API 👋🌏✨🌈");
});

app.use("/user", userRoute);
app.use("/offer", offerRoute);
app.use("/offers", offersRoute);
app.use("/payment", payRoute);
app.use("/useroffers", useroffersRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});

module.exports = app;
