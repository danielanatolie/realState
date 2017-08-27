var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Property        = require("./models/property"),
    Comment         = require("./models/comment"),
    seedDB          = require("./seeds"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");

var propertyRoutes  = require("./routes/properties"),
    commentRoutes   = require("./routes/comments"),
    indexRoutes     = require("./routes/index");

mongoose.connect("mongodb://localhost/realState");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();

app.use(require("express-session")({
    secret: "Descipline and Consistency.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/properties", propertyRoutes);
app.use("/properties/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The realState server has started.");
});