var Sphere = {};
const Shapes = require('../resource/model/shapes');

Sphere.addToDB = function(ball, fn){
    var newBall = new Shapes.sphere({
        x: parseFloat(ball.body.spherex),
        y: parseFloat(ball.body.spherey),        
        z: parseFloat(ball.body.spherez),
        radius: parseFloat(ball.body.sphereradius),
        widthsegments: parseFloat(ball.body.spherewidthsegments),
        heightsegments: parseFloat(ball.body.sphereheightsegments),
        color: ball.body.spherecolor
    });
    newBall.save(function(err, response){
        console.log("operation: save a new sphere");
        if(newBall.isNew){
            console.log("fail to save!");
        } else {
            console.log("success to save!");
            fn(response._id);
        }
    });
};
Sphere.findall = function(fn){
    Shapes.sphere.find({}).then(function(result){
        fn(result);
    });
};
Sphere.editInDB = function(ball, fn){
    Shapes.sphere.update({_id: ball.id},{$set:{
        x: parseFloat(ball.spherex),
        y: parseFloat(ball.spherey),        
        z: parseFloat(ball.spherez),
        radius: parseFloat(ball.sphereradius),
        widthsegments: parseFloat(ball.spherewidthsegments),
        heightsegments: parseFloat(ball.sphereheightsegments),
        color: ball.spherecolor
    }}, fn);
}
module.exports = Sphere;
