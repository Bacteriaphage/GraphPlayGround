var cuboid = require('../../service/cuboid');

exports.Load = function(req, res){
    var Objects = {};
    Objects.cuboid = [];
    Objects.sphere = [];
    cuboid.findall(function(result){
        for(var i = 0; i < result.length; i++){
            Objects.cuboid.push({
                id: result[i].id,
                cuboidx: result[i].x,
                cuboidy: result[i].y,
                cuboidz: result[i].z,
                cuboidlength: result[i].length,
                cuboidwidth: result[i].width,
                cuboidheight: result[i].height,
                cuboidcolor: result[i].color,
                cuboidtexture: result[i].texture  
            });
        }
        res.send(Objects);
    });
};

//module.exports = Load;
