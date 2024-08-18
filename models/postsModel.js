const posts = require("../data/posts");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils.js");
const fs = require("fs");
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

function create(post) {
  return new Promise((resolve, reject) => {
    const newPost = {
      ...post,
      id: uuidv4(),
    };
    posts.push(newPost);
    writeDataToFile(JSON.stringify(posts));

    resolve(newPost);
  });
}
module.exports = { findAll, findById, create };
