const data = require('./city.list.json');
const fs = require('fs').promises;

var filteredUS = data.filter(item => item.country != "US");

var filteredDouble = [];

for (var i = 0; i < filteredUS.length; i++) {
    var unique = true;

    for (var j = 0; j < filteredDouble.length; j++) {
        if ((filteredUS[i].name === filteredDouble[j].name)) {
            unique = false;
        }
    }

    if (unique) {
        filteredDouble.push(filteredUS[i]);
    }
}

// data = data.filter(
//     (item, index) => data.findIndex(dup => dup.name == item.name) == index
// );

fs.writeFile(__dirname + '/filteredCities.json', JSON.stringify(filteredDouble, null, 4));
