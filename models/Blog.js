const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const BlogSchema = new Schema({
    title: String,
    description: String,
    body: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;