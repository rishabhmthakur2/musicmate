let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// ROUTERS GO HERE
let indexRouter = require("./routes/index");
let gigsRouter = require("./routes/gigs");
let mediaItemsRouter = require("./routes/mediaItems");
let postsRouter = require("./routes/posts");
let usersRouter = require("./routes/users");
let messagesRouter = require("./routes/messages")

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("port", process.env.PORT || 8000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// REROUTE BASE URLS TO RESPECTIVE ROUTERS HERE
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/gigs", gigsRouter);
app.use("/mediaItems", mediaItemsRouter);
app.use("/posts", postsRouter);
app.use("/messages", messagesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

require("./scripts/initDb")();

module.exports = app;
