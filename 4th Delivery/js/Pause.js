
// load a texture, set wrap mode to repeat
var texturePause = new THREE.TextureLoader().load( "textures/pause.png" );
texturePause.wrapS = THREE.RepeatWrapping;
texturePause.wrapT = THREE.RepeatWrapping;


var materialPause = new THREE.MeshBasicMaterial({map: texturePause, transparent: true});


class Pause extends GameObject{

	constructor(x, y, z, materialPause){
		super(x, y, z, 0, 0, 0);
    this.addPause(materialPause);
	}

	addPause(material){
		'use strict';

		geometry = new THREE.PlaneGeometry(816, 624);
		mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(0, 0, 200);
		this.visible = false;

		this.add(mesh);
	}
}
