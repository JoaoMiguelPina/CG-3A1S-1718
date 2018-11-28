
var materialPilot = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
var materialTop = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var materialWheel = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

var accel = 2;
var accel_back = 0.5;
var accel_break = 3;


var currentXPosition, currentYPosition, currentRotation;


class Car extends GameObject{

	constructor (x,y,z, materialPilot, materialTop, materialWheel, speed, accel){

     super(x, y, z, speed, accel, 26);


     this.addCarPilot(materialPilot);
     this.addCarTop (materialTop);
     this.addCarWheel (materialWheel, 20, 10, -2);
     this.addCarWheel (materialWheel, 20, -10, -2);
     this.addCarWheel (materialWheel, -20, 10, -2);
     this.addCarWheel (materialWheel, -20, -10, -2);

     this.butterCollision = false;
  }

  addCarPilot(material){
		'use strict';

		geometry = new THREE.CubeGeometry(10, 8, 25);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 10);

		this.add(mesh);
	}

	addCarTop(material){
		'use strict';

		geometry = new THREE.CubeGeometry(50, 18, 18);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 5);

		this.add(mesh);
	}

	addCarWheel(material, x, y, z){
		'use strict';

		geometry = new THREE.TorusGeometry(5, 2, 10, 10);
		mesh = new THREE.Mesh(geometry, material);
		mesh.rotateX(Math.PI /2);
		mesh.position.set(x, y, z);


		this.add(mesh);
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

				/* TENTATIVA */

				/* while (obj.speed != 0) {
					for (var i = 0; i<circuit.length;i++) { / Testa colisões entre cheerios /
						obj.hasCollision(circuit[i]);
					}
				}*/
			}
	}
}
