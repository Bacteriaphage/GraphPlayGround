var Account = {};
var account = require('../resource/model/accounts');

Account.verify = function(email, password, fn){
    account.findOne({email: email, password: password}).then(function(result){
        if(result){
            fn(true);
        } else{
            fn(false);
        }
        console.log(result);
    });
}

Account.addAccount = function(email, password, fn){
    account.findOne({email: email}).then(function(result){
        if(!result){
            var newAccount = new account({
                email: email,
                password: password
            });
            newAccount.save(function(err, response){
                console.log("operation: save a new account");
                if(newAccount.isNew){
                    console.log("fail to save!");
                    fn(false, "Fail to store new account");
                } else{
                    console.log("success to save!");
                    fn(true, "Create account scuuessfully");
                }
            });
        }else{
            fn(false, "The account already exists");
        }
    });
}

module.exports = Account;
