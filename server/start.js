var express = require('express');
var bodyParser = require('body-parser');
//var loader = require('./routes/load/index.js');
var sphere = require('./service/sphere');
var cuboid = require('./service/cuboid');
var app = express();

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//before(function(done){
// });
//connect to mongodb
mongoose.connect('mongodb://localhost/playgrounddb');

mongoose.connection.once('open', function(){
    console.log('Connection has been made.');
}).on('error', function(error){
    console.log('Connection error.');
});
//done();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/resource', express.static(__dirname + '/resource'));

app.get("/", function(request, response){
//    response.sendFile("./page/index.html", {root: __dirname});
    var objects = {};
    objects.cuboid = [];
    objects.sphere = [];
    cuboid.findall(function(cubes){
        for(var i = 0; i < cubes.length; i++){
            objects.cuboid.push(new Object({
                id: cubes[i]._id,
                cuboidx: cubes[i].x,
                cuboidy: cubes[i].y,
                cuboidz: cubes[i].z,
                cuboidlength: cubes[i].length,
                cuboidwidth: cubes[i].width,
                cuboidheight: cubes[i].height,
                cuboidcolor: cubes[i].color,
                cuboidtexture: cubes[i].texture  
            }));
        }
        sphere.findall(function(balls){
            for(var i = 0; i < balls.length; i++){
                objects.sphere.push(new Object({
                    id: balls[i]._id,
                    spherex: balls[i].x,
                    spherey: balls[i].y,
                    spherez: balls[i].z,
                    sphereradius: balls[i].radius,
                    spherewidthsegments: balls[i].widthsegments,
                    sphereheightsegments: balls[i].heightsegments,
                    spherecolor: balls[i].color,
                    spheretexture: balls[i].texture
                }));
            }
            response.render('index.html', {Objects: objects});
        });
    });
});
//app.get("/routes/load", loader.Load);

app.post("/", function(req, res){
    //console.log('data: ' + JSON.stringify(req.body));
    if(req.body.operation == "add"){
        if(req.body.attribute == "cuboid"){
            cuboid.addToDB(req, function(_id){
                res.send({
                    body: req.body,
                    id: _id
                });
            });
        } else if(req.body.attribute == "sphere"){
            sphere.addToDB(req, function(_id){
                res.send({
                    body: req.body,
                    id: _id
                });
            });
        }
    } else if(req.body.operation == "edit"){
        if(req.body.attribute == "cuboid"){
            cuboid.editInDB(req.body, function(){
                //console.log(req.body);
                res.send({
                    body: req.body,
                    id: req.body.id   
                });
            });
        } else if(req.body.attribute == "sphere"){
            sphere.editInDB(req.body, function(){
                res.send({
                    body: req.body,
                    id: req.body.id
                });
            });
        }
    }
});
app.listen(3000, function(){
        console.log('Server is now listening on port 3000! Nevigate to http://ip:3000 to access it');
});       


