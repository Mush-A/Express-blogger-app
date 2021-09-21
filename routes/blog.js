const router = require('express').Router();
const authMiddlware = require('../middleware/auth');
const blog = require('../controller/blog');

router.route('/post')
.all(authMiddlware.isAuth)
.post(blog.postBlog)

router.route('/getall')
.all(authMiddlware.isAuth)
.get(blog.getAll)

router.route('/getone/:id')
.all(authMiddlware.isAuth)
.get(blog.getOne)

router.route('/deleteone/:id')
.all(authMiddlware.isAuth, authMiddlware.isOwner)
.delete(blog.deleteOne)

module.exports = router;