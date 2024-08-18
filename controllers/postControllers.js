const Posts = require("../models/postsModel");

async function getPosts(req, res) {
  try {
    const posts = await Posts.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(posts));
  } catch (err) {
    console.log(err);
  }
}

async function getPost(req, res, id) {
  try {
    const post = await Posts.findById(id);

    if (!post) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post requested not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(post));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPosts, getPost };
