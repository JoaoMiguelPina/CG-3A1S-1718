
var materialCheerio = new THREE.MeshBasicMaterial({color: 0xe5ab3c, wireframe: true});

class Cheerio extends GameObject{

	constructor(x, y, z, materialCheerio, speed, accel, radius){
		super(x, y, z, 0, 3, 5);

		this.addCheerio(materialCheerio);

		this.direction = new THREE.Vector3();

	}

	addCheerio(material){
		'use strict';
		geometry = new THREE.TorusGeometry(5, 2, 10, 10);
		mesh = new THREE.Mesh(geometry, material);

		this.add(mesh);
	}

	updateObjectMovement(delta){

		if(this.speed < 0) this.speed = -1* this.speed;

		if(this.speed - this.accel*delta > 0){
			this.speed -= this.accel * delta;
		}
		else{
			this.speed = 0;
		}

		var frontStep = this.speed * delta;
		this.position.x += this.direction.x * frontStep;
		this.position.y += this.direction.y * frontStep;


	}

	collision(obj){
		if (obj instanceof Cheerio) {
			console.log("cheerio com cheerio");
			if (this.speed > 0 && obj.speed == 0) {
				console.log("oi 1");
				obj.speed += 0.6 * this.speed;
				this.speed *= 0.4;
				obj.direction = new THREE.Vector3(obj.position.x - this.position.x, obj.position.y - this.position.y , 0);
			}
			else if (this.speed == 0 && obj.speed != 0){
				obj.collision(this);
			}
		}
	}
}
