



class GameObject extends THREE.Object3D{
	constructor(x, y, z){
		super();

		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
	}
}

class Table extends GameObject{

	constructor(x, y, z, materialTable){
		super(x, y, z);

		this.addTableTop(materialTable);
		this.addTableLeg(materialTable, 500, 300, 0);
		this.addTableLeg(materialTable, 500, -300, 0);
		this.addTableLeg(materialTable, -500, 300, 0);
		this.addTableLeg(materialTable, -500, -300, 0);
	}

	addTableTop(material){
		'use strict';

		geometry = new THREE.CubeGeometry(1250, 700, 10);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 0)

		this.add(mesh);
	}

	addTableLeg(material, x, y, z){
		'use strict';
		geometry = new THREE.CubeGeometry(30, 30, 200);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, -100);

		this.add(mesh);
	}
}

class Car extends GameObject{

	constructor (x,y,z, materialPilot, materialTop, materialWheel, speed, accel){
         super(x,y,z);


         this.addCarPilot(materialPilot);
         this.addCarTop (materialTop);
         this.addCarWheel (materialWheel, 20, 10, -2);
         this.addCarWheel (materialWheel, 20, -10, -2);
         this.addCarWheel (materialWheel, -20, 10, -2);
         this.addCarWheel (materialWheel, -20, -10, -2);

         this.speed = 0;
		 this.accel = accel;

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
}

class Orange extends GameObject{

	constructor(x, y, z, materialOrange){
		super(x, y, z);

		this.addOrange(materialOrange);
	}

	addOrange(material){
		'use strict';
		geometry = new THREE.SphereGeometry(24, 10, 10);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0,0,0);
		this.add(mesh);
	}

}

class Butter extends GameObject{
	constructor(x, y, z, m1, m2){
		super(x, y, z);

		this.addPackage(m1);
		this.addButter(m2);
	}

	addPackage(m){
		'use strict';
		geometry = new THREE.CubeGeometry(40, 10, 40);
		mesh = new THREE.Mesh(geometry, m);

		mesh.rotateX(Math.PI /2);

		mesh.position.set(0, 0, 0);

		this.add(mesh);
	}

	addButter(m){
		'use strict';
		geometry = new THREE.CubeGeometry(25, 30, 10);
		mesh = new THREE.Mesh(geometry, m);

		mesh.position.set(0, 0, 5);

		this.add(mesh);
	}
}

class Cheerio extends GameObject{

	constructor(x, y, z, materialCheerio){
		super(x, y, z);

		this.addCheerio(materialCheerio);
	}

	addCheerio(material){
		'use strict';
		geometry = new THREE.TorusGeometry(5, 2, 10, 10);
		mesh = new THREE.Mesh(geometry, material);

		this.add(mesh);
	}

}
