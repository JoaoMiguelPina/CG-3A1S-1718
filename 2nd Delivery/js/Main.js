/*global THREE*/

'use strict';

/*============================= CONSTANTES =============================*/

const FIX_ORT_CAM = 0;
const FIX_PER_CAM = 1;
const MOB_PER_CAM = 2;

var camera = new Array(3);
var active_camera_id = 0;

var scene, renderer;

var car, table;

var orange1, orange2, orange3, butter1, butter2, butter3, butter4, butter5;

var geometry, mesh, material;

var aspect_ratio;

var clock = new THREE.Clock();

var delta;

var front = false;

var back = false;

var left = false;

var right = false;

var frontBreak = false;

var backBreak = false;

var sceneObjects = []; //array de GameObjects para as colisoes

var circuit = [];

function render(){
	'use strict';
	renderer.render(scene, camera[active_camera_id]);
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(200));

	table = new Table(0, 0, 0, materialTable);
	scene.add(table);

	car = new Car(0, -262, 15, materialPilot, materialTop, materialWheel, 0, accel);
	scene.add(car);

	orange1 = new Orange(randomXPosition(), randomYPosition(), 29, materialOrange);
	scene.add(orange1);
	sceneObjects.push(orange1);
	orange1.visible = true;

	orange2 = new Orange(randomXPosition(), randomYPosition(), 29, materialOrange);
	scene.add(orange2);
	sceneObjects.push(orange2);
	orange2.visible = true;

	orange3 = new Orange(randomXPosition(), randomYPosition(), 29, materialOrange);
	scene.add(orange3);
	sceneObjects.push(orange3);
	orange3.visible = true;

	butter1 = new Butter(randomXPosition(), randomYPosition(), 9, materialPackage, materialButter);
	scene.add(butter1);
	sceneObjects.push(butter1);

  butter2 = new Butter(randomXPosition(), randomYPosition(), 9, materialPackage, materialButter);
	scene.add(butter2);
	sceneObjects.push(butter2);

	butter3 = new Butter(randomXPosition(), randomYPosition(), 9, materialPackage, materialButter);
	scene.add(butter3);
	sceneObjects.push(butter3);

	butter4 = new Butter(randomXPosition(), randomYPosition(), 9, materialPackage, materialButter);
	scene.add(butter4);
	sceneObjects.push(butter4);

	butter5 = new Butter(randomXPosition(), randomYPosition(), 9, materialPackage, materialButter);
	scene.add(butter5);
	sceneObjects.push(butter5);

	createCircuit();

}

function createFixedOrthographicCamera() {
	'use strict';

	camera[FIX_ORT_CAM] = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 2000);
	camera[FIX_ORT_CAM].position.z = 1000;
	camera[FIX_ORT_CAM].lookAt(scene.position);

}

function createFixedPerspectiveCamera() {
	'use strict';

	camera[FIX_PER_CAM] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
	camera[FIX_PER_CAM].up = new THREE.Vector3(0, 0, 1);
	camera[FIX_PER_CAM].position.x = 0;
	camera[FIX_PER_CAM].position.y = -700;
	camera[FIX_PER_CAM].position.z = 350;
	camera[FIX_PER_CAM].lookAt(scene.position);
}

function createMobilePerspectiveCamera() {
	'use strict';

	camera[MOB_PER_CAM] = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
	camera[MOB_PER_CAM].up = new THREE.Vector3(0, 0, 1);
	camera[MOB_PER_CAM].lookAt(new THREE.Vector3(0.5, 0, 0));
	camera[MOB_PER_CAM].position.x = -150;
	camera[MOB_PER_CAM].position.y = 0;
	camera[MOB_PER_CAM].position.z = 70;

	car.add(camera[MOB_PER_CAM]);
}



function onResize() {

    renderer.setSize(window.innerWidth, window.innerHeight);

	var new_height = window.innerWidth / aspect_ratio;

    if (new_height <= window.innerHeight ) {
        camera[FIX_ORT_CAM].aspect = aspect_ratio;
        renderer.setSize( window.innerWidth, new_height );
    }
    else {
        camera[FIX_ORT_CAM].aspect = 1/aspect_ratio;
        renderer.setSize( window.innerHeight * aspect_ratio, window.innerHeight );
    }
    camera[FIX_ORT_CAM].updateProjectionMatrix();

	if (window.innerHeight > 0 && window.innerWidth > 0) {
		camera[FIX_PER_CAM].aspect = renderer.getSize().width / renderer.getSize().height;
		camera[FIX_PER_CAM].updateProjectionMatrix();
		camera[MOB_PER_CAM].aspect = renderer.getSize().width / renderer.getSize().height;
		camera[MOB_PER_CAM].updateProjectionMatrix();
	}
}


function onKeyDown(e){
	'use strict';

	delta = clock.getDelta();

	switch(e.keyCode){
		case 65: //A
		case 97: //a
			materialPilot.wireframe = !materialPilot.wireframe;
			materialTop.wireframe = !materialTop.wireframe;
			materialWheel.wireframe = !materialWheel.wireframe;

			materialOrange.wireframe = !materialOrange.wireframe;
			materialLeaf.wireframe = !materialLeaf.wireframe;
			materialButter.wireframe = !materialButter.wireframe;
			materialPackage.wireframe = !materialPackage.wireframe;

			materialCheerio.wireframe = !materialCheerio.wireframe;
			materialTable.wireframe = !materialTable.wireframe;

			break;

		case 38: //arrow up
			back = false;
			front = true;
			break;
		case 40: //arrow down
			front = false;
			back = true;
			break;
		case 37: //arrow left
			left = true;
			right = false;
			break;
		case 39: //arrow right
			right = true;
			left = false;
			break;
		case 49: // CAMERA 1
			active_camera_id = FIX_ORT_CAM;
			break;
		case 50: // CAMERA 2
			active_camera_id = FIX_PER_CAM;
			break;
		case 51: // CAMERA 3
			active_camera_id = MOB_PER_CAM;
			break;
	}
	render();
}

function animate() {

	var obj;
	delta = clock.getDelta();

  	car.updateObjectMovement(delta);
  	car.updateObjectRotation(delta);

  	orange1.updateObjectMovement(delta);

  	/* Percorre todos os objetos na cena para atualizar o seu movimento (posição) */

	for (var i = 0; i<sceneObjects.length;i++) {
		sceneObjects[i].updateObjectMovement(delta);
	}

	/* Percorre todos os objetos na cena para testar colisões com o carro e fazer o seu tratamento */

	for (var i = 0; i<sceneObjects.length;i++) {
		car.hasCollision(sceneObjects[i]);
	}

  	render();
  	requestAnimationFrame(animate);
}

function onKeyUp(e) {
	switch (e.keyCode) {
	case 37: //arrow left
		left = false;
		break;
	case 38: //arrow up
		front = false;
	 	backBreak = false;
    frontBreak = true;
		break;
	case 40: //arrow down
		back = false;
	  frontBreak = false;
		backBreak = true;
		break;
	case 39: //arrow right
		right = false;
		break;
	}
}

function createCircuit(){
	var i = 0;
	var cheerio1, cheerio2;
	for(i = 0; i<2*Math.PI;  ){
		cheerio1 = new Cheerio(600 *Math.cos(i), 325 * Math.sin(i), 7, materialCheerio);
		cheerio2 = new Cheerio(400 *Math.cos(i), 200 * Math.sin(i), 7, materialCheerio);
		scene.add(cheerio1);
		sceneObjects.push(cheerio1);
		circuit.push(cheerio1);
		scene.add(cheerio2);
		sceneObjects.push(cheerio2);
		circuit.push(cheerio2);
		i = i + Math.PI/33;
	}
}

function init(){
    'use strict';

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    aspect_ratio = window.innerWidth / window.innerHeight;

    document.body.appendChild(renderer.domElement);

    createScene();
    createFixedOrthographicCamera();
    createFixedPerspectiveCamera();
    createMobilePerspectiveCamera();

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function randomXPosition(){
	var x = Math.floor(Math.random() * 600) + 1
	x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	return x;
}

function randomYPosition(){
	var y = Math.floor(Math.random() * 330) + 28
	y *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
	return y;
}

/*function randomNumberBtw(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

function reviveOrange(orange){
		orange.position.set(randomXPosition(), randomYPosition(), 29);
		var tempo = Math.floor(Math.random() * 3000) + 100;
		setTimeout(function(){scene.add(orange);}, tempo);
		orange.visible = true;
	}
