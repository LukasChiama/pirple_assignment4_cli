//load dependencies for route handlers library
const _data = require('./data');
const aux = require('./auxFunctions');

//create routeHandlers object
routeHandlers = {};


// Index
routeHandlers.index = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Pizza Universe',
      'head.description': 'We believe you should always be satisfied. This is why we offer the best pizzas available anywhere at the best price. Make your order and you can pay with your card. No hassles',
      'body.class': 'index'
    };
    // Read in a template as a string
    aux.getTemplate('index', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create Account
routeHandlers.accountCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.',
      'body.class': 'accountCreate'
    };
    // Read in a template as a string
    aux.getTemplate('accountCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Create New Session
routeHandlers.sessionCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Login to your account.',
      'head.description': 'Please enter your email address and password to log in your account.',
      'body.class': 'sessionCreate'
    };
    // Read in a template as a string
    aux.getTemplate('sessionCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Session has been deleted
routeHandlers.sessionDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Logged Out',
      'head.description': 'You have been logged out. We hope to see you soon.',
      'body.class': 'sessionDeleted'
    };
    // Read in a template as a string
    aux.getTemplate('sessionDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Edit Your Account
routeHandlers.accountEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Account Settings',
      'body.class': 'accountEdit'
    };
    // Read in a template as a string
    aux.getTemplate('accountEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


//Account Deleted
routeHandlers.accountDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Account Deleted',
      'head.description': 'Though we\'re sorry to see you go, your account has been deleted successfully.',
      'body.class': 'accountDeleted'
    };
    // Read in a template as a string
    aux.getTemplate('accountDeleted', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Create an order
routeHandlers.ordersCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Fill your shopping cart with an order',
      'body.class': 'ordersCreate'
    };
    // Read in a template as a string
    aux.getTemplate('ordersCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


//order Dashboard
routeHandlers.menuList = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Dashboard',
      'body.class': 'menuList'
    };
    // Read in a template as a string
    aux.getTemplate('menuList', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


//edit an order
routeHandlers.ordersEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Edit a cart',
      'body.class': 'ordersEdit'
    };
    // Read in a template as a string
    aux.getTemplate('ordersEdit', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


//Order Created
routeHandlers.orderView = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Your shopping cart has been created successfully',
      'head.description': 'You have selected the following items for your cart. Please either proceed to checkout to pay or go back to edit the items in your cartYou have selected the following pizza flavors for your cart. Please either proceed to checkout to pay or go back to edit the items in your cart',
      'body.class': 'orderView'
    };
    // Read in a template as a string
    aux.getTemplate('orderView', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};



//edit an order
routeHandlers.checkoutCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Make payment for your order to receive your purchase receipt',
      'body.class': 'checkoutCreate'
    };
    // Read in a template as a string
    aux.getTemplate('checkoutCreate', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


//Payment successful
routeHandlers.paymentComplete = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Prepare data for interpolation
    const templateData = {
      'head.title': 'Payment Successful! Enjoy your order!',
      'body.class': 'paymentComplete'
    };
    // Read in a template as a string
    aux.getTemplate('paymentComplete', templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        aux.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Public assets
routeHandlers.public = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == 'get') {
    // Get the filename being requested
    const trimmedAssetName = data.trimmedName.replace('public/', '').trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      aux.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {

          // Determine the content type (default to plain text)
          let contentType = 'plain';

          if (trimmedAssetName.indexOf('.css') > -1) {
            contentType = 'css';
          }
          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }

  } else {
    callback(405);
  }
};


//define a function to handle user requests and decide which operation to perform on token
routeHandlers.users = function (data, callback) {

  //define allowed methods and call relevant function for selected method
  const allowedMethods = ['post', 'get', 'put', 'delete'];

  //if method requested by user is one of the allowed methods then pass it on to the relevant function
  if (allowedMethods.indexOf(data.method) > -1) {
    routeHandlers._users[data.method](data, callback)

    //else callback 504
  } else {
    callback(405);
  }
}

routeHandlers._users = {};

//function for handling post requests
//required fields = fullname, email address, address & password
routeHandlers._users.post = function (data, callback) {
  const firstName = typeof data.payload.firstName === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof data.payload.lastName === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;
  const address = typeof data.payload.address === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  const password = typeof data.payload.password === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  //check to see the user provided all required fields
  if (firstName && lastName && email && address && password) {
    //read from users to confirm email does not already exist. Flag an error if it does
    _data.read('users', email, function (err) {
      if (err) {
        //hash the user's password
        const hashedPwd = aux.hashPassword(password);
        if (hashedPwd) {
          const time = Date.now();
          console.log(time);
          //create an object to hold user data
          const userObject = {
            'firstName': firstName,
            'lastName': lastName,
            'email': email,
            'address': address,
            'password': hashedPwd,
            'time': time
          }

          //write the data to the users directory
          _data.create('users', email, userObject, function (err) {
            if (!err) {
              callback(200)
            } else {
              callback(500, { 'Error': 'Could not write new user to directory' })
            }
          });
        } else {
          callback(400, { 'Error': 'Could not hash user\'s password' })
        }
      } else {
        callback(400, { 'Error': 'A user with the provided email address exists. Please select another email address' })
      }
    });
  } else {
    callback(400, { 'Error': 'Required fields are missing or invalid' })
  }
}


//function for handling get requests on users
//required fields = email address
routeHandlers._users.get = function (data, callback) {
  const email = typeof data.queryString.email === 'string' && data.queryString.email.trim().length > 0 && data.queryString.email.includes('@') && data.queryString.email.includes('.') ? data.queryString.email.trim() : false;

  if (email) {

    //confirm that token provided in the header is valid and belongs to the user
    const token = typeof data.headers.token === 'string' ? data.headers.token : false;
    routeHandlers._token.verifyToken(token, email, function (tokenIsValid) {
      if (tokenIsValid) {

        _data.read('users', email, function (err, data) {
          if (!err && data) {
            delete data.hashedPwd;
            callback(200, data)
          } else {
            callback(400, { 'Error': 'Could not find specified user' })
          }
        });
      } else {
        callback(403, { 'Error': 'It appears you aren\'t logged in. Hit the login button' })
      }
    });
  } else {
    callback(400, { 'Error': "Please provide required query!" })
  }
}


//function for updating user
//required fields: email address
//optional fields: first name, last name, address and password
routeHandlers._users.put = function (data, callback) {
  const firstName = typeof data.payload.firstName === 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  const lastName = typeof data.payload.lastName === 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;
  const address = typeof data.payload.address === 'string' && data.payload.address.trim().length > 0 ? data.payload.address.trim() : false;
  const password = typeof data.payload.password === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (email) {

    //confirm that token provided in the header is valid and belongs to the user
    const token = typeof data.headers.token === 'string' ? data.headers.token : false;
    routeHandlers._token.verifyToken(token, email, function (tokenIsValid) {
      if (tokenIsValid) {

        //check if user provided an email. Flag error is no email was provided
        _data.read('users', email, function (err, data) {
          //check if the provided email matches any user in the database
          if (!err && data) {
            //check if user has provided at least one field for updating. Flag an error if not
            if (firstName || lastName || address || password) {
              //write in the new values provided by the user
              if (firstName) {
                data.firstName = firstName;
              }
              if (lastName) {
                data.lastName = lastName;
              }
              if (address) {
                data.address = address;
              }
              if (password) {
                data.password = aux.hashPassword(password);
              }

              _data.update('users', email, data, function (err) {
                if (!err) {
                  callback(200);
                } else {
                  callback(500, { 'Error': 'Could not update user' });
                }
              });
            } else {
              callback(400, { 'Error': 'Please provide additional field to update' })
            }
          } else {
            callback(400, { 'Error': 'Specified user not found. Please check provided email' })
          }
        });
      } else {
        callback(403, { 'Error': 'It appears you aren\'t logged in. Hit the login button' })
      }
    });
  } else {
    callback(400, { 'Error': 'Required email not provided. Please provide email to continue' })
  }
}


//function for deleting user
//required field: email
//optional field: none
routeHandlers._users.delete = function (data, callback) {
  const email = typeof data.queryString.email === 'string' && data.queryString.email.trim().length > 0 && data.queryString.email.includes('@') && data.queryString.email.includes('.') ? data.queryString.email.trim() : false;

  //check to ensure user has provided valid email address
  if (email) {

    //confirm that token provided in the header is valid and belongs to the user
    const token = typeof data.headers.token === 'string' ? data.headers.token : false;
    routeHandlers._token.verifyToken(token, email, function (tokenIsValid) {
      if (tokenIsValid) {

        //confirm that email provided exists in the database if the token is valid
        _data.read('users', email, function (err, data) {
          if (!err && data) {

            //if user with provided email exists and there is associated data, then delete user
            _data.delete('users', email, function (err) {
              if (!err) {
                callback(200);
              } else {
                callback(500, { 'Error': 'Could not delete specified user' })
              }
            })
          } else {
            callback(400, { 'Error': 'Specified user not found. Please check provided email' })
          }
        });
      } else {
        callback(403, { 'Error': 'It appears you aren\'t logged in. Hit the login button to do so.' })
      }
    });
  } else {
    callback(400, { 'Error': 'Required email not provided. Please provide email to continue' })
  }
}

//write a function to handle token requests and decide which operation to perform on token
routeHandlers.tokens = function (data, callback) {
  //define allowed methods
  const allowedMethods = ['post', 'get', 'put', 'delete'];
  //determine the method selected by the user and send the request to the necessary function
  if (allowedMethods.indexOf(data.method) > -1) {
    routeHandlers._token[data.method](data, callback)
  } else {
    callback(504);
  }
}

routeHandlers._token = {};


//define function that will handle requests for creating tokens for registered users
//require fields: email address & password
//no optional fields
routeHandlers._token.post = function (data, callback) {
  const email = typeof data.payload.email === 'string' && data.payload.email.trim().length > 0 && data.payload.email.includes('@') && data.payload.email.includes('.') ? data.payload.email.trim() : false;
  const password = typeof data.payload.password === 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  if (email && password) {

    //check that a user with the provided email address exists. Flag an error if not
    _data.read('users', email, function (err, data) {
      if (!err && data) {

        //hash provided password and confirm it matches the password associated with the user. This will ensure a token cannot be created with a wrong password
        const hashPword = aux.hashPassword(password);
        if (hashPword === data.password) {

          //create a token of length 20 if the password is a match
          const tokenId = aux.createToken(20);

          //set token expiry to 30 minutes from creation time
          const tokenExpiry = Date.now() + 1000 * 60 * 30;

          //create a token object to be saved to the directory
          const tokenObject = {
            'email': email,
            'id': tokenId,
            'tokenExpires': tokenExpiry
          }

          //save the object to the tokens directory
          _data.create('tokens', tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { 'Error': 'Could not create new token' })
            }
          })
        } else {
          callback(406, { 'Error': 'Provided password did not match user\'s stored password' })
        }
      } else {
        callback(402, { 'Error': 'User with specified details does not exist' })
      }
    })
  } else {
    callback(401, { 'Error': 'Required fields not provided' })
  }
}


//define function for getting tokens associated with a user
//required field: token
//no optional fields necessary
routeHandlers._token.get = function (data, callback) {
  const token = typeof data.queryString.token === 'string' && data.queryString.token.trim().length === 20 ? data.queryString.token.trim() : false;

  if (token) {

    //check tokens directory to confirm the provided token exists
    _data.read('tokens', token, function (err, data) {
      if (!err) {

        //if token is found then callback 200 and provide the user with token
        callback(200, data)
      } else {
        callback(404, { 'Error': 'Provided token not found' })
      }
    });
  } else {
    callback(400, { 'Error': 'It appears you aren\'t logged in. Hit the login button' })
  }
}


//define function for extending expiry time of token by an extra 30 minutes
//required fields: token and extends- a boolean
//no optional fields
routeHandlers._token.put = function (data, callback) {
  const token = typeof data.payload.token === 'string' && data.payload.token.trim().length >= 10 ? data.payload.token.trim() : false;
  const extend = typeof data.payload.extend === 'boolean' && data.payload.extend === true ? true : false;

  if (token && extend) {
    _data.read('tokens', token, function (err, data) {
      if (!err && data) {
        if (data.tokenExpires > Date.now()) {
          data.tokenExpires = Date.now() + 1000 * 60 * 30;

          _data.update('tokens', token, data, function (err) {
            if (!err) {
              callback(200)
            } else {
              callback(500, { 'Error': 'Could not update expiry' })
            }
          })
        } else {
          callback(400, { 'Error': 'Cannot update expired token' })
        }
      } else {
        callback(400, { 'Error': 'Specified token does not exist' })
      }
    })
  } else {
    callback(404, { 'Error': 'Required fields missing or invalid' })
  }
}


//define function for deleting tokens.
//require only token from user
routeHandlers._token.delete = function (data, callback) {
  const token = typeof data.queryString.token === 'string' && data.queryString.token.trim().length === 20 ? data.queryString.token.trim() : false;
  if (token) {

    //check to see if token provided is valid
    _data.read('tokens', token, function (err, data) {
      if (!err && data) {

        //if token is valid, then delete associated token data from the directory
        _data.delete('tokens', token, function (err) {
          if (!err) {

            //callback 200 if deletion was successful
            callback(200)
          } else {
            callback(500, { 'Error': 'Could not delete token' })
          }
        })
      } else {
        callback(400, { 'Error': 'Specified field not found' })
      }
    })
  } else {
    callback(400, { 'Error': 'Missing required field' })
  }
}



//define a function that will return an object containig available Pizza menu items to a logged in user
//users will be able to choose from three flavors of Pizza that will be available at any given time of the day
//the function will only accept the get method and will require user email and valid token
routeHandlers.menu = function (data, callback) {
  if (data.method === 'get') {
    const email = typeof data.queryString.email === 'string' && data.queryString.email.trim().length > 0 && data.queryString.email.includes('@') && data.queryString.email.includes('.') ? data.queryString.email.trim() : false;

    //check to ensure user has provided a valid email address
    if (email) {

      //confirm that token provided in the header is valid and belongs to the user
      const token = typeof data.headers.token === 'string' ? data.headers.token : false;
      routeHandlers._token.verifyToken(token, email, function (tokenIsValid) {
        if (tokenIsValid) {

          //create object that will hold piza menu items

          //Get the current time of day by hours. If it isn't noon yet then provide customer with morning pizza menu
          const time = new Date().getHours();
          if (time < 12) {
            _data.read('menu', 'breakfastmenu', function (err, data) {
              if (!err && data) {
                callback(200, data)
              } else {
                callback(500, { 'Error': 'Could not read menu from directory' })
              }
            })
          } else {
            _data.read('menu', 'dinnermenu', function (err, data) {
              if (!err && data) {
                callback(200, data)
              } else {
                callback(500, { 'Error': 'Could not read menu from directory' })
              }
            })
          }
        } else {
          callback(403, { 'Error': 'It appears you aren\'t logged in. Hit the login button' })
        }
      });
    } else {
      callback(400, { 'Error': 'User email is required to process your order. Please provide a valid registered email address' })
    }
  } else {
    callback(405)
  }
}


//write a function to handle shop requests and decide which operation to perform
routeHandlers.shop = function (data, callback) {
  //define allowed methods
  const allowedMethods = ['post', 'get', 'put', 'delete'];
  //determine the method selected by the user and send the request to the necessary function
  if (allowedMethods.indexOf(data.method) > -1) {
    routeHandlers._shop[data.method](data, callback)
  } else {
    callback(504);
  }
}

routeHandlers._shop = {};


//Define function that will allow logged in customers to create new orders
//Customers will be required to provide email address and token for verification of their order
//They will also have to provide details of their order, depending on the available pizzas
routeHandlers._shop.post = function (data, callback) {
  const butternut = typeof data.payload.butternut === 'number' && data.payload.butternut >= 0 ? data.payload.butternut : 0;
  const chicken = typeof data.payload.chicken === 'number' && data.payload.chicken >= 0 ? data.payload.chicken : 0;
  const sweet = typeof data.payload.sweet === 'number' && data.payload.sweet >= 0 ? data.payload.sweet : 0;
  const grilled = typeof data.payload.grilled === 'number' && data.payload.grilled >= 0 ? data.payload.grilled : 0;
  const macaroni = typeof data.payload.macaroni === 'number' && data.payload.macaroni >= 0 ? data.payload.macaroni : 0;
  const cheese = typeof data.payload.cheese === 'number' && data.payload.cheese >= 0 ? data.payload.cheese : 0;

  //confirm that token provided in the header is valid and belongs to the user
  const token = typeof data.headers.token === 'string' ? data.headers.token : false;
  _data.read('tokens', token, function (err, tokenData) {
    if (!err && tokenData) {
      const email = tokenData.email

      // Lookup the user data
      _data.read('users', email, function (err, userData) {
        if (!err && userData) {
          const userOrder = typeof (userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];
          const time = new Date().getHours();
          const orderTime = Date.now();
          if (time < 12) {

            //check to ensure order does not contain unavailable items
            if (butternut || chicken || sweet && !grilled && !macaroni && !cheese) {

              //create a unique id to identify shopping cart and allow user perform operations on ordered items
              const orderId = aux.createToken(10);
              //calculate total cost of order items
              const totalCost = (chicken * 6) + (butternut * 5) + (sweet * 7)

              //create object to hold new order
              const orderObject = {
                'email': email,
                'butternut': '$' + (butternut * 5),
                'chicken': '$' + (chicken * 6),
                'sweet': '$' + (sweet * 7),
                'TotalCost': '$' + totalCost,
                'OrderId': orderId,
                'orderTime': orderTime
              }
              //write order to folder and callback success or otherwise of the function
              _data.create('shoppingCart', orderId, orderObject, function (err) {
                if (!err) {
                  userData.order = userOrder;
                  userData.order.push(orderId);

                  //update the user with the new order
                  _data.update("users", email, userData, function (err) {
                    if (!err) {
                      callback(200, orderObject)
                    } else {
                      callback(500, { "Error": "Could not update user with new order." })
                    }
                  });
                } else {
                  callback(500, { 'Error': 'Could not create new order' })
                }
              })
            } else {
              callback(400, { 'Error': 'Shopping cart contains pizza orders that are not currently available or a negative order quantity. Please refer to menu to see available orders and/or make order quantity positive' })
            }
          } else {
            if (grilled || macaroni || cheese && !butternut && !chicken && !sweet) {
              //create a unique id to identify shopping cart and allow user perform operations on ordered items
              const orderId = aux.createToken(10);
              //calculate total cost of order items
              const totalCost = (cheese * 6) + (macaroni * 5) + (grilled * 8)

              //create object to hold new order
              const orderObject = {
                'email': email,
                'grilled': '$' + (grilled * 8),
                'macaroni': '$' + (macaroni * 5),
                'cheese': '$' + (cheese * 6),
                'TotalCost': '$' + totalCost,
                'OrderId': orderId,
                'orderTime': orderTime
              }
              //write order to folder and callback success or otherwise of the function
              _data.create('shoppingCart', orderId, orderObject, function (err) {
                if (!err) {
                  userData.order = userOrder;
                  userData.order.push(orderId);

                  //update the user with the new order
                  _data.update("users", email, userData, function (err) {
                    if (!err) {
                      callback(200, orderObject)
                    } else {
                      callback(500, { "Error": "Could not update user with new order" })
                    }
                  });
                } else {
                  callback(500, { 'Error': 'Could not create new order' })
                }
              })
            } else {
              callback(400, { 'Error': 'Shopping cart contains pizza orders that are currently unavailable or a negative order quantity. Please refer to menu to see available orders and/or make order quantity positive' })
            }
          }
        } else {
          callback(400, { 'Error': 'Could not find user with specified token' })
        }
      });
    } else {
      callback(400, { 'Error': 'It appears you aren\'t logged in. Hit the login button' })
    }
  });
}



//define function for getting user's shopping cart and the items ordered
//the function will accept the user's email, shopping cart id and token
routeHandlers._shop.get = function (data, callback) {
  const orderId = typeof data.queryString.orderId === 'string' && data.queryString.orderId.trim().length === 10 ? data.queryString.orderId.trim() : false;

  if (orderId) {

    const token = typeof data.headers.token === 'string' ? data.headers.token : false;

    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        const email = tokenData.email;
        _data.read("users", email, function (err, userData) {
          if (!err && userData) {
            _data.read('shoppingCart', orderId, function (err, data) {
              if (!err && data) {
                callback(200, data);
              } else {
                callback(500, { 'Error': 'Could not find specified order item. Please check provided Order Id' })
              }
            });
          } else {
            callback(403, { 'Error': 'It appear you aren\'t logged in' })
          }
        });
      } else {
        callback(400, { "Error": "Please login with correct details" })
      }
    });
  } else {
    callback(400, { 'Error': 'Please provide valid, registered email' })
  }
}


//define function to modify shopping cart items
//function will require user email, order id and a valid token
//Any of the items can be modified so far it is available on the menu
routeHandlers._shop.put = function (data, callback) {
  const butternut = typeof data.payload.butternut === 'number' && data.payload.butternut >= 0 ? data.payload.butternut : false;
  const chicken = typeof data.payload.chicken === 'number' && data.payload.chicken >= 0 ? data.payload.chicken : false;
  const sweet = typeof data.payload.sweet === 'number' && data.payload.sweet >= 0 ? data.payload.sweet : false;
  const grilled = typeof data.payload.grilled === 'number' && data.payload.grilled >= 0 ? data.payload.grilled : false;
  const macaroni = typeof data.payload.macaroni === 'number' && data.payload.macaroni >= 0 ? data.payload.macaroni : false;
  const cheese = typeof data.payload.cheese === 'number' && data.payload.cheese >= 0 ? data.payload.cheese : false;

  //check to ensure user has provided a valid email address
  if (butternut || chicken || sweet || grilled || macaroni || cheese) {

    //confirm that token provided in the header is valid and belongs to the user
    const token = typeof data.headers.token === 'string' ? data.headers.token : false;
    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        const email = tokenData.email
        _data.read("users", email, function (err, userData) {
          if (!err && userData) {
            //get order Id from user object
            const orderId = userData.order[0];

            //read through shopping carts to find specified cart
            _data.read('shoppingCart', orderId, function (err, data) {
              if (!err && data) {
                //check time of day to determine available orders
                const time = new Date().getHours();
                //if it's still morning, then check to ensure morning menu items are ordered
                if (time < 12) {
                  if (butternut || chicken || sweet) {
                    if (butternut >= 0) {
                      data["butternut"] = '$' + butternut * 5;
                    }
                    if (chicken) {
                      data["chicken"] = '$' + chicken * 6;
                    }
                    if (sweet) {
                      data["sweet"] = '$' + sweet * 7;
                    }

                    //calculate cost of orders made
                    const total = (butternut * 5) + (chicken * 6) + (sweet * 7);

                    //if order contains items from another menu then delete those items
                    delete data.TotalCost;
                    delete data["grilled"];
                    delete data["macaroni"];
                    delete data["cheese"];

                    //update shopping cart with new items
                    data.TotalCost = '$' + total;
                    _data.update('shoppingCart', orderId, data, function (err) {
                      if (!err) {
                        callback(200, data);
                      } else {
                        callback(500, { 'Error': 'Could not update shopping cart with specified items' })
                      }
                    });
                  }
                } else {
                  //it's it noon, then check to ensure customer orders pizzas available in dinner menu
                  if (grilled || macaroni || cheese) {
                    if (grilled >= 0) {
                      data["grilled"] = '$' + grilled * 8;
                    }
                    if (macaroni >= 0) {
                      data["macaroni"] = '$' + macaroni * 5;
                    }
                    if (cheese >= 0) {
                      data["cheese"] = '$' + cheese * 6;
                    }
                    //find total cost or order made
                    const total = (grilled * 8) + (macaroni * 5) + (cheese * 6);

                    //delete items from another order that aren't currently available on the menu
                    delete data.TotalCost;
                    delete data["sweet"];
                    delete data["chicken"];
                    delete data["butternut"];

                    //update shopping cart with current items
                    data.TotalCost = '$' + total;
                    _data.update('shoppingCart', orderId, data, function (err) {
                      if (!err) {
                        callback(200, data)
                      } else {
                        callback(500, { 'Error': 'Could not update shopping cart with specified items' })
                      }
                    })
                  }
                }
              } else {
                callback(400, { 'Error': 'Order Id provided does not match any shopping Cart' })
              }
            });
          } else {
            callback(400, { "Error": "Could not find user with specified token. Please provide correct login details" })
          }
        })
      } else {
        callback(400, { 'Error': 'It appears you aren\'t logged in' })
      }
    })

  }
}


//define function that will allow deleting items from shopping cart
//function will take the user's email, login token and order ID
routeHandlers._shop.delete = function (data, callback) {
  const orderId = typeof data.queryString.orderId === 'string' && data.queryString.orderId.trim().length === 10 ? data.queryString.orderId.trim() : false;

  if (orderId) {

    _data.read("shoppingCart", orderId, function (err, orderData) {
      if (!err && data) {
        //confirm that token provided is valid and belongs to the user
        const token = typeof data.headers.token === 'string' ? data.headers.token : false;
        routeHandlers._token.verifyToken(token, orderData.email, function (tokenIsValid) {
          if (tokenIsValid) {

            //if token is valid then delete the shopping cart, else flag an error
            _data.delete('shoppingCart', orderId, function (err) {
              if (!err) {

                //look up user with the shopping cart and delete cart from user object
                _data.read("users", orderData.email, function (err, userData) {
                  if (!err && userData) {
                    const userOrder = typeof (userData.order) == 'object' && userData.order instanceof Array ? userData.order : [];

                    // Remove the deleted check from their list of order
                    const orderPos = userOrder.indexOf(orderId);
                    if (orderPos > -1) {
                      userOrder.splice(orderPos, 1);
                      // Re-save the user's data
                      userData.order = userOrder;
                      _data.update('users', orderData.email, userData, function (err) {
                        if (!err) {
                          callback(200)
                        } else {
                          callback(500, { "Error": "Could not delete the order from the user object" })
                        }
                      })
                    } else {
                      callback(400, { "Error": "Could not find user with deleted cart" })
                    }
                  }
                })
              } else {
                callback(500, { 'Error': 'Could not delete shopping cart' })
              }
            })
          } else {
            callback(403, { 'Error': 'You\re not logged in. Please log in.' })
          }
        });
      } else {
        callback(400, { 'Error': 'Please provide valid email address and order Id' })
      }
    });
  } else {
    callback(400, { "Error": "Could not find specified shopping cart." })
  }
}


//routeHandlers.checkout = {};

//define a function that will allow users pay for pizza ordered. Only post method is allowed
//The function will take in the user's token, orderId, order cost and card details
routeHandlers.checkout = function (data, cb) {
  //check to ensure post method is selected
  if (data.method === 'post') {
    const cardNumber = typeof data.payload.cardNumber === 'string' && data.payload.cardNumber.trim().length > 10 && data.payload.cardNumber.trim().length < 17 ? data.payload.cardNumber.trim() : false;
    const cardExpiryYear = typeof data.payload.cardExpiryYear === 'string' && data.payload.cardExpiryYear.trim().length === 4 ? data.payload.cardExpiryYear.trim() : false;
    const cardExpiryMonth = typeof data.payload.cardExpiryMonth === 'string' && data.payload.cardExpiryMonth.trim().length === 2 ? data.payload.cardExpiryMonth.trim() : false;
    const cardCvv = typeof data.payload.cardCvv === 'string' && data.payload.cardCvv.trim().length === 3 ? data.payload.cardCvv.trim() : false;

    if (cardNumber && cardExpiryYear && cardExpiryMonth && cardCvv) {

      //check to ensure card has not expired
      const year = new Date().getFullYear();
      const month = new Date().getMonth();
      if (year < Number(cardExpiryYear) || (year === Number(cardExpiryYear) && month < Number(cardExpiryMonth))) {

        //confirm that token provided is valid and belongs to the user
        const token = typeof data.headers.token === 'string' ? data.headers.token : false;
        _data.read("tokens", token, function (err, tokenData) {
          if (!err && tokenData) {
            const email = tokenData.email;

            _data.read("users", email, function (err, userData) {
              if (!err && userData) {
                const orderId = userData.order[0];
                //check the shopping cart to ensure amount entered by customer matches amount on cart
                _data.read('shoppingCart', orderId, function (err, shopData) {
                  if (!err && shopData) {
                    const charge = Number(((shopData.TotalCost).slice(1)) + '.00');
                    //call function to charge card with stripe api
                    aux.makeStripeCharge(email, charge, err => {
                      if (!err) {
                        console.log('Your credit card with number ' + cardNumber + ' has been charged $' + charge + ' for your pizza order. Thank you for your patronage!');

                        //call function to send receipt to customer's email address
                        aux.sendEmail(email, charge, orderId, err => {
                          if (!err) {
                            //call the delete order function if email was successfully sent
                            //add order id to queryString
                            data.queryString.orderId = orderId;
                            //delete objects not needed from the data objects
                            delete data.trimmedName;
                            delete data.method;
                            delete data.payload;
                            //call the function
                            routeHandlers._shop.delete(data, callback => {
                              //if the callback is 200, then call back 200
                              if (callback === 200) {
                                cb(200)
                              } else {
                                cb(500)
                              }
                            })
                            console.log("Email with order receipt successfully sent to " + email + "!")
                          } else {
                            console.log(err)
                            cb(500, { 'Error': 'Could not send email with receipt to customer' })
                          }
                        })
                      } else {
                        console.log(err);
                        cb(500, { 'Error': 'Could not process charge' })
                      }
                    });
                  } else {
                    cb(400, { 'Error': 'Could not read the user\'s shopping cart' })
                  }
                })
              } else {
                cb(400, { "Error": "Could not find user with matching credentials" })
              }
            })
          } else {
            cb(400, { 'Error': "You're not logged in. Please hit the login button" })
          }
        })
      } else {
        cb(400, { 'Error': 'Credit card has expired. Please provide valid card for payment' })
      }
    } else {
      cb(400, { 'Error': 'Required fields not provided' })
    }
  } else {
    cb(400, { 'Error': 'Selected method is not allowed' })
  }
}

//define function for verifying that tokens aren't expired when they are used to perform operations on user data
//the function will accept token, email and a callback as parameters
routeHandlers._token.verifyToken = function (token, email, callback) {

  //check the directory to ensure the token exists
  _data.read('tokens', token, function (err, data) {
    if (!err && data) {

      //check provided email to confirm it matches the user email in the directory
      //check time of token expiry to confirm it hasn't expired already. Only continue if token expiry time is ahead of current time
      if (data.email === email && data.tokenExpires > Date.now()) {

        //if both conditions are met, then pass true on to the caller function, otherwise pass false
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  })
}


//if user provides an undefined path then return a 404- path not found!
routeHandlers.pathNotFound = function (data, callback) {
  callback(404);
}

//export routeHandlers library
module.exports = routeHandlers;