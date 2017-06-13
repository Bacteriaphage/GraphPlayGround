const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CuboidSchema = new Schema({
    x: Number,
    y: Number,
    z: Number,
    length: Number,
    width: Number,
    height: Number,
    color: String,
    texture:String
});

const Cuboid = mongoose.model('cuboid', CuboidSchema);

const SphereSchema = new Schema({
    x: Number,
    y: Number,
    z: Number,
    radius: Number,
    widthsegments: Number,
    heightsegments: Number,
    color: String,
    texture:String
});

const Sphere = mongoose.model('sphere', SphereSchema);

module.exports = {
    cuboid: Cuboid,
    sphere: Sphere 
};
