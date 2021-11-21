const Blog = require("../models/Blog");
const User = require("../models/User");

const postBlog = (req, res) => {
  const { title, description, body } = req.body;

  let newPost = new Blog({
    title: title,
    description: description,
    body: body,
    author: req.user._id,
  });

  newPost
    .save()
    .then(() => res.status(201).json({ newPost }))
    .catch((err) => res.status(500).json({ msg: err }));
};

const getAll = (req, res) => {
  Blog.find({})
    .populate("author", "-_id -hash -salt -email")
    .then((blogs) =>
      blogs
        ? res.status(200).json({ blogs })
        : res.status(404).json({ msg: "No blogs found" })
    )
    .catch((err) => res.status(500).json({ msg: err }));
};

const getOne = (req, res) => {
  Blog.find({ _id: req.params.id })
    .populate("author", "-hash -salt -email")
    .then((blogs) => {
      let ownerStatus = false;
      if (blogs) {
        if (req.user) {
          if (blogs[0].author._id.equals(req.user._id)) {
            ownerStatus = true;
          }
        }
        res.status(200).json({
          blogs: {
            title: blogs[0].title,
            description: blogs[0].description,
            author: { username: blogs[0].author.username },
            body: blogs[0].body,
          },
          ownerStatus,
        });
      } else {
        res.status(404).json({ msg: "No blogs found" });
      }
    })
    .catch((err) => res.status(500).json({ msg: err }));
};

const deleteOne = (req, res) => {
  Blog.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ msg: err }));
};

const updateOne = (req, res) => {
  console.log(req.body);
  Blog.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ msg: err }));
};

module.exports = {
  postBlog,
  getAll,
  getOne,
  deleteOne,
  updateOne,
};
