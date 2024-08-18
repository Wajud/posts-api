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

async function createPost(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const { author, content, likes } = JSON.parse(body);
    const newPost = await Posts.create({ author, content, likes });
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newPost));
  });
}

module.exports = { getPosts, getPost, createPost };
