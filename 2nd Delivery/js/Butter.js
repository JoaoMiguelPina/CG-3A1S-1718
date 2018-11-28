var materialButter = new THREE.MeshBasicMaterial({color: 0xff8D00, wireframe: true});
var materialPackage = new THREE.MeshBasicMaterial({color: 0xc5bdbd, wireframe: true});

class Butter extends GameObject{
	constructor(x, y, z, m1, m2){
		super(x, y, z, 0, 0, 28.3);

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
