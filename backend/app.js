let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// ROUTERS GO HERE
let indexRouter = require("./routes/index");
let gigsRouter = require("./routes/gigs");
let mediaItemsRouter = require("./routes/mediaItems");
let postsRouter = require("./routes/posts");
let usersRouter = require("./routes/users");
let messagesRouter = require("./routes/messages");
let searchRouter = require("./routes/search");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("port", process.env.PORT || 8000);

// auto-swagger setup
const swaggerOptions = {
  failOnErrors: false, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MusicMate",
      version: "1.0.0",
      description:
        "A swagger UI for all the APIs that MusicMate uses. This project is part of a capstone project at UC Berkeley School of Information",
    },
    tags: [
      {
        name: "gigs",
        description: "All things gigs",
      },
      {
        name: "mediaItems",
        description: "APIs that deal with the media items on MusicMate",
      },
      {
        name: "messages",
        description: "APIs that handle the messages among users",
      },
      {
        name: "posts",
        description: "APIs that enable users to post content on the platform",
      },
      {
        name: "search",
        description: "APIs that power the search functionality",
      },
      {
        name: "users",
        description: "APIs that work with user information",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// other functionalities for express
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
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // console log the error
  console.error(err);

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// connection to mongoDB Atlas
require("./scripts/initDb")();

module.exports = app;
