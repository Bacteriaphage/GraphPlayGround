//var CameraModule = require('./cameraControl.js');

var mouseAnchor_x, mouseAnchor_y;
var cameraAnchor;

$(document).ready(function(){

	$("#ControlPanel").hide();
    $("#edit-delete").hide();
    $("#CameraToggle").text("Camera-fixed");
	// Control Panel switch
	$("#PanelToggle").on("click", function(){
		$("#ControlPanel").fadeToggle(500);
		if($(this).text() == "Panel-on"){
			$(this).text("Panel-off");
			$(this).css("background-color", "rgba(255, 255, 255, 0.5)");
		} else {
			$(this).text("Panel-on");
			$(this).css("background-color", "rgba(255, 255, 255, 0)");
		}
	});

	// Camera free or fixed
	$(this).on("keydown", function(event){
		if(event.which == 67){
			if($("#CameraToggle").text() == "Camera-fixed"){
				$("#CameraToggle").text("Camera-free");
				$("#CameraToggle").css("color", "#00ff00");
				document.getElementById("MainWindow").addEventListener("mousedown", startMove);
				document.getElementById("MainWindow").addEventListener("mouseup", endMove);

			} else{
				$("#CameraToggle").text("Camera-fixed");
				$("#CameraToggle").css("color", "#ff0000");
				document.getElementById("MainWindow").removeEventListener("mousedown", startMove);
				document.getElementById("MainWindow").removeEventListener("mouseup", endMove);
			}
		}else if($("#CameraToggle").text() == "Camera-free" && (event.which == 87 || event.which == 65 || event.which == 68 || event.which == 83)){
			cameraAnchor = CameraGenerator.getCamera();
			ori = new THREE.Vector3(cameraAnchor.from_x, cameraAnchor.from_y, cameraAnchor.from_z);
			des = new THREE.Vector3(cameraAnchor.look_x, cameraAnchor.look_y, cameraAnchor.look_z);
			var forward = des.sub(ori);
			forward = forward.normalize();
			var right = forward.clone();
			right.cross(new THREE.Vector3(0, 1, 0));
			right = right.normalize();
			switch (event.which){
				case 87:
				cameraAnchor.transformCamera(forward.x * 0.05, forward.y * 0.05, forward.z * 0.05);
				break;
				case 65:
				cameraAnchor.transformCamera(-right.x * 0.05 , -right.y * 0.05, -right.z * 0.05);
				break;
				case 83:
				cameraAnchor.transformCamera(-forward.x * 0.05, -forward.y * 0.05, -forward.z * 0.05);
				break;
				case 68:
				cameraAnchor.transformCamera(right.x * 0.05 , right.y * 0.05, right.z * 0.05);
				break;
			}

		}
	});
    $("#MainWindow").click(function(event){
        if($("#CameraToggle").text() == "Camera-fixed"){
            selectObject(event.pageX, event.pageY);
        }
    });
    window.addEventListener('resize', onWindowResize, false);
});

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function selectObject(pageX, pageY){
    // mapping mouse coordination into canvas
    onClick = new THREE.Vector3((pageX / window.innerWidth) * 2 - 1, -(pageY / window.innerHeight) * 2 + 1,  0.5);
    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(onClick, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if(intersects.length > 0){
        $("#edit-delete").show(500);
        $("#object-x").val(intersects[0].object.position.x);
        $("#object-y").val(intersects[0].object.position.y);
        $("#object-z").val(intersects[0].object.position.z);
        var color = "0x";
        color += Math.round(intersects[0].object.material.color.r * 255).toString(16) + " ";
        color += Math.round(intersects[0].object.material.color.g * 255).toString(16) + " ";
        color += Math.round(intersects[0].object.material.color.b * 255).toString(16); 
        $("#object-color").val(color);
        $("#object-id").val(intersects[0].object.name);
        var container = document.getElementById("special-traits");
        clearContainer("special-traits");
        if(object[intersects[0].object.name].attribute == "cuboid"){
            $("#object-attribute").text("Cuboid");
            $("#object-view").text("Position: x: " + intersects[0].object.position.x + " y : " + intersects[0].object.position.y + " z: " + intersects[0].object.position.z + "\nColor: " + color + "\nParameter: length: " + intersects[0].object.geometry.parameters.width + " width: " + intersects[0].object.geometry.parameters.depth + " height: " + intersects[0].object.geometry.parameters.height);
            var object_length = document.createElement("input");
            object_length.type = "text";
            object_length.id = "object-length";
            object_length.value = intersects[0].object.geometry.parameters.width;
            var object_width = document.createElement("input");
            object_width.type = "text";
            object_width.id = "object-width";
            object_width.value = intersects[0].object.geometry.parameters.depth;
            var object_height = document.createElement("input");
            object_height.type = "text";
            object_height.id = "object-height";
            object_height.value = intersects[0].object.geometry.parameters.height;
            var text_length = document.createTextNode("length: ");
            var text_width = document.createTextNode("width: ");
            var text_height = document.createTextNode("height: ");
            container.appendChild(text_length);
            container.appendChild(object_length);
            container.appendChild(text_width);
            container.appendChild(object_width);
            container.appendChild(text_height);
            container.appendChild(object_height);
        }else if(object[intersects[0].object.name].attribute == "sphere"){
            $("#object-attribute").text("Sphere");
            $("#object-view").text("Position: x: " + intersects[0].object.position.x + " y : " + intersects[0].object.position.y + " z: " + intersects[0].object.position.z + "\nColor: "+ color + "\nParameter: radius: " + intersects[0].object.geometry.parameters.radius + " widthseg: " + intersects[0].object.geometry.parameters.widthSegments + " heightseg: " + intersects[0].object.geometry.parameters.heightSegments);
            var object_radius = document.createElement("input");
            object_radius.type = "text";
            object_radius.id = "object-radius";
            object_radius.value = intersects[0].object.geometry.parameters.radius;
            var object_widthsegments = document.createElement("input");
            object_widthsegments.type = "text";
            object_widthsegments.id = "object-widthsegments";
            object_widthsegments.value = intersects[0].object.geometry.parameters.widthSegments;
            var object_heightsegments = document.createElement("input");
            object_heightsegments.type = "text";
            object_heightsegments.id = "object-heightsegments";
            object_heightsegments.value = intersects[0].object.geometry.parameters.heightSegments;
            var text_radius = document.createTextNode("radius: ");
            var text_widthsegments = document.createTextNode("widthSeg: ");
            var text_heightsegments = document.createTextNode("heightSeg: ");
            container.appendChild(text_radius);
            container.appendChild(object_radius);
            container.appendChild(text_widthsegments);
            container.appendChild(object_widthsegments);
            container.appendChild(text_heightsegments);
            container.appendChild(object_heightsegments);
        }
        // ...
    }else{
        $("#edit-delete").hide(500);
    }
}

function endMove(event){
	document.getElementById("MainWindow").removeEventListener("mousemove",cameraRotate);
}

function startMove(event){
	mouseAnchor_x = event.x;
	mouseAnchor_y = event.y;
	document.getElementById("MainWindow").addEventListener("mousemove", cameraRotate);
}

function cameraRotate(event){
	cameraAnchor = CameraGenerator.getCamera();
	ori = new THREE.Vector3(cameraAnchor.from_x, cameraAnchor.from_y, cameraAnchor.from_z);
	des = new THREE.Vector3(cameraAnchor.look_x, cameraAnchor.look_y, cameraAnchor.look_z);
	var delta_x = event.x - mouseAnchor_x;
	var delta_y = event.y - mouseAnchor_y;
	mouseAnchor_x = event.x;
	mouseAnchor_y = event.y;
	var forward = des.sub(ori);
	forward = forward.normalize();
	var horizontalFactor = forward.dot(new THREE.Vector3(0, 1, 0));
	var verticalAxis = forward.clone();
	verticalAxis.cross(new THREE.Vector3(0, 1, 0));
	verticalAxis = verticalAxis.normalize();
	var model = new THREE.Matrix4();
	model.set(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1);
	var rotateY = model.clone();
	var rotateX = model.clone();
	var recover = model.clone();
	var res = new THREE.Vector4(cameraAnchor.look_x, cameraAnchor.look_y, cameraAnchor.look_z, 1);
	model.makeTranslation(-cameraAnchor.from_x, -cameraAnchor.from_y, -cameraAnchor.from_z);
	recover.makeTranslation(cameraAnchor.from_x, cameraAnchor.from_y, cameraAnchor.from_z);
	res.applyMatrix4(model);
	if (horizontalFactor < 0.8 && horizontalFactor > -0.8 || horizontalFactor > 0.8 && delta_y > 0 || horizontalFactor < -0.8 && delta_y < 0) {
		rotateX.makeRotationAxis(verticalAxis, 0.004 * -delta_y);
		res.applyMatrix4(rotateX);
	}
	rotateY.makeRotationAxis(new THREE.Vector3(0.0, 1.0, 0.0), (0.0001 * Math.abs(horizontalFactor) + 0.01) * -delta_x);
	res.applyMatrix4(rotateY);
	res.applyMatrix4(recover);
	cameraAnchor.setCamera(cameraAnchor.from_x, cameraAnchor.from_y, cameraAnchor.from_z, res.x, res.y, res.z);
}

function clearContainer(parentName){
    var myNode = document.getElementById(parentName);
    while(myNode.firstChild){
        myNode.removeChild(myNode.firstChild);
    }
}
