const { createServer } = require("http");
const { getPosts, getPost } = require("./controllers/postControllers");

const server = createServer((req, res) => {
  if (req.url === "/api/posts" && req.method === "GET") {
    getPosts(req, res);
  } else if (req.url.match(/\/api\/posts\/(.+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getPost(req, res, id);
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not Found" }));
  }
});

server.listen(8000, () => console.log("Server listening on PORT 8000"));
