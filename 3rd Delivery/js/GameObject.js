class GameObject extends THREE.Object3D{
	constructor(x, y, z, speed, acceleration, radius){
		super();

		this.position.x = x;
		this.position.y = y;
		this.position.z = z;


		this.speed = speed;
		this.accel = acceleration;
		this.radius = radius;
	}

  updateObjectMovement(delta){}

  updateObjectRotation(delta){}

  hasCollision(objB){

    if ((this.radius + objB.radius)**2 >= ((this.position.x - objB.position.x)**2 + (this.position.y - objB.position.y)**2)){
        this.collision(objB);
    }
  }

  collision(obj){}

	setBasic(){}
	setPhong(){}
	setLambert(){}
}
