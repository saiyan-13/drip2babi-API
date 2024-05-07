const express = require("express");
const route = express.Router();

const getOffers = require("../controllers/offerController/getOffers");

// Route pour les offres générales
route.get("/", getOffers);

// Route pour les offres d'un utilisateur spécifique
route.get("/user/:userId", getOffers);

module.exports = route;
