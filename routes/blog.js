const router = require("express").Router();
const authMiddlware = require("../middleware/auth");
const blog = require("../controller/blog");

router.route("/post").all(authMiddlware.isAuth).post(blog.postBlog);

router.route("/getall").get(blog.getAll);

router.route("/getone/:id").get(blog.getOne);

router
  .route("/deleteone/:id")
  .all(authMiddlware.isAuth, authMiddlware.isOwner)
  .delete(blog.deleteOne);

router
  .route("/updateone/:id")
  .all(authMiddlware.isAuth, authMiddlware.isOwner)
  .patch(blog.updateOne);

module.exports = router;
