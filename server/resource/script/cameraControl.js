var CameraGenerator = (function(){
	var Camera;
	function createCamera(f_x, f_y, f_z, t_x, t_y, t_z){
		var from = new THREE.Vector3(f_x, f_y, f_z);
		var to = new THREE.Vector3(t_x, t_y, t_z);
		var norm = to.sub(from);
		norm = norm.normalize();
		to = from.clone();
		to.add(norm);
		return new Object({
			from_x: from.x, 
			from_y: from.y, 
			from_z: from.z, 
			look_x: to.x, 
			look_y: to.y,
			look_z: to.z,
			setCamera: function(x1, y1, z1, x2, y2, z2){
				this.from_x = x1;
				this.from_y = y1;
				this.from_z = z1;
				this.look_x = x2;
				this.look_y = y2;
				this.look_z = z2;
			},
			transformCamera: function(x, y, z){
				this.from_x += x;
				this.from_y += y;
				this.from_z += z;
				this.look_x += x;
				this.look_y += y;
				this.look_z += z;
			}
		});
	}
	return{
		getCamera: function(f_x, f_y, f_z, t_x, t_y, t_z){
			if(!Camera){
				Camera = createCamera(f_x, f_y, f_z, t_x, t_y, t_z);
			}
			return Camera;
		}
	};
})();
