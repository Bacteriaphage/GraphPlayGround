const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const CuboidSchema = new Schema({
    email: String,
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
    email: String,
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

const LineSchema = new Schema({
    email: String,
    x1: Number,
    y1: Number,
    z1: Number,
    x2: Number,
    y2: Number,
    z2: Number,
    color: String
});

const Line = mongoose.model('line', LineSchema);

module.exports = {
    cuboid: Cuboid,
    sphere: Sphere 
};
