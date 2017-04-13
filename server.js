var httpProxy = require('http-proxy');
var express = require('express');
var apiProxy = httpProxy.createProxyServer({target: process.env.TARGET, changeOrigin:true});
apiProxy.on('proxyReq', function(proxyReq, req, res, options) {
  proxyReq.setHeader('Cookie', 'debug_logs=debug_logs,domain=.force.com');
});
var addDebugCookie = function(req, res) {
  apiProxy.web(req, res);
};
var server = express();
server.all('/*', addDebugCookie);
var port = process.env.PORT || 5000;
server.listen(process.env.PORT || 5000);
console.log('server listening on ' + port);