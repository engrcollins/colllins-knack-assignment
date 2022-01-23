const fs = require('fs')
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Hello Knack!');
}).listen(8080);

//importing JSON file
var customerData = fs.readFileSync('./mock_application.json', 'utf8');

//parsing JSON file
var modData = JSON.stringify(customerData)
modData = JSON.parse(JSON.parse(modData))
modObjects = modData.versions[0].objects

//removing duplicates in versions' objects
const ids = modObjects.map(o => o._id)
const filteredModObjects = modObjects.filter(({_id}, index) => !ids.includes(_id, index + 1))

//removing duplicates in versions' scenes
modScenes = modData.versions[0].scenes[0].views

const ids2 = modScenes.map(o => o._id)
const filteredModScenes = modScenes.filter(({_id}, index) => !ids2.includes(_id, index + 1))

// replacing with unique values
modData.versions[0].objects = filteredModObjects
modData.versions[0].scenes[0].views = filteredModScenes
modData = JSON.stringify(JSON.stringify(modData))
modData = JSON.parse(modData)

// writing "clean_application.json"
fs.writeFile("clean_application.json", modData, 'utf8', function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }
  console.log("JSON file has been saved.");
  return;
});

//TO DO: Unit tests on the business logic
