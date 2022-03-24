const router = require('express').Router();
const sequelize = require("../config/connection");
const {Post, User, Comment} = require("../models");

router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // Get the array of posts and map it so that the template returns a serialized version
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render("homepage", {posts});
    })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Route to go to signup page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
        return;
    }
    res.render("login");
});

module.exports = router;