var path = require("path");
var irons = require("../irons");

var images = function (server) {
  server.route({
    method: "GET",
    path: "/",
    handler: images.random
  });

  server.route({
    method: "GET",
    path: "/images/{file}",
    handler: images.specific
  });
};

images.random = function (request, reply) {
  reply(irons[Math.floor(Math.random() * irons.length)]);
};

images.specific = function (request, reply) {
  for (var i = irons.length - 1; i >= 0; i--) {
    if (irons[i].path === request.path) {
      return images.serve(reply, irons[i]);
    }
  };
};

images.serve = function (reply, iron) {
  var response = reply.file(path.join(__dirname, "../irons/" + iron.filename));
  response.header("X-SourceUrl", iron.source);
  response.header("X-ImageWidth", iron.width);
  response.header("X-ImageHeight", iron.height);
};

module.exports = images;
