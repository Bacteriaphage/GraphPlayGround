var ObjManager = {};
ObjManager.cuboid={};
ObjManager.sphere={};
ObjManager.line={};
ObjManager.cuboid.add =function(cube, id){
    var geometry = new THREE.BoxGeometry(parseFloat(cube.cuboidlength), parseFloat(cube.cuboidwidth), parseFloat(cube.cuboidheight));
    var material = new THREE.MeshLambertMaterial({color: parseInt(cube.cuboidcolor)});
    var newcuboid = new THREE.Mesh(geometry, material);
    newcuboid.position.add(new THREE.Vector3(parseFloat(cube.cuboidx), parseFloat(cube.cuboidy), parseFloat(cube.cuboidz)));
    object[id] = {body: newcuboid, attribute: "cuboid"};
//    console.log(id);
    newcuboid.name = id;
    scene.add(newcuboid);
//    console.log(newcuboid);
};
ObjManager.sphere.add =function(ball, id){
    var geometry = new THREE.SphereGeometry(parseFloat(ball.sphereradius), parseFloat(ball.spherewidthsegments), parseFloat(ball.sphereheightsegments));
    var material = new THREE.MeshLambertMaterial({color: parseInt(ball.spherecolor)});
    var newsphere = new THREE.Mesh(geometry, material);
    newsphere.position.add(new THREE.Vector3(parseFloat(ball.spherex), parseFloat(ball.spherey), parseFloat(ball.spherez)));
    object[id] = {body: newsphere, attribute: "sphere"};
//    console.log(id);
    newsphere.name = id;
    scene.add(newsphere);
};

ObjManager.line.add = function(line, id){
    var geometry = new THREE.Geometry();
    geometry.vertices.push(
        line.start,
        line.end        
    );
    var material = new THREE.LineBasicMaterial({color: parseInt(line.linecolor)});
    var newline = new THREE.Line(geometry, material);
    object[id] = {body: newsphere, attribute: "line"};
    newline.name = id;
    scene.add(newline);
};

ObjManager.remove = function(id){
    var selectObject = scene.getObjectByName(id);
    scene.remove(selectObject);
    delete object[id];
}
