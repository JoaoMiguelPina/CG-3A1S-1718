
var materialPilotBasic = new THREE.MeshBasicMaterial({color: 0xCECDD7, wireframe: true});
var materialTopBasic = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var materialWheelBasic = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

var materialPilotPhong = new THREE.MeshPhongMaterial({color: 0xCECDD7, wireframe: true, specular:0x222200, shininess:20});
var materialTopPhong = new THREE.MeshPhongMaterial({color: 0xff0000, wireframe: true});
var materialWheelPhong = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: true});

var materialPilotLambert = new THREE.MeshLambertMaterial({color: 0xCECDD7, wireframe: true});
var materialTopLambert = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: true});
var materialWheelLambert = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: true});

var accel = 2;
var accel_back = 0.5;
var accel_break = 3;

var currentXPosition, currentYPosition, currentRotation;

var faces1 = [];
var faces2 = [];
var faces3 = [];

var vertex1 = [];
var vertex2 = [];
var vertex3 = [];


class Car extends GameObject{

	constructor (x,y,z, materialPilot, materialTop, materialWheel, speed, accel){

     super(x, y, z, speed, accel, 26);

     this.addCarTop(materialTop);
	 this.addCarRoof(materialPilot);
	 this.addCarWheel(materialWheel,-15,-13, 0);
	 this.addCarWheel(materialWheel, 15,-13, 0);
	 this.addCarWheel(materialWheel, -15, 5, 0);
	 this.addCarWheel(materialWheel, 15, 5, 0);

     this.butterCollision = false;
  }

	moveFront(max, delta){
			if(this.speed + accel*delta < max){
				this.speed += accel*delta;
			}
			else{
				this.speed = max;
			}
	}

	moveBack(max, delta){
			if(this.speed + accel_break*delta > -max){
				this.speed -= accel_break*delta;
			}
			else{
				this.speed = -max;
			}
	}

	rotateLeft(delta){
		if(left &&!right && this.speed != 0){
			this.rotateZ(delta*2);
		}
	}

	rotateRight(delta){
		if(right &&!left && this.speed != 0){
			this.rotateZ(-delta*2);
		}
	}

	stopFront(delta){
		if(this.speed - accel_break*delta > 0){
			this.speed -= accel_break * delta;
		}
		else{
			this.speed = 0;
		}
	}

	stopBack(delta){
		if(this.speed + accel_break * delta < 0){
			this.speed += accel_break*delta;
		}
		else{
			this.speed = 0;
		}
	}

	updateObjectMovement(delta){

		currentXPosition = this.position.x;
		currentYPosition = this.position.y;
		currentRotation = this.rotation.z;


		if(front && back){
			this.moveFront(0, delta);
		}

		else if(front && !back){
			this.moveFront(5, delta);
		}

		else if(!front && back){
			this.moveBack(3, delta);
		}

		else if(frontBreak){
			this.stopFront(delta);
		}

		else if(backBreak){
			this.stopBack(delta);
		}

		this.translateX(this.speed);

		for (var i = 0; i<sceneObjects.length;i++){
			this.hasCollision(sceneObjects[i]);
		}

		if (this.butterCollision) {
    		this.position.x = currentXPosition;
    		this.position.y = currentYPosition;
    		this.rotation.z = currentRotation;
    		this.speed = 0;
    		this.butterCollision = false;
    	}
	}

	updateObjectRotation(delta){
		if(left){
		this.rotateLeft(delta);
		}
		if(right){
			this.rotateRight(delta);
		}
	}

	collision(obj){

			if(obj instanceof Orange) { /* Orange Collision */
				if(obj.visible == true){
					this.position.set(0, -262, 15);
					this.speed = 0;
					this.rotation.set(0,0,0);
				}
			}

			else if (obj instanceof Butter) { /* Butter Collision */
				this.butterCollision = true;
			}

			else { /* Cheerio Collision */
				obj.speed = 0.6 * this.speed + 3.5;
				this.speed = 0.9 * this.speed;
				obj.direction = new THREE.Vector3(obj.position.x - this.position.x, obj.position.y - this.position.y , 0);

				for (var i = 0; i<circuit.length;i++) { /* Testa colisões entre cheerios */
						obj.hasCollision(circuit[i]);
				}
			}
	}

	setBasic(){
		this.children[0].material = materialTopBasic;
		this.children[1].material = materialPilotBasic;
		this.children[2].material = materialWheelBasic;
		this.children[3].material = materialWheelBasic;
		this.children[4].material = materialWheelBasic;
		this.children[5].material = materialWheelBasic;
	}

	setPhong(){
		this.children[0].material = materialTopPhong;
		this.children[1].material = materialPilotPhong;
		this.children[2].material = materialWheelPhong;
		this.children[3].material = materialWheelPhong;
		this.children[4].material = materialWheelPhong;
		this.children[5].material = materialWheelPhong;
	}

	setLambert(){
		this.children[0].material = materialTopLambert;
		this.children[1].material = materialPilotLambert;
		this.children[2].material = materialWheelLambert;
		this.children[3].material = materialWheelLambert;
		this.children[4].material = materialWheelLambert;
		this.children[5].material = materialWheelLambert;
	}

	addCarTop(material) {
		'use strict';
		var geo = new THREE.Geometry();

		createVertexGroup(vertex1, -25, 25, -9, 9, -9, 9);//vertices paralelipipedo

		createTriangle(faces1, 1, 7, 5);
		createTriangle(faces1, 3, 7, 1);

		createTriangle(faces1, 4, 6, 2);
		createTriangle(faces1, 4, 2, 0);

		createTriangle(faces1, 6, 7, 3);
		createTriangle(faces1, 6, 3, 2);

		createTriangle(faces1, 5, 4, 1);
		createTriangle(faces1, 4, 0, 1);

		createTriangle(faces1, 0, 1, 3);
		createTriangle(faces1, 0, 3, 2);

		createTriangle(faces1, 4, 5, 7);
		createTriangle(faces1, 4, 7, 6);


		geo.vertices = vertex1;
		geo.faces = faces1;

		geo.computeFaceNormals();

		mesh = new THREE.Mesh(geo, material);
		mesh.position.set(0, 0, 10);
		this.add(mesh);
	}


	addCarRoof(material) {
		'use strict';
		var geo = new THREE.Geometry();

		vertex2.push(
			vertex1[4],
			vertex1[5],
			vertex1[6],
			vertex1[7]
		);

		createVertexGroup(vertex2, -10, 10, -9, 9, 9, 15);//vertices trapezio

		createTriangle(faces2, 10, 8, 11);
		createTriangle(faces2, 8, 9, 11);
		createTriangle(faces2, 0, 10, 2);
		createTriangle(faces2, 0, 8, 10);
		createTriangle(faces2, 11, 1, 3);
		createTriangle(faces2, 9, 1, 11);
		createTriangle(faces2, 2, 10, 6);
		createTriangle(faces2, 7, 11, 3);

		createTriangle(faces2, 6, 10, 7);
		createTriangle(faces2, 10, 11, 7);


		createTriangle(faces2, 8, 0, 4);
		createTriangle(faces2, 9, 5, 1);

		createTriangle(faces2, 5, 8, 4);
		createTriangle(faces2, 5, 9, 8);



		geo.vertices = vertex2;
		geo.faces = faces2;

		geo.computeFaceNormals();

		mesh = new THREE.Mesh(geo, material);
		mesh.position.set(0, 0, 10.1);
		this.add(mesh);
	}

	addCarWheel(material, x, y, z) {
		'use strict';
		var geo = new THREE.Geometry();

		createHexagon(vertex3);//vertices hexagono

		createTriangle(faces3, 0, 1, 12);
		createTriangle(faces3, 1, 2, 12);
		createTriangle(faces3, 2, 3, 12);
		createTriangle(faces3, 3, 4, 12);
		createTriangle(faces3, 4, 5, 12);
		createTriangle(faces3, 5, 0, 12);

		createTriangle(faces3, 6, 13, 7);
		createTriangle(faces3, 7, 13, 8);
		createTriangle(faces3, 8, 13, 9);
		createTriangle(faces3, 9, 13, 10);
		createTriangle(faces3, 10, 13, 11);
		createTriangle(faces3, 11, 13, 6);

		createTriangle(faces3, 0, 6 , 1);
		createTriangle(faces3, 6, 7, 1);

		createTriangle(faces3, 1, 7, 2);
		createTriangle(faces3, 7, 8, 2);

		createTriangle(faces3, 2, 8, 3);
		createTriangle(faces3, 8, 9, 3);

		createTriangle(faces3, 3, 9, 4);
		createTriangle(faces3, 9, 10, 4);

		createTriangle(faces3, 5, 4, 11);
		createTriangle(faces3, 10, 11, 4);

		createTriangle(faces3, 0, 5, 6);
		createTriangle(faces3, 11, 6, 5);

		geo.vertices = vertex3;
		geo.faces = faces3;

		geo.computeFaceNormals();

		var mesh2 = new THREE.Mesh(geo, material);
		mesh2.position.set(x, y, z);
		this.add(mesh2);
	}
}

function createVertexGroup(vertex, x0, x1, y0, y1, z0, z1) {
	vertex.push(
		new THREE.Vector3(x0, y1, z0),  // v0  v1
		new THREE.Vector3(x1, y1, z0),	// v2  v3
		new THREE.Vector3(x0, y0, z0),
		new THREE.Vector3(x1, y0, z0),

		new THREE.Vector3(x0, y1, z1), 	// v4  v5
		new THREE.Vector3(x1, y1, z1),	// v6  v7
		new THREE.Vector3(x0, y0, z1),
		new THREE.Vector3(x1, y0, z1)
	);
}

function createHexagon(vertex) {
	vertex.push(
		new THREE.Vector3(-2.5, 0, 5.6),
		new THREE.Vector3(2.5, 0, 5.6),
		new THREE.Vector3(5, 0, 0),
		new THREE.Vector3(2.5, 0, -5.6),
		new THREE.Vector3(-2.5, 0, -5.6),
		new THREE.Vector3(-5, 0, 0),

		new THREE.Vector3(-2.5, 8, 5.6),
		new THREE.Vector3(2.5, 8, 5.6),
		new THREE.Vector3(5, 8, 0),
		new THREE.Vector3(2.5, 8, -5.6),
		new THREE.Vector3(-2.5, 8, -5.6),
		new THREE.Vector3(-5, 8, 0),

		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 8, 0)
	);
}

function createTriangle(faces, v0, v1, v2) {
		faces.push(
			new THREE.Face3(v0, v2, v1)
		);
}
