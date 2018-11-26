//load dependencies necessary for handling data for performing operations
const fs = require('fs');
const path = require('path');
const aux = require('./auxFunctions');

//create lib object for holding functions
const lib = {};

//define base directory as .data folder
lib.baseDir = path.join(__dirname, ('/../.data/'))


//create POST function for creating new items
lib.create = function (dir, file, data, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fd) {
    if (!err && fd) {
      //convert data to json format
      dataString = JSON.stringify(data);

      //write converted json data to folder using the file descriptor
      fs.writeFile(fd, dataString, function (err) {
        if (!err) {

          //close file after writing to it
          fs.close(fd, function (err) {
            if (!err) {
              callback(false)
            } else {
              callback("Error closing file after writing to it")
            }
          })
        } else {
          callback("Error writing to file")
        }
      })
    } else {
      callback("Error opening file for writing")
    }
  })
}

//GET function for reading from directory
lib.read = function (dir, file, callback) {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf-8', function (err, data) {
    if (!err && data) {
      //convert json format data in directory to object for reading
      const parsedData = aux.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback("Error opening file for reading")
    }
  })
}

//POST function for updating items in the directory
lib.update = function (dir, file, data, callback) {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fd) {
    if (!err && fd) {
      //convert data to json
      const dataString = JSON.stringify(data);

      //truncate the file
      fs.truncate(fd, function (err) {
        if (!err) {

          //write in the json format file to the directory
          fs.writeFile(fd, dataString, function (err) {
            if (!err) {

              //close directory after writing to it
              fs.close(fd, function(err) {
                if (!err) {
                  callback(false)
                } else {
                  callback("Error closing file after updating")
                }
              })
            } else {
              callback("Error writing to file for update")
            }
          })
        } else {
          callback("Error truncating file")
        }
      })
    } else {
      callback("Error opening file for updating")
    }
  })
}

//DELETE function for deleting files from the directory
lib.delete = function(dir, file, callback) {
  //use the unlink function to delete from directory
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function (err) {
    if (!err) {
      callback(false)
    } else {
      callback("Error deleting file")
    }
  })
}

//list contents of a directory
lib.list = function (dir, callback) {
  fs.readdir(lib.baseDir + dir + '/', function(err, data){
    if (!err && data && data.length > 0){
      const trimmedNames = [];
      data.forEach(function(fileName) {
        trimmedNames.push(fileName.replace('.json', ''))
      })
      callback(false, trimmedNames);
    } else {
      callback('Error listing directory content')
    }
  })
}


module.exports = lib;