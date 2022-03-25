const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Dashboard landing page GET route
router.get("/", (req, res) => {
    res.render("dashboard", {loggedIn: true});
});

module.exports = router;