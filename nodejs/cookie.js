var http = require("http");
var cookie = require("cookie");

http
  .createServer(function (request, response) {
    var cookies = cookie.parse(request.headers.cookie || "");
    console.log(cookies.yummy_cookie);
    // Session cookie
    // response.writeHead(200, {
    //   "Set-Cookie": ["yummy_cookie=choco", "tasty_cookie=strawberry"],
    // });

    //Permanent cookie
    response.writeHead(200, {
      "Set-Cookie": [`Permanent=cookies; Max-Age=${60 * 60 * 24 * 30}`],
    });

    response.end("Cookie!!");
  })
  .listen(3000);
