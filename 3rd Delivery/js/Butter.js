var materialButterBasic = new THREE.MeshBasicMaterial({color: 0xff8D00, wireframe: true});
var materialPackageBasic = new THREE.MeshBasicMaterial({color: 0xc5bdbd, wireframe: true});

var materialButterPhong = new THREE.MeshPhongMaterial({color: 0xff8D00, wireframe: true});
var materialPackagePhong = new THREE.MeshPhongMaterial({color: 0xc5bdbd, wireframe: true});

var materialButterLambert = new THREE.MeshLambertMaterial({color: 0xff8D00, wireframe: true});
var materialPackageLambert = new THREE.MeshLambertMaterial({color: 0xc5bdbd, wireframe: true});

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

	setBasic(){
		this.children[0].material = materialPackageBasic;
		this.children[1].material = materialButterBasic;
	}

	setPhong(){
		this.children[0].material = materialPackagePhong;
		this.children[1].material = materialButterPhong;
	}

	setLambert(){
		this.children[0].material = materialPackageLambert;
		this.children[1].material = materialButterLambert;
	}
}
