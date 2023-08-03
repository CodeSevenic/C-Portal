const express = require('express');
const getHubSpotBlogPosts = require('../controllers/posts');
const router = express.Router();

router.get('/blog-posts', getHubSpotBlogPosts);

module.exports = router;
