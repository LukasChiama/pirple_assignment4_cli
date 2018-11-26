/*Build API for pizza delivery company. Create Users, tokens, checks and
  integrate API for accepting payments and sending email
*/

//load dependencies
const http = require('http');
const https = require('https');
const url = require('url');
const Decoder = require('string_decoder').StringDecoder;
const fs = require("fs");
const path = require("path");
const routeHandlers = require('./routeHandlers');
const aux = require('./auxFunctions');


//define .env file and make it a global variable populated with API Keys, hashing secret for tokens and other secrets needed for the code
const envFile = path.resolve(__dirname, '../.env')
//after getting the file, read the fikle contents,
//then make them keys and values of the node.js global process.env
const envVariables = fs.readFileSync(envFile, 'utf-8').split('\n')
envVariables.reduce((acc, item) => {
  const [key, value] = item.split('=');
  process.env[key] = value.replace("\r", '');
  return acc;
}, {})

const server = {};
//instantiate the https server
server.httpsServer = https.createServer(
  (req, res) => unifiedServer(req, res))

//read from key and certificate for https route
server.httpsOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/certificate.pem')
};


//create http server function
server.httpServer = http.createServer(
  (req, res) => server.unifiedServer(req, res));


//all server logic goes in here
server.unifiedServer = function (req, res) {
  //get url user is navigating to
  const parsedUrl = url.parse(req.url, true);

  //get parsed url and get its query string
  const queryString = parsedUrl.query;

  //get path name from parsed url 
  const pathName = parsedUrl.pathname;

  //trim path name of non-necessities
  const trimmedName = pathName.replace(/^\/+|\/+$/g, '');

  //get method requested by user
  const method = req.method.toLowerCase();

  const headers = req.headers;

  //initialize user's payload to a string
  let payloadString = '';

  //initialize decoder for payload;
  const decoder = new Decoder('utf-8')

  req.on('data', function (data) {
    payloadString += decoder.write(data);

  })


  req.on('end', function () {
    payloadString += decoder.end();

    //get selected router, default to not found if a non-existent route is selected
    let selectedRouter = typeof server.router[trimmedName] !== 'undefined' ? server.router[trimmedName] : routeHandlers.pathNotFound;
    
    //if selected router is any folder in the public directory, default to public directory
    selectedRouter = trimmedName.indexOf('public/') !== -1 ? routeHandlers.public : selectedRouter; 
    
    //fill the data object with information gotten from request
    const data = {
      'trimmedName': trimmedName,
      'queryString': queryString,
      'method': method,
      'headers': headers,
      'payload': aux.parseJsonToObject(payloadString),
    }

    //construct function for selected router with data object to get payload and status code and content type
    selectedRouter(data, function (statusCode, payload, contentType) {
      statusCode = typeof statusCode === 'number' ? statusCode : 200;
      contentType = typeof contentType === 'string' ? contentType : 'json';
      
      payloadString = '';

      //if content type is JSON
      if (contentType === 'json') {
        res.setHeader('Content-Type', 'application.json');
        payload = typeof payload === 'object' ? payload : {};
        payloadString = JSON.stringify(payload);
      }

      //if content type is html
      if (contentType === 'html') {
        res.setHeader('Content-Type', 'text/html');
        payloadString = typeof payload === 'string' ? payload : '';
      }

      //if content is plain
      if(contentType == 'plain'){
        res.setHeader('Content-Type', 'text/plain');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      //if content type is css
      if(contentType == 'css'){
        res.setHeader('Content-Type', 'text/css');
        payloadString = typeof(payload) !== 'undefined' ? payload : '';
      }

      res.writeHead(statusCode);
      res.end(payloadString);

      console.log('The server is running with this response: ', statusCode + ' ' + trimmedName, method)
    })

  })
}

//define available routes and their handlers
server.router = {
  'public' : routeHandlers.public,
  '' : routeHandlers.index,
  'account/create' : routeHandlers.accountCreate,
  'account/edit' : routeHandlers.accountEdit,
  'account/deleted' : routeHandlers.accountDeleted,
  'session/create' : routeHandlers.sessionCreate,
  'session/deleted' : routeHandlers.sessionDeleted,
  'menu/all' : routeHandlers.menuList,
  'orders/create' : routeHandlers.ordersCreate,
  'orders/edit' : routeHandlers.ordersEdit,
  'orders/view' :routeHandlers.orderView,
  'checkout/create' : routeHandlers.checkoutCreate,
  'payment/complete' : routeHandlers.paymentComplete,
  'api/users': routeHandlers.users,
  'api/tokens': routeHandlers.tokens,
  'api/menu': routeHandlers.menu,
  'api/shop': routeHandlers.shop,
  'api/checkout': routeHandlers.checkout
};

server.init = function () {

//start up  the http server
server.httpServer.listen(+process.env.HttpPort, function () {
  console.log(`HTTP server started and running on port ${+process.env.HttpPort}`);
})

//start up the https server
server.httpsServer.listen(+process.env.HttpsPort, function () {
  console.log(`HTTPS server started and running on port ${+process.env.HttpsPort}`);
})
}

module.exports = server;
