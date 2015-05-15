//1
exports.change = function (i) {

    var q = i / 25;
    var remainder = i % 25;

    var d = remainder / 10;
    remainder = remainder % 10;

    var n = remainder / 5;

    var p = remainder % 5;

    return [Math.floor(q), Math.floor(d), Math.floor(n), Math.floor(p)];
};


//2
exports.stripQuotes = function (s) {
    return s.replace(/['"]/gi, "");
};


//3
//very similar to: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
//blended first and second comment
//liked the readability of the first but the conciseness of the second
exports.scramble = function (s) {
    var chars = s.split("");

    var index = chars.length, random;
    var placeholder;

    while (0 != index) {

        random = Math.floor(Math.random() * index);

        //Index sets limit, stops repeat characters
        index -= 1;

        placeholder = chars[index];
        chars[index] = chars[random];
        chars[random] = placeholder;
    }

    return chars.join("");
};


 //4
exports.powersOfTwo = function (i, f) {
    var x = 1
    while (x <= i) {
        f(x);
        x = x + x;
    }
};

//5
exports.prefixes = function (s, f) {
    var end = 1;
    var out = s;

    while (end <= s.length) {
        f(out.slice(0,end));
        end++;
    }
};


//6
var interleave = exports.interleave = function (x, y) {
    var result = [];
    var limit = Math.max(x.length, y.length)

    for (var i = 0; i < limit; i++) {
        if (i < x.length) {
          result.push(x[i]);  
        } 
        if (i < y.length) {
          result.push(y[i]);
        } 
    }

    return result;
};


//7
exports.stutter = function (array) {
    return interleave(array, array);
};


