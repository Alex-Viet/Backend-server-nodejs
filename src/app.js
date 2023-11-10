const http = require("http");
const getUsers = require("./modules/users");

const port = 3003;
const hostname = "127.0.0.1";

const server = http.createServer((request, response) => {
  const urlObject = new URL(request.url, `http://${hostname}`);

  if (urlObject.pathname === "/" && urlObject.searchParams.has("hello")) {
    const name = urlObject.searchParams.get("hello");

    if (name) {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/plain");
      response.end(`Hello, ${name}!`);
    } else {
      response.statusCode = 400;
      response.setHeader("Content-Type", "text/plain");
      response.end("Enter a name");
    }
    for (const key of urlObject.searchParams.keys()) {
      if (key !== "hello") {
        response.statusCode = 500;
        response.end();
      }
    }
  } else if (urlObject.pathname === "/users") {
    try {
      const usersData = getUsers();

      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(usersData));
    } catch (err) {
      response.statusCode = 500;
      response.setHeader("Content-Type", "text/plain");
      response.end("Internal Server Error");
    }
  } else if (urlObject.search === "") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello, World!");
  } else {
    response.statusCode = 500;
    response.end();
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
