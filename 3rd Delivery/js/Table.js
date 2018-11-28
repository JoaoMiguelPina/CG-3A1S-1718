
var materialTableBasic = new THREE.MeshBasicMaterial({color: 0x124d05 , wireframe: true});

var materialTablePhong = new THREE.MeshPhongMaterial({color: 0x124d05 , wireframe: true});

var materialTableLambert = new THREE.MeshLambertMaterial({color: 0x124d05 , wireframe: true});

class Table extends GameObject{

	constructor(x, y, z, materialTable){
		super(x, y, z, 0, 0, 0);

		this.addTableTop(materialTable);
		this.addTableLeg(materialTable, 500, 300, 0);
		this.addTableLeg(materialTable, 500, -300, 0);
		this.addTableLeg(materialTable, -500, 300, 0);
		this.addTableLeg(materialTable, -500, -300, 0);
	}

	addTableTop(material){
		'use strict';

		geometry = new THREE.CubeGeometry(1250, 700, 10,100,100,1);
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

	setBasic(){
		this.children[0].material = materialTableBasic;
		this.children[1].material = materialTableBasic;
		this.children[2].material = materialTableBasic;
		this.children[3].material = materialTableBasic;
		this.children[4].material = materialTableBasic;
	}

	setPhong(){
		this.children[0].material = materialTablePhong;
		this.children[1].material = materialTablePhong;
		this.children[2].material = materialTablePhong;
		this.children[3].material = materialTablePhong;
		this.children[4].material = materialTablePhong;
	}

	setLambert(){
		this.children[0].material = materialTableLambert;
		this.children[1].material = materialTableLambert;
		this.children[2].material = materialTableLambert;
		this.children[3].material = materialTableLambert;
		this.children[4].material = materialTableLambert;
	}
}
