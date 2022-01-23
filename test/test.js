// Requiring module
const assert = require('assert');
const expect = require('chai').expect;
const fs = require('fs')

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


// We can group similar tests inside a describe block
describe("Testing business logic in this app", () => {
      before(() => {
        console.log( "Starting tests..." );
      });
      after(() => {
            console.log( "Tests end!" );
      });
      describe( "Removing duplicates...", () => {
            beforeEach(() => {
              console.log( "\n Case" );
            });
            it("remove all duplicates objects", () => {
                expect(filteredModObjects).to.have.lengthOf.at.most(modObjects.length - 1)
            });
            
            it("remove all duplicates scenes", () => {
                expect(filteredModScenes).to.have.lengthOf.at.most(modScenes.length - 1)
            });
    });
    describe("\n \n Validating JSON file is processed", () => {
        it("Old data has been modified", () => {
            console.log( "\n Case" );
            expect(customerData).to.not.equal(modData)
        });
    });
})