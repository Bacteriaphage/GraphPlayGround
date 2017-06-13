const assert = require('assert');
const Shapes = require('../resource/model/shapes');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/playgrounddb');

mongoose.connection.once('open', function(){
    console.log('Connection has been made.');
}).on('error', function(error){
    console.log('Connection error.');
});

describe('db test', function(){
   // create test
   /*
   it('save a record to db', function(done){
        var cuboidtest = new Shapes.cuboid({
           x: 1,
           y: 1.5,
           z: 1.5,
           length: 1,
           width: 1,
           height: 1,
           color: 0xffffff
       });
       cuboidtest.save().then(function(){
           console.log(cuboidtest);
           assert(!cuboidtest.isNew);
           done();
       });
    //next test
    });
    it('extract a record to console', function(done){
        Shapes.cuboid.find({x: 1}).then(function(result){
            console.log(result);
            assert(result);
            done();
        });
    });
    it('delete all test record', function(done){
        Shapes.cuboid.remove({x: 1}).then(function(){
            Shapes.cuboid.find({x: 1}).then(function(result){
                console.log(result);
                assert(result.length == 0);
                done();
            });
       });
    });

    it('find all data in DB', function(done){
        Shapes.cuboid.find({}).then(function(result){
            console.log("cuboid segment contain: ");
            console.log(result);     
            done();
        });
    }); 
    */
    it('remove all', function(done){
        Shapes.cuboid.remove({}).then(function(){
            Shapes.cuboid.find({}).then(function(result){
                console.log(result);
                assert(result.length == 0);
                Shapes.sphere.remove({}).then(function(){
                    Shapes.sphere.find({}).then(function(spheres){
                       assert(spheres.length == 0);
                       done();     
                    });
                });
            });
        });
    });
    
});
