const app = {};

// Config
app.config = {
  'sessionToken': false
};

// AJAX Client (for RESTful API)
app.client = {}

// Interface for making API calls
app.client.request = function (headers, path, method, queryStringObject, payload, callback) {

  // Set defaults
  headers = typeof (headers) == 'object' && headers !== null ? headers : {};
  path = typeof (path) == 'string' ? path : '/';
  method = typeof (method) == 'string' && ['POST', 'GET', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof (queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof (payload) == 'object' && payload !== null ? payload : {};
  callback = typeof (callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  let requestUrl = path + '?';
  let counter = 0;
  for (let queryKey in queryStringObject) {
    if (queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      // If at least one query string parameter has already been added, preprend new ones with an ampersand
      if (counter > 1) {
        requestUrl += '&';
      }
      // Add the key and value
      requestUrl += queryKey + '=' + queryStringObject[queryKey];
    }
  }

  // Form the http request as a JSON type
  const xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for (let headerKey in headers) {
    if (headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  // If there is a current session token set, add that as a header
  if (app.config.sessionToken) {
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      const statusCode = xhr.status;
      const responseReturned = xhr.responseText;

      // Callback if requested
      if (callback) {
        try {
          const parsedResponse = JSON.parse(responseReturned);
          callback(statusCode, parsedResponse);
        } catch (e) {
          callback(statusCode, false);
        }

      }
    }
  }

  // Send the payload as JSON
  const payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function () {
  document.getElementById("logoutButton").addEventListener("click", function (e) {

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function (redirectUser) {
  // Set redirectUser to default to true
  redirectUser = typeof (redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  const tokenId = typeof (app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  const queryStringObject = {
    'id': tokenId
  };
  app.client.request(undefined, 'api/tokens', 'DELETE', queryStringObject, undefined, function (statusCode, responsePayload) {
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if (redirectUser) {
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function () {
  if (document.querySelector("form")) {

    const allForms = document.querySelectorAll("form");
    for (let i = 0; i < allForms.length; i++) {
      allForms[i].addEventListener("submit", function (e) {

        // Stop it from submitting
        e.preventDefault();
        let formId = this.id;
        let path = this.action;
        let method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#" + formId + " .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if (document.querySelector("#" + formId + " .formSuccess")) {
          document.querySelector("#" + formId + " .formSuccess").style.display = 'none';
        }

        // Turn the inputs into a payload
        let payload = {};
        let elements = this.elements;
        for (let i = 0; i < elements.length; i++) {
          if (elements[i].type !== 'submit') {
            // Determine class of element and set value accordingly
            let classOfElement = typeof (elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            let valueOfElement = elements[i].type == 'number' && classOfElement.indexOf('multiselect') == -1 ? parseInt(elements[i].value) : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            // Override the method of the form if the input's name is _method
            let nameOfElement = elements[i].name;
            if (nameOfElement == '_method') {
              method = valueOfElement;
            } else {
              if (nameOfElement == 'uid') {
                nameOfElement = 'orderId';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if (classOfElement.indexOf('multiselect') > -1) {

              } else {
                payload[nameOfElement] = valueOfElement;
              }
            }
          }
        }


        // If the method is DELETE, the payload should be a queryStringObject instead
        const queryStringObject = method == 'DELETE' ? payload : {};
        // Call the API
        app.client.request(undefined, path, method, queryStringObject, payload, function (statusCode, responsePayload) {
          // Display an error on the form if needed
          if (statusCode !== 200) {

            if (statusCode == 403) {
              // log the user out
              app.logUserOut();

            } else {

              // Try to get the error from the api, or set a default error message
              const error = typeof (responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#" + formId + " .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#" + formId + " .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId, payload, responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function (formId, requestPayload, responsePayload) {
  const functionToCall = false;
  // If account creation was successful, try to immediately log the user in
  if (formId == 'accountCreate') {
    // Take the email and password, and use it to log the user in
    const newPayload = {
      'email': requestPayload.email,
      'password': requestPayload.password
    };

    app.client.request(undefined, 'api/tokens', 'POST', undefined, newPayload, function (newStatusCode, newResponsePayload) {
      // Display an error on the form if needed
      if (newStatusCode !== 200) {

        // Set the formError field with the error text
        document.querySelector("#" + formId + " .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#" + formId + " .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/menu/all';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if (formId == 'sessionCreate') {
    app.setSessionToken(responsePayload);
    window.location = '/menu/all';
  }

  // If forms saved successfully and they have success messages, show them
  const formsWithSuccessMessages = ['accountEdit1', 'accountEdit2', 'ordersEdit1'];
  if (formsWithSuccessMessages.indexOf(formId) > -1) {
    document.querySelector("#" + formId + " .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if (formId == 'accountEdit3') {
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just created a new order successfully, take them to the view orders page
  if (formId == 'ordersCreate') {
    window.location = '/orders/view';
  }

  // If the user just deleted an order, take them to the view orders page
  if (formId == 'ordersEdit2') {
    window.location = '/menu/all';
  }

  // If the user just edited an order, take them to the view orders page
  if (formId == 'ordersEdit1') {
    window.location = '/orders/view';
  }

  //If the user just successfully made a payment for a pizza, shhow a success message
  if (formId == 'checkout') {
    window.location = '/payment/complete';
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function () {
  const tokenString = localStorage.getItem('token');
  if (typeof (tokenString) == 'string') {
    try {
      const token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if (typeof (token) == 'object') {
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    } catch (e) {
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function (add) {
  const target = document.querySelector("body");
  if (add) {
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function (token) {
  app.config.sessionToken = token;
  const tokenString = JSON.stringify(token);
  localStorage.setItem('token', tokenString);
  if (typeof (token) == 'object') {
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function (callback) {
  const currentToken = typeof (app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if (currentToken) {
    // Update the token with a new expiration
    const payload = {
      'token': currentToken.id,
      'extend': true,
    };
    app.client.request(undefined, 'api/tokens', 'PUT', undefined, payload, function (statusCode, responsePayload) {
      // Display an error on the form if needed
      if (statusCode == 200) {
        // Get the new token details
        const queryStringObject = { 'token': currentToken.id };
        app.client.request(undefined, 'api/tokens', 'GET', queryStringObject, undefined, function (statusCode, responsePayload) {
          // Display an error on the form if needed
          if (statusCode == 200) {
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function () {
  // Get the current page from the body class
  const bodyClasses = document.querySelector("body").classList;
  const primaryClass = typeof (bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if (primaryClass == 'accountEdit') {
    app.loadAccountEditPage();
  }

  // Logic for dashboard page
  if (primaryClass == 'menuList') {
    app.loadMenuListPage();
  }

  // Logic for order details page
  if (primaryClass == 'ordersEdit') {
    app.loadOrdersEditPage();
  }

  // Logic for checkout page
  if (primaryClass == 'orderView') {
    app.loadOrdersView();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function () {
  // Get the email number from the current token, or log the user out if none is there
  const email = typeof (app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if (email) {
    // Fetch the user data
    const queryStringObject = {
      'email': email
    };
    app.client.request(undefined, 'api/users', 'GET', queryStringObject, undefined, function (statusCode, responsePayload) {
      if (statusCode == 200) {
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .addressInput").value = responsePayload.address;
        document.querySelector("#accountEdit1 .displayEmailInput").value = responsePayload.email;

        // Put the hidden email field into both forms
        const hiddenEmailInputs = document.querySelectorAll("input.hiddenEmailInput");
        for (let i = 0; i < hiddenEmailInputs.length; i++) {
          hiddenEmailInputs[i].value = responsePayload.email;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the dashboard page specifically
app.loadMenuListPage = function () {
  // Get the email number from the current token, or log the user out if none is there
  const email = typeof (app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if (email) {
    // Fetch the user data
    const queryStringObject = {
      'email': email
    };
    //fetch the available menu items, loop through them and show them on the page
    app.client.request(undefined, 'api/menu', 'GET', queryStringObject, undefined, function (statusCode, responsePayload) {
      if (statusCode == 200) {
        const arr = Object.entries(responsePayload);
        const prop = document.getElementById("menuList");
        const ul = document.createElement("ul");
        prop.appendChild(ul);
        for (let [key, value] of arr) {
          const li = document.createElement("li");
          li.setAttribute("class", "available");
          li.innerHTML = `${key}: ${value}`;
          ul.appendChild(li);
        }
      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};


app.loadOrdersView = function () {
  // Get the email number from the current token, or log the user out if none is there
  const email = typeof (app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  if (email) {
    // Fetch the user data
    const queryStringObject = {
      'email': email
    };
    app.client.request(undefined, 'api/users', 'GET', queryStringObject, undefined, function (statusCode, responsePayload) {
      if (statusCode == 200) {
        const allorders = typeof (responsePayload.order) == 'object' && responsePayload.order instanceof Array && responsePayload.order.length > 0 ? responsePayload.order : [];
        if (allorders.length > 0) {
          // Show each created order as a new row in the table
          allorders.forEach(function (orderId) {
            // Get the data for the order
            const newQueryStringObject = {
              'orderId': orderId
            };
            //fetch the order, loop through and display on the page
            app.client.request(undefined, 'api/shop', 'GET', newQueryStringObject, undefined, function (statusCode, responsePayload) {
              if (statusCode == 200) {
                //if user has orders, display message
                document.getElementById("orderDisplay").style.display = 'block';
                document.getElementById("noOrderDisplay").style.display = 'none';

                const arr = Object.entries(responsePayload);
                const prop = document.getElementById("view");
                const ul = document.createElement("ul");
                prop.appendChild(ul);
                for (let [key, value] of arr) {
                  const li = document.createElement("li");
                  li.setAttribute("class", "views");
                  li.innerHTML = `${key}: ${value}`;
                  ul.appendChild(li);
                }
              } else {
                //Redirect to dashboard if request isn't successful
                window.location = '/menu/all';
              }
            });

          });
        } else {
          //if user has no order then dipslay saying so
          document.getElementById("noOrderDisplay").style.display = 'block';
          document.getElementById("orderDisplay").style.display = 'none';
        }
      } else {
        app.logUserOut();
      }
    });
  }
}


// Load the orders edit page specifically
app.loadOrdersEditPage = function () {
  const email = typeof (app.config.sessionToken.email) == 'string' ? app.config.sessionToken.email : false;
  const newQueryStringObject = {
    "email": email
  }
  app.client.request(undefined, "api/users", "GET", newQueryStringObject, undefined, function (statusCode, responsePayload) {
    if (statusCode === 200) {
      const orderId = responsePayload.order;

      // Fetch the order data
      const queryStringObject = {
        'orderId': orderId
      };
      app.client.request(undefined, "api/shop", "GET", queryStringObject, undefined, function (statusCode, newResponsePayload) {
        if (statusCode == 200) {
          console.log(statusCode, newResponsePayload)
          // Put the hidden id field into both forms
          let hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
          for (let i = 0; i < hiddenIdInputs.length; i++) {
            hiddenIdInputs[i].value = orderId;
          }
          // Put the data into the top form as values where needed
          document.querySelector("#ordersEdit1 .displayIdInput").value = orderId;
          document.querySelector("#ordersEdit1 .butternutInput").value = (newResponsePayload.butternut.slice(1)) / 5;
          document.querySelector("#ordersEdit1 .chickenInput").value = (newResponsePayload.chicken.slice(1)) / 6;
          document.querySelector("#ordersEdit1 .sweetInput").value = (newResponsePayload.sweet.slice(1)) / 7;
          document.querySelector("#ordersEdit1 .macaroniInput").value = (newResponsePayload.macaroni.slice(1)) / 5;
          document.querySelector("#ordersEdit1 .cheeseInput").value = (newResponsePayload.cheese.slice(1)) / 6;
          document.querySelector("#ordersEdit1 .grilledInput").value = (newResponsePayload.grilled.slice(1)) / 8;

        } else {
          // If the request comes back as something other than 200, redirect back to dashboard
          window.location = '/menu/all';
        }
      });

    } else {
      window.location = "menu/all"
    }
  })
};

// Loop to renew token often
app.tokenRenewalLoop = function () {
  setInterval(function () {
    app.renewToken(function (err) {
      if (!err) {
        console.log("Token renewed successfully @ " + Date.now());
      }
    });
  }, 1000 * 60);
};

// Init (bootstrapping)
app.init = function () {

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function () {
  app.init();
};