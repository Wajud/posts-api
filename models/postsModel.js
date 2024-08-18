const posts = require("../data/posts");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(posts);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const post = posts.find((post) => post.id === id);
    resolve(post);
  });
}

module.exports = { findAll, findById };
