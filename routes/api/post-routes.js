const router = require("express").Router();
const sequelize = require("../../config/connection");
const {Post, User, Vote} = require("../../models");

// get all posts
router.get("/", (req, res) => {
    console.log("====================");
    Post.findAll({
        attributes: ["id", "post_url", "title", "created_at"],
        order: ["created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// find a single post
router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "post_url", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(400).json({message: "No post found with this id"});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Post a ... well, a post.
router.post("/", (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.body.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


// Update a post's votes
router.put("/upvote", (req, res) => {
    Vote.create({
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(() => {
        // Find the post the user voted on
        return Post.findOne({
            where: {
                id: req.body.post_id
            },
            attributes: [
                "id",
                "post_url",
                "title",
                "created_at",
                // Use a raw SQL query to return the count of the post's votes as vote_count
                [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                'vote_count'
                ]
            ]
        });
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err =>{
        console.log(err);
        res.status(400).json(err)
    });
});

// Update a post's title
router.put("/:id", (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {        
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



// Delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: "No post found with this id" });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


module.exports = router;
