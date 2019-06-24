const data = require('./filteredCities2.json');
const fs = require('fs').promises;

var filteredUS = data.filter(item => {
    if (item.country == "US") {
        return false;
    } else if (item.country == "CN") {
        return false;
    } else if (item.country == "RU") {
        return false;
    } else if (item.country == "IN") {
        return false;
    } else if (item.country == "BR") {
        return false;
    } else if (item.country == "CA") {
        return false;
    } else if (item.country == "AU") {
        return false;
    } else {
        return true;
    }
});

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

fs.writeFile(__dirname + '/filteredCities3.json', JSON.stringify(filteredDouble, null, 4));
