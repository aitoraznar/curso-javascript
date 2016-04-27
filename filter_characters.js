var chars = require('./data/characters.json'),
    selectedCharIds = [1009220, 1009351, 1009368, 1009610, 1009664, 1009718];

function isIn(list) {
    return function (obj) {
        return list.indexOf(obj) != -1;
    };
}

function extract(key) {
    return function (obj) {
        return obj[key];
    };
}

function pipe(fn1, fn2) {
    return function (input) {
        return fn2(fn1(input));
    };
}

var selectedChars = chars.filter(pipe(extract('id'), isIn(selectedCharIds)));

console.log(selectedChars);

