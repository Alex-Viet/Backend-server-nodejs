const http = require("http");
const getUsers = require("./modules/users");

const port = 3003;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${hostname}`);
  const params = url.searchParams;

  if (params.toString !== "") {
    if (params.has("hello")) {
      const name = params.get("hello");
      if (name) {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end(`Hello, ${name}`);
        return;
      } else {
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.end("Enter a name");
        return;
      }
    }

    if (url.pathname === "/users") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.write(getUsers());
      return;
    } else {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end("Hello,world!");
      return;
    }
  } else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
