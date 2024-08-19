const Posts = require("../models/postsModel");
const { getBodyData } = require("../utils");

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
  const sentData = await getBodyData(req, res);
  const newPost = await Posts.create(sentData);
  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newPost));
}

async function updatePost(req, res, id) {
  try {
    const post = await Posts.findById(id);

    if (!post) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post requested not found" }));
    } else {
      const sentData = await getBodyData(req, res);
      const updPost = {
        author: sentData.author || post.author,
        content: sentData.content || post.content,
        likes: sentData.likes || post.likes,
      };
      const updatedPost = await Posts.update(id, updPost);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updatedPost));
    }
  } catch (err) {
    console.log(err);
  }
}

async function deletePost(req, res, id) {
  try {
    const post = await Posts.findById(id);

    if (!post) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post requested not found" }));
    } else {
      await Posts.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Post successfully deleted" }));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getPosts, getPost, createPost, updatePost, deletePost };
