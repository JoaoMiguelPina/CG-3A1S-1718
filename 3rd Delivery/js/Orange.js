
var materialOrangeBasic = new THREE.MeshBasicMaterial({color: 0xe74600, wireframe: true});
var materialLeafBasic = new THREE.MeshBasicMaterial({color: 0x03670e, wireframe: true});

var materialOrangePhong = new THREE.MeshPhongMaterial({color: 0xe74600, wireframe: true});
var materialLeafPhong = new THREE.MeshPhongMaterial({color: 0x03670e, wireframe: true});

var materialOrangeLambert = new THREE.MeshLambertMaterial({color: 0xe74600, wireframe: true});
var materialLeafLambert = new THREE.MeshLambertMaterial({color: 0x03670e, wireframe: true});

class Orange extends GameObject{

	constructor(x, y, z, materialOrange){

		var s = Math.floor(Math.random() * 1.5) + 0.5;

		super(x, y, z, s, 0, 29);

		this.addOrange(materialOrange);
		this.addLeaf(materialLeafPhong);
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

	setBasic(){
		this.children[0].material = materialOrangeBasic;
		this.children[1].material = materialLeafBasic;
	}

	setPhong(){
		this.children[0].material = materialOrangePhong;
		this.children[1].material = materialLeafPhong;
	}

	setLambert(){
		this.children[0].material = materialOrangeLambert;
		this.children[1].material = materialLeafLambert;
	}
}
