const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const Listing = require("../models/listing.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const mid = (req, res, next) => {
    console.log("check");
    console.log(req.body);
    next();
}


router
    .route("/")
    // index route - exrress router()
    .get(wrapAsync(listingController.index))
    // create route
    // used wrapAsync
    .post(mid,
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    );

// new route
router.get("/new",
    isLoggedIn,
    listingController.renderNewForm
);

router
    .route("/:id")
    // show route
    .get(wrapAsync(listingController.showListing))
    // update route
    .put(isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))

    // delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


// edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;
