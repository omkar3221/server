exports.addition = function(a,b){
    return parseInt(a)+parseInt(b);
}

exports.subtraction = function(a,b){
    return parseInt(a)-parseInt(b);
}

exports.multiply = function(a,b){
    return parseInt(a)*parseInt(b);
}

exports.divide = function(a,b){
    return parseInt(a)/parseInt(b);
}

exports.square = function(a){
    return parseInt(a*a);
}

exports.sum = function(a,b,...c){
    return parseInt(a) + parseInt(b) +parseInt(c[0])+parseInt(c[1]);
}