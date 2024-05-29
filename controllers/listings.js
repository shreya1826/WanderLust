const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});


module.exports.index = async(req , res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs" , {allListings});
};

module.exports.renderNewForm = (req , res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req , res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        // authorization for review
        populate: {
            path: "author",
        },
    })
    .populate("owner");
    // flash message for any kind of error for eg.trying to reach the listing which you have already deleted and tring to update the deleted listing
    if(!listing){
        req.flash("error" , "Listing doesn't exist:(");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs" , {listing});
};

module.exports.createListing = async(req,res,next) =>{
    // geocoding
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      }).send();
      console.log(response.body.features[0]);

    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    // authorization 
    newListing.owner = req.user._id;
    newListing.image = {url, filename};

    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success" , "New Listing Added:)");
    res.redirect("/listings");
};

module.exports.renderEditForm = async(req , res) => {
    let {id} = req.params;
const listing = await Listing.findById(id);
if(!listing){
    req.flash("error" , "Listing doesn't exist:(");
    res.redirect("/listings");
}
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_300/e_enhance");
    res.render("listings/edit.ejs" ,{listing, originalImageUrl});
};

module.exports.updateListing = async(req , res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    // image updation
    if(typeof req.file !== "undefined"){
        console.log(req.file)
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url, filename};
        await listing.save();
    };

    req.flash("success" , "Listing Updated:)");
    res.redirect(`/listings/${id}`);  //back to show route
};

module.exports.destroyListing = async(req , res) =>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success" , "Listing Deleted:(");
    res.redirect("/listings");
};