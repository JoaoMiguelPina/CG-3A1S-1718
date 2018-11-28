// load a texture, set wrap mode to repeat
var textureGameover = new THREE.TextureLoader().load( "textures/gameover.png" );
textureGameover.wrapS = THREE.RepeatWrapping;
textureGameover.wrapT = THREE.RepeatWrapping;


var materialGameover = new THREE.MeshBasicMaterial({map: textureGameover, transparent: true});


class Gameover extends GameObject{

	constructor(x, y, z, materialGameover){
		super(x, y, z, 0, 0, 0);
    this.addGameover(materialGameover);
	}

	addGameover(material){
		'use strict';

		geometry = new THREE.PlaneGeometry(816, 624);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 200);
		this.visible = false;

		this.add(mesh);
	}
}
