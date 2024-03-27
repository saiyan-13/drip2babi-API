const express = require("express");
const offerRoute = express.Router();
const fileUpload = require("express-fileupload");

const { validate } = require("../middleware/validate");
const isAuthenticated = require("../middleware/isAuthenticate");
const publishForm = require("../validator/publishForm");
const updateForm = require("../validator/updateForm");

const publishOffer = require("../controllers/offerController/publishOffer");
const updateOffer = require("../controllers/offerController/updateOffer");
const deleteOffer = require("../controllers/offerController/deleteOffer");
const showOffer = require("../controllers/offerController/showOfferDetail");
const getUserOffer = require("../controllers/offerController/getUserOffer");
const limitOffersPerDay = require("../middleware/limitOfferPerDay");


offerRoute.post("/publish", 
    isAuthenticated,
    limitOffersPerDay,
    fileUpload(), 
    validate(publishForm), 
    publishOffer
);

offerRoute.put("/update/:id", 
    isAuthenticated, 
    fileUpload(), 
    validate(updateForm),
    updateOffer
);

offerRoute.delete("/delete/:id", 
    isAuthenticated,
    deleteOffer
);

offerRoute.get("/:id", showOffer);

offerRoute.get('/',  isAuthenticated, getUserOffer);


module.exports = offerRoute;