/* craft functions that will perform auxilliary functions
 that will allow other functions do their duty*/

//load dependencies
const crypto = require('crypto');
const https = require("https");
const querystring = require("querystring");
const path = require("path");
const fs = require("fs");
const config = require("./config");


const aux = {};


//define function that will json into objects
aux.parseJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
}

//define function that will hash password using the crypto library. This will allow for encrypting passwords
aux.hashPassword = function (str) {
  const hash = crypto.createHmac("SHA256", process.env.hashingSecret).update(str).digest('hex');
  return hash;
}

//define function that will return a random string of characters that will serve as login token and order Id
aux.createToken = function (num) {
  num = typeof num === 'number' && num > 0 ? num : false;
  if (num) {
    //define possible characters for use in generating the string
    const posChar = '010234abcdefghijklmno56789pqrstuvwxyz';
    let str = '';
    //use a for loop to randomly select characters from the list of possible characters
    for (i = 0; i < num; i++) {
      randomChar = posChar.charAt(Math.floor(Math.random() * posChar.length));
      //add randomly selected character to the string being created till it gets to the desired length
      str += randomChar;
    }
    //return the new string to the function that called for it
    return str;

  } else {
    return false;
  }
}

//define function that will take in customer's credit card details and make a charge for the pizzas ordered
aux.makeStripeCharge = function (email, charge, cb) {
  if (email && charge) {

    //define charge parameters
    const chargeData = {
      "amount": charge,
      "currency": "usd",
      "source": process.env.stripe_source,
      "description": "charge for " + email,
    }
    //stringify the data for making the request
    const stringData = querystring.stringify(chargeData)

    //craft the api request
    const request = {
      "protocol": "https:",
      "hostname": "api.stripe.com",
      "method": "POST",
      "path": "/v1/charges",
      "auth": process.env.STRIPE_API_KEY,
      "headers": {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(stringData)
      }
    }

    //make the request using the https protocol
    let req = https.request(request, (res) => {
      res.setEncoding('utf8');
      res.on('data', (data) => {
        const responseObject = aux.parseJsonToObject(data);
        if (responseObject.id) {
          cb(false, responseObject.id);
        } else {
          cb('Request not successful; could not get request ID from stripe');
        }
      });
    });

    //bind the error event to prevent throwing
    req.on('error', (e) => {
      cb(e)
    });

    req.write(stringData);

    req.end();

  } else {
    cb("No email and charge provided")
  }
}

//define function that will send off an email to customers with their order receipt
aux.sendEmail = function (email, charge, orderId, cb) {
  const message = 'Your pizza order with orderId: ' + orderId + ' and cost of $' + charge + ' has been successfully charged to your credit card. Thank you for your continued patronage. Best Pizzas!';

  //stringify parameters for making api call
  const emailData = querystring.stringify({
    'from': 'postmaster@' + process.env.mailGun_domainName,
    'to': email,
    'subject': 'Pizza order Receipt. Id: ' + orderId,
    'text': message,
  });

  //craft the api call
  const request = {
    'protocol': 'https:',
    'hostname': 'api.mailgun.net',
    'method': 'POST',
    'path': '/v3/'+ process.env.mailGun_domainName+'/messages',
    'auth': process.env.MAILGUN_API_KEY,
    'headers': {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(emailData)
    }
  }

  const req = https.request(request, function (res) {
    const status = res.statusCode;

    if (status === 200 || status === 201) {
      cb(false)
    } else {
      cb('Status code returned ' + status)
    }
  });

  req.on('error', (e) => {
    cb(e)
  });

  req.write(emailData);

  req.end();
}


aux.getTemplate = function(templateName, data, callback) {
  templateName = typeof templateName === 'string' && templateName.length > 0 ? templateName : false;
  data = typeof data === 'object' && data !== null ? data : {};

  if (templateName) {
    const templatesDir = path.join(__dirname, '/../templates/');
    fs.readFile(templatesDir+templateName+'.html', 'utf8', function(err, str) {
      if (!err && str && str.length > 0) {
        const finalStr = aux.interpolate(data, str)
        callback(false, finalStr)
      } else {
        callback('No template could be found')
      }
    })
  } else {
    callback ('A valid template name was not defined')
  }
}


aux.addUniversalTemplates = function(str,data,callback){
  str = typeof(str) == 'string' && str.length > 0 ? str : '';
  data = typeof(data) == 'object' && data !== null ? data : {};
  // Get the header
  aux.getTemplate('_header',data,function(err,headerString){
    if(!err && headerString){
      // Get the footer
      aux.getTemplate('_footer',data,function(err,footerString){
        if(!err && footerString){
          // Add them all together
          var fullString = headerString+str+footerString;
          callback(false,fullString);
        } else {
          callback('Could not find the footer template');
        }
      });
    } else {
      callback('Could not find the header template');
    }
  });
};


aux.interpolate = function (data, str) {
  data = typeof data === 'object' && data !== null ? data : {};
  str = typeof str === 'string' && str.length > 0 ? str : '';

  for (let keyName in config.templateGlobals) {
    if(config.templateGlobals.hasOwnProperty(keyName)) {
      data['global.'+keyName] = config.templateGlobals[keyName];
    }
  }

  for(let key in data) {
    if(data.hasOwnProperty(key) && typeof(data[key] === 'string')) {
      let find = '{'+key+'}';
      let replace = data[key];
      str = str.replace(find, replace);
    }
  }

  return str;
}

// Get the contents of a static (public) asset
aux.getStaticAsset = function(fileName,callback){
  fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
  if(fileName){
    var publicDir = path.join(__dirname,'/../public/');
    fs.readFile(publicDir+fileName, function(err,data){
      if(!err && data){
        callback(false,data);
      } else {
        callback('No file could be found');
      }
    });
  } else {
    callback('A valid file name was not specified');
  }
};


module.exports = aux;