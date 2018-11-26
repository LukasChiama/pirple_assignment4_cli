const os = require('os');
const v8 = require('v8');
const readline = require('readline');
const events = require('events');
class _events extends events { };
const e = new _events();
const _data = require('./data');


const cli = {};

//input handlers

//man page
e.on("man", function (str) {
  cli.responders.help()
});

//help
e.on("help", function (str) {
  cli.responders.help()
});

//exit
e.on("exit", function (str) {
  cli.responders.exit()
});

//stats
e.on("stats", function (str) {
  cli.responders.stats()
});

//stats
e.on("menu", function (str) {
  cli.responders.menu()
});

//list users
e.on("list users", function (str) {
  cli.responders.listUsers()
});

//list recent users
e.on("list recent users", function (str) {
  cli.responders.listRecentUsers()
});

//more user info
e.on("more user info", function (str) {
  cli.responders.moreUserInfo(str)
});

//list orders
e.on("list orders", function (str) {
  cli.responders.listOrders()
});

//list recent orders
e.on("list recent orders", function (str) {
  cli.responders.listRecentOrders()
});

//more order info
e.on("more order info", function (str) {
  cli.responders.moreOrderInfo(str)
});


//Responders
cli.responders = {};


//define function for handling the help or man command
cli.responders.help = function () {
  const commands = {
    'exit': 'Kill the CLI (and the rest of the application)',
    'man': 'Show this help page',
    'help': 'Alias of the "man" command',
    'stats': 'Get statistics on the underlying operating system and resource utilization',
    'menu': 'Get the available menu items',
    'List users': 'Show a list of all the registered (undeleted) users in the system',
    'List Recent Users': 'Show a list of users registered in the last 24 hours',
    'More user info --{userId}': 'Show details of a specific to a particular user on provision of a registered email address',
    'List orders': 'Show a list of all orders made',
    'List recent orders': 'Show a list of orders made within the last 24 hours',
    'More order info --{orderId}': 'Show details specific to a particular order on specifying an order ID'
  };

  //show a header for the help page that is as wide as the screen
  cli.horizontalLine();
  cli.centered('CLI MANUAL');
  cli.horizontalLine();
  cli.verticalSpace(2);

  for (let key in commands) {
    if (commands.hasOwnProperty(key)) {
      const value = commands[key];
      let line = '\x1b[33m ' + key + '\x1b[0m';
      const padding = 60 - line.length;
      for (let i = 0; i < padding; i++) {
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  cli.verticalSpace(1);

  //end with another horizontal line
  cli.horizontalLine();
}


//function for adding horizontal line to help page
cli.horizontalLine = function () {
  //get the available screen size
  const width = process.stdout.columns;
  let line = '';

  for (let i = 0; i < width; i++) {
    line += '-'
  }
  console.log(line);
}


//create centered text on the screen
cli.centered = function (str) {
  str = typeof str == 'string' && str.trim().length > 0 ? str.trim() : '';
  const width = process.stdout.columns;

  const leftPad = Math.floor((width - str.length) / 2);

  let line = '';

  for (let i = 0; i < leftPad; i++) {
    line += ' ';
  }
  line += str;
  console.log(line)
}


//function for adding vertical space in man page
cli.verticalSpace = function (length) {
  length = typeof length === 'number' && length > 0 ? length : 1;
  for (let i = 0; i < length; i++) {
    console.log("")
  }
}

//respond to exit command
cli.responders.exit = function () {
  process.exit(0);
}

//respond to the stats command
cli.responders.stats = function () {
  //compile and objct of stats
  const stats = {
    'Load Average': os.loadavg().join(' '),
    'CPU Count': os.cpus().length,
    'Free Memory': os.freemem(),
    'Current Malloced Memory': v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory': v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used': Math.floor((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
    'Available Heap Allocated': Math.floor((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime': os.uptime() + ' seconds'
  }

  // Create a header for the stats
  cli.horizontalLine();
  cli.centered('SYSTEM STATISTICS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Log out each stat
  for (let key in stats) {
    if (stats.hasOwnProperty(key)) {
      let value = stats[key];
      let line = '\x1b[33m ' + key + '\x1b[0m';
      let padding = 60 - line.length;
      for (i = 0; i < padding; i++) {
        line += ' ';
      }
      line += value;
      console.log(line);
      cli.verticalSpace();
    }
  }
  // Create a footer for the stats
  cli.verticalSpace();
  cli.horizontalLine();
}


//define a function to list available menu items
cli.responders.menu = function () {
  //Get the current time of the day
  const time = new Date().getHours();

  //If it's still morning then get the breakfast menu
  if (time < 12) {
    _data.read('menu', 'breakfastMenu', function (err, menuData) {
      if (!err && menuData) {
        cli.verticalSpace();
        console.dir(menuData, { 'colors': true });
        cli.verticalSpace()
      }
    })
  } else {
    //if it's past 12 noon then get the dinner menu directory
    _data.read('menu', 'dinnerMenu', function (err, menuData) {
      if (!err && menuData) {
        cli.verticalSpace();
        console.dir(menuData, { 'colors': true });
        cli.verticalSpace()
      }
    })
  }
}

//list users created in the last 24 hours
cli.responders.listRecentUsers = function () {
  _data.list('users', function (err, userIds) {
    if (!err && userIds && userIds.length > 0) {
      cli.verticalSpace();

      //loop through the userIds-emails and read them individually
      userIds.forEach(function (userId) {
        _data.read("users", userId, function (err, userData) {
          if (!err && userData) {

            //Get the current time and subtract 24 hours from it
            const validTime = Date.now() - (1000 * 60 * 60 * 24)

            //check if the time the user was created is less than the valid time and log users created within 24 hours
            if (userData.time > validTime) {
              let line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' Email: ' + userData.email + ' Orders:' + ' User Created: ' + new Date(userData.time);
              let numberOfOrders = typeof (userData.order) == 'object' && userData.order instanceof Array && userData.order.length > 0 ? userData.order.length : 0;
              line += numberOfOrders;
              console.log(line);
              cli.verticalSpace();
            }

          }
        })
      })
    }
  })
}


//list all users
cli.responders.listUsers = function () {
  _data.list('users', function (err, userIds) {
    if (!err && userIds && userIds.length > 0) {
      cli.verticalSpace();

      //loop through the userIds-emails and read them individually
      userIds.forEach(function (userId) {
        _data.read("users", userId, function (err, userData) {
          if (!err && userData) {
              let line = 'Name: ' + userData.firstName + ' ' + userData.lastName + ' Email: ' + userData.email + ' Orders:' + ' User Created: ' + new Date(userData.time);
              let numberOfOrders = typeof (userData.order) == 'object' && userData.order instanceof Array && userData.order.length > 0 ? userData.order.length : 0;
              line += numberOfOrders;
              console.log(line);
              cli.verticalSpace();
            }
        })
      })
    }
  })
}


//more user info
cli.responders.moreUserInfo = function (str) {
  const arr = str.split('--');
  const userId = typeof arr[1] == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if (userId) {
    _data.read('users', userId, function (err, userData) {
      if (!err && userData) {
        //delete hashed password before logging directory to the console
        delete userData.password;

        cli.verticalSpace();
        console.dir(userData, { 'colors': true });
        cli.verticalSpace()
      }
    });
  }
}

//list orders that were made in the last 24 hours
cli.responders.listRecentOrders = function (str) {
  _data.list('shoppingCart', function (err, orderIds) {
    if (!err && orderIds && orderIds.length > 0) {
      cli.verticalSpace();
      orderIds.forEach(function (orderId) {
        _data.read('shoppingCart', orderId, function (err, orderData) {

          //Get the time now and subtract 24 hours from it in milliseconds
          const validTime = Date.now() - (1000 * 60 * 60 * 24);

          //if the order was made before then don't log it to the console.
          if (orderData.orderTime > validTime) {
            if (!err && orderData && orderData.butternut) {
              //write the order items to the line variable and log to the console
              let line = 'ID: ' + orderData.OrderId + ' Butternut: ' + orderData.butternut + ' Chicken: ' + orderData.chicken + ' Sweet: ' + orderData.sweet + ' Total: ' + orderData.TotalCost + ' Order Created: ' + new Date(orderData.orderTime);
              console.log(line);
              cli.verticalSpace();
            } else {
              let line = 'ID: ' + orderData.OrderId + ' Macaroni: ' + orderData.macaroni + ' Cheese: ' + orderData.cheese + ' Grilled: ' + orderData.grilled + ' Total: ' + orderData.TotalCost + ' Order Created: ' + new Date(orderData.orderTime);
              console.log(line);
              cli.verticalSpace();
            }
          }
        });
      });
    }
  });
}


//list all orders
cli.responders.listOrders = function (str) {
  _data.list('shoppingCart', function (err, orderIds) {
    if (!err && orderIds && orderIds.length > 0) {
      cli.verticalSpace();
      orderIds.forEach(function (orderId) {
        _data.read('shoppingCart', orderId, function (err, orderData) {
            if (!err && orderData && orderData.butternut) {
              //write the order items to the line variable and log to the console
              let line = 'ID: ' + orderData.OrderId + ' Butternut: ' + orderData.butternut + ' Chicken: ' + orderData.chicken + ' Sweet: ' + orderData.sweet + ' Total: ' + orderData.TotalCost + ' Order Created: ' + new Date(orderData.orderTime);
              console.log(line);
              cli.verticalSpace();
            } else {
              let line = 'ID: ' + orderData.OrderId + ' Macaroni: ' + orderData.macaroni + ' Cheese: ' + orderData.cheese + ' Grilled: ' + orderData.grilled + ' Total: ' + orderData.TotalCost + ' Order Created: ' + new Date(orderData.orderTime);
              console.log(line);
              cli.verticalSpace();
            }
        });
      });
    }
  });
}


//more order info
cli.responders.moreOrderInfo = function (str) {
  const arr = str.split('--');
  const id = typeof arr[1] == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if (id) {
    //read the particular from the database using the id provided and log directory to the console
    _data.read('shoppingCart', id, function (err, orderData) {
      if (!err && orderData) {
        cli.verticalSpace();
        console.dir(orderData, { 'colors': true });
        cli.verticalSpace()
      }
    });
  }
}


//define function for processing input from user
cli.processInput = function (str) {
  str = typeof str == 'string' && str.trim().length > 0 ? str.trim() : false;

  if (str) {
    //defined allowed commands the user can enter
    const allowedCommands = [
      'man',
      'help',
      'exit',
      'stats',
      'menu',
      'list users',
      'list recent users',
      'more user info',
      'list orders',
      'list recent orders',
      'more order info',
    ];

    //order for match among unique inputs
    let match = false;
    allowedCommands.some(function (input) {
      if (str.toLowerCase().indexOf(input) != -1) {
        match = true;

        e.emit(input, str);
        return true;
      }
    });

    if (!match) {
      console.log("Command not recognized. Try another command or type help to get help.")
    }
  }
}

//initialize the cli
cli.init = function () {
  console.log('\x1b[34m%s\x1b[0m', 'The CLI is running');

  //Start the cli interface
  const _interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>'
  })

  //Create the CLI's initial prompt
  _interface.prompt();

  //handle input from the user
  _interface.on('line', function (str) {
    //send user's input to the input processor function
    cli.processInput(str);

    //start the prompt again
    _interface.prompt()
  })

  //handle the user killing the CLI
  _interface.on('close', function () {
    process.exit(0);
  })
}

module.exports = cli;