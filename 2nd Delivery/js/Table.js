
var materialTable = new THREE.MeshBasicMaterial({color: 0x124d05 , wireframe: true});

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
