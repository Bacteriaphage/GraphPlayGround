var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var sphere = require('./service/sphere');
var cuboid = require('./service/cuboid');
var account = require('./service/account');
var path = require('path');
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
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.cookieParser());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/resource', express.static(path.join(__dirname, '/resource')));

var sess;

app.get("/", function(request, response){
    sess = request.session;
    if(sess.email){
        response.redirect('/routes/playground');
    } else{
        response.render('index.html');
    }
});

app.post("/", function(request, response){
    sess = request.session;
    if(request.body.operation == "signIn"){
        account.verify(request.body.email, request.body.password, function(success){
            sess.email = request.body.email;
            response.send({success: success, email: request.body.email});
            console.log(success);
        })
    }else if(request.body.operation == "register"){
        account.addAccount(request.body.email, request.body.password, function(success, message){
            response.send({success: success, email: request.body.email, message: message});
            console.log("create an account");
            console.log(success);
        });
    }
})
app.get("/routes/logout", function(request, response){
    request.session.destroy(function(err){
        if(err){
            console.log(err);
        } else{
            response.redirect("/");
        }
    });
})
app.get("/routes/playground", function(request, response){
//    response.sendFile("./page/index.html", {root: __dirname});
    sess = request.session;
    if(sess.email){
        var objects = {};
        objects.cuboid = [];
        objects.sphere = [];
        cuboid.findall(sess.email , function(cubes){
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
            sphere.findall(sess.email, function(balls){
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
                response.render('playground.html', {Objects: objects});
            });
        });
    } else{
        response.redirect('/');
    }
});
//app.get("/routes/load", loader.Load);

app.post("/routes/playground", function(req, res){
    sess = req.session;
    //console.log('data: ' + JSON.stringify(req.body));
    if(req.body.operation == "add"){
        if(req.body.attribute == "cuboid"){
            cuboid.addToDB(req, sess.email, function(_id){
                res.send({
                    body: req.body,
                    id: _id
                });
            });
        } else if(req.body.attribute == "sphere"){
            sphere.addToDB(req, sess.email, function(_id){
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
    } else if(req.body.operation == "delete"){
        console.log(req.body);
        if(req.body.attribute == "cuboid"){
            cuboid.deleteInDB(req.body, function(){
                res.send({
                    body: req.body,
                    id: req.body.id
                });
            });
        } else if(req.body.attribute == "sphere"){
            sphere.deleteInDB(req.body, function(){
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


