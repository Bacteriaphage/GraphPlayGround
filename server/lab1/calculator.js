var calMod = {};

calMod.add = function(first, second){
    return Number(first)+Number(second);
};

calMod.minus = function(first, second){
    return Number(first)-Number(second);
};

calMod.divide = function(first, second){
    if(second == 0){
        alert("divide by zero");
    }
    else{
        return Number(first) / Number(second);
    }
}

calMod.multiple = function(first, second){
    return Number(first) * Number(second);
}

module.exports = calMod;
