const Blog = require('../models/Blog');
const User = require('../models/User');

const postBlog = (req, res) => {

    const {title, description, body } = req.body;

    let newPost = new Blog({
        title       : title,
        description : description,
        body        : body,
        author      : req.user._id
    })

    newPost
    .save()
    .then(() => res.status(201).json({ newPost }))
    .catch(err => res.status(500).json({ msg: err }))
}

const getAll = (req, res) => {
    Blog
    .find({})
    .populate('author', '-id -hash -salt -email')
    .then(blogs => blogs ? res.status(200).json({blogs}) : res.status(404).json({ msg: 'No blogs found'}))
    .catch(err => res.status(500).json({ msg: err }))
}

const getOne = (req, res) => {
    Blog
    .find({_id: req.params.id})
    .populate('author', '-id -hash -salt -email')
    .then(blogs => blogs ? res.status(200).json({blogs}) : res.status(404).json({ msg: 'No blogs found'}))
    .catch(err => res.status(500).json({ msg: err }))
}

const deleteOne = (req, res) => {
    console.log(req.body.id)
    Blog
    .findOneAndDelete({_id: req.params.id})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ msg: err }))
}

module.exports = {
    postBlog,
    getAll,
    getOne,
    deleteOne
}