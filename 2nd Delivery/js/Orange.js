
var materialOrange = new THREE.MeshBasicMaterial({color: 0xe74600, wireframe: true});
var materialLeaf = new THREE.MeshBasicMaterial({color: 0x03670e, wireframe: true});

class Orange extends GameObject{

	constructor(x, y, z, materialOrange){

		// Diferentes laranjas movimentam-se com velocidades diferentes

		//var min_radius = 29;
		//var max_radius = 70;

		//var r = Math.floor(Math.random() * (max_radius - min_radius + 1)) + min_radius;

		var s = Math.floor(Math.random() * 1.5) + 0.5;

		super(x, y, z, s, 0, 29);

		this.addOrange(materialOrange);
		this.addLeaf(materialLeaf);
		this.needsUpdate = 1;
		this.direction = new THREE.Vector3();
		this.angle = (Math.random() * Math.PI);

		this.direction.x = Math.sin(this.angle);
		this.direction.y = Math.cos(this.angle);
		this.direction.z = 0;
		this.rotation.set(x,y,0);
		this.visible = false;

		this.lookAt(this.direction);
	}

	addOrange(material){
		'use strict';
		geometry = new THREE.SphereGeometry(24, 10, 10);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0,0,0);
		this.add(mesh);
	}

	addLeaf(material){
		'use strict';
		geometry = new THREE.CylinderGeometry(5, 3, 3);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0,0,25);
		this.add(mesh);
	}

	updateObjectMovement(delta){
		var frontStep = this.speed * delta + 1;
		var angularSpeedRatio = 0.04; // 1/raio
		this.position.x += Math.cos(this.angle) * frontStep;
		this.position.y -= Math.sin(this.angle) * frontStep;
		this.rotation.z = this.angle;

		var rotStep = frontStep * angularSpeedRatio;
		console.log(rotStep);
		//this.rotation.y -= rotStep;
		//this.rotation.x += this.direction.y * rotStep +0.1;
		this.rotation.x -=  rotStep;

		if (this.position.x > 650 || this.position.x < -625 || this.position.y > 375 || this.position.y < -375){
		 this.visible = false;
		 scene.remove(this);
		 this.speed += 1;
		 reviveOrange(this);
		}

		if(this.needsUpdate == 1){
			this.speed += 1;
			this.needsUpdate = 0;
			setTimeout(function(){this.needsUpdate = 1;}, 5000);
		}
	}
}
