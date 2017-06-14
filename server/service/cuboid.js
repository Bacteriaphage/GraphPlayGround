var Cuboid = {};
const Shapes = require('../resource/model/shapes');

Cuboid.addToDB = function(cube, email, fn){
    var newCube = new Shapes.cuboid({
        email : email,
        x: parseFloat(cube.body.cuboidx),
        y: parseFloat(cube.body.cuboidy),        
        z: parseFloat(cube.body.cuboidz),
        length: parseFloat(cube.body.cuboidlength),  
        width: parseFloat(cube.body.cuboidwidth),
        height: parseFloat(cube.body.cuboidheight),
        color: cube.body.cuboidcolor
    });
    newCube.save(function(err, response){
        console.log("operation: save a new cube");
        if(newCube.isNew){
            console.log("fail to save!");
        } else {
            console.log("success to save!");
            fn(response._id);
        }
    });
};
Cuboid.findall = function(email, fn){
    Shapes.cuboid.find({email: email}).then(function(result){
        fn(result);
    });
};

Cuboid.editInDB = function(cube, fn){
    Shapes.cuboid.update({_id: cube.id}, {$set:{
        x: parseFloat(cube.cuboidx),
        y: parseFloat(cube.cuboidy),        
        z: parseFloat(cube.cuboidz),
        length: parseFloat(cube.cuboidlength),  
        width: parseFloat(cube.cuboidwidth),
        height: parseFloat(cube.cuboidheight),
        color: cube.cuboidcolor
    }}, fn);
}
Cuboid.deleteInDB = function(cube, fn){
    Shapes.cuboid.deleteOne({_id: cube.id}, fn);
}
module.exports = Cuboid;
