var restify = require('restify');
var monster = require('./monsterid.js')

/*
 * TODO: pass sizes, fix random seed, bit more docs, run through checker
 *       get a decent workflow (need to rework Dockerfile)
 *       tests (pretty easy, check get same binary for same string, check
 *       short strings, invalid URLs, sizes)
 */
function respond(req, res, next) {

  imgStr = monster.getAvatar("test-string", 200, 200)
  res.setHeader('Content-Type', 'image/png');
  res.send(imgStr);
  next();
}

var server = restify.createServer({
    formatters: {
        'image/png': function formatPng(req, res, body) {
            if (body instanceof Error) {
                return body.stack;
            } 
            //Just send the bytes - should be a Buffer
            return body;
        }
    }
});

server.get('/monster/:name', respond);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
