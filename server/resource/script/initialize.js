$(document).ready(function(){
    var requestConfig = {
        method: "GET",
        url: "/routes/load",
        contentType: 'application/json',
        data: JSON.stringify()
    };
    $.ajax(requestConfig).then(function(responseMessage){
        for(var i = 0; i < responseMessage.body.cuboid.length; i++){
            ObjManager.cuboid.add(responseMessage.body.cuboid[i], responseMessage.body.cuboid[i].id)
            console.log(responseMessage.body);
        }     
    });
})
