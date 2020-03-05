var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt-nodejs")

const passport = require("passport")
const Strategy = require("passport-local").Strategy

const multer = require("multer")
const multerConfig = multer({
  dest: "uploads/"
})

//Movies
const MovieController = require("../controllers/MovieController")
const MovieService = require("../services/MovieService")
const MovieInstance = new MovieController(new MovieService())

//Users
const UserController = require("../controllers/UserController")
const UserService = require("../services/UserService")
const UserInstance = new UserController(new UserService())





//login authentication

passport.use(
  new Strategy({
      usernameField: "username",
      passwordField: "password"
    },

    async (username, password, cb) => {

      const user = await new UserService().getUsersById(username)

      if (!user) {
        return cb(null, false);
      }


      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }


      return cb(null, user);
    }))
  



async function isAdmin(req, res, next) {
  const id = req.user

  if (!id) {
    return res.sendStatus(401)
  }

  const user = await new UserService().getUsersById(id)

  if (!user || !user.isAdmin) {

    return res.sendStatus(401)
  }

  next()
}


//serialize and deserialize

passport.serializeUser(function (user, cb) {
  cb(null, user.user);
});

passport.deserializeUser(async function (id, cb) {
  const user = await new UserService().getUsersById(id)
  cb(null, user);
});



//LOGIN ROUTE
router.post("/login", passport.authenticate("local"), (req, res) => {
  return res.sendStatus(200)
});


// MOVIES ROUTES

router.get("/movies", (req, res) => {
  MovieInstance.getMovies(req, res)
})

router.get("/movies/:id", (req, res) => {
  MovieInstance.getMoviesById(req, res)
})

router.post("/movies", isAdmin, multerConfig.single("image"), (req, res) => {
  MovieInstance.addMovie(req, res)
})



//  USER ROUTES

router.get("/users", (req, res) => {
  UserInstance.getUsers(req, res)
})

router.get("/users/:id", (req, res) => {
  UserInstance.getUsersById(req, res)
})

router.post("/users", (req, res) => {
  UserInstance.addUser(req, res)
})


module.exports = router;