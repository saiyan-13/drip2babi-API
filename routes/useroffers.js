const express = require("express");
const route = express.Router();

const getuserOffers = require("../controllers/offerController/getAllUserOffers");

route.get("/", getuserOffers);

module.exports = route;
