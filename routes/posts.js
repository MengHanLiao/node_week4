const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts');

router.get('/posts', postController.getAllPosts);
router.post('/post', postController.createPost);
router.delete('/post/:postId', postController.deletePost);
router.patch('/post/:postId', postController.editPost);

module.exports = router;