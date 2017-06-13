var calMod = require('./calculator.js');
var prompt = require('prompt');

prompt.start();
function run(){
    prompt.get(['first', 'op', 'second'], function(err, result){
        if(result.op == "exit"){
            console.log("exit");
        }else{
            var res = "result is :";
            if(result.op == '+'){
                res += calMod.add(result.first, result.second);
            }else if(result.op == '-'){
                res += calMod.minus(result.first, result.second);
            }else if(result.op == '*'){
                res += calMod.multiple(result.first, result.second);
            }else if(result.op == '/'){
                if(result.second == 0){
                    res = "divide by zero";
                }else{
                    res += calMod.divide(result.first, result.second);
                }
            }
            console.log(res);
            run();
        }
    });
}

run();
