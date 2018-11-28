
var materialCandleBasic = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
var materialFlameBasic = new THREE.MeshBasicMaterial({color: 0xf45904, wireframe: true});

var materialCandlePhong = new THREE.MeshPhongMaterial({color: 0xffffff, wireframe: true});
var materialFlamePhong = new THREE.MeshPhongMaterial({color: 0xf45904, wireframe: true});

var materialCandleLambert = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: true});
var materialFlameLambert = new THREE.MeshLambertMaterial({color: 0xf45904, wireframe: true});

class Candle extends GameObject{

	constructor (x,y,z, materialCandle, materialFlame){

     super(x, y, z, 0, 0, 26);

     this.addCandle(materialCandle);
     this.addFlame(materialFlame);

		 this.radius = 2;
  }

  addCandle(material){
		'use strict';
		geometry = new THREE.CylinderGeometry(8, 8, 40);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 25);
		mesh.rotation.x = Math.PI/2;

		this.add(mesh);
	}

	addFlame(material){
		'use strict';

		geometry = new THREE.CubeGeometry(3, 3, 10);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 50);

		this.add(mesh);
	}

	collision(obj){}

	setBasic(){
		this.children[0].material = materialCandleBasic;
		this.children[1].material = materialFlameBasic;
	}

	setPhong(){
		this.children[0].material = materialCandlePhong;
		this.children[1].material = materialFlamePhong;
	}

	setLambert(){
		this.children[0].material = materialCandleLambert;
		this.children[1].material = materialFlameLambert;
	}
}
