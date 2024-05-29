// cloud setup
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
app.use(express.json());
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLAS_SERVER_URL;

main().then(() =>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname ,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);  //using ejsMate
app.use(express.static(path.join(__dirname , "/public")));  //linking styleSheet

// mongoStore
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", () =>{
    console.log("ERROR IN MONGO STORE", err);
});

// express-sessions
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

// app.get("/" ,(req,res) =>{
//     res.send("hello");
// });


app.use(session(sessionOptions));
// flash is used before the routes
app.use(flash());

// use passport after session 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demoUser" , async(req,res) =>{
//     let fakeUser = new User({
//         email : "abc@gmail.com",
//         username : "abcUser",
//     });

//     let registeredUser = await User.register(fakeUser , "helloworld");
//     res.send(registeredUser);
// });

// in place of listings and reviews routes
app.use("/listings" , listingRouter);
// use mergeParams
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter);


// new ExpressError
app.all("*" , (req,res,next) =>{
    next(new ExpressError(404 , "Page Not Found:("));
});

// middleware for error
app.use((err,req,res,next) =>{
    // ExpressError
    let {statusCode=500 , message="Something went wrong:("} = err;
    res.status(statusCode).render("error.ejs" , {message});
    // res.status(statusCode).send(message);
});


app.listen(8080 , () =>{
    console.log("server is working");
});