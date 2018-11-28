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

var candle;

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

var candles = [];

var lights = [];

var oranges = [];

var butters = [];

var light_positions = [[-525, -225], [-525, 225], [525, -225], [525, 225], [-200, 0], [200, 0]];

var lights_on = 1;

var directionalLight;

var directional_on = 1;

var materials = 1; //0->basic; 1->phong; 2->lambert

var basicMaterials = [materialPilotBasic, materialTopBasic, materialWheelBasic, materialOrangeBasic, materialLeafBasic, materialButterBasic, materialPackageBasic, materialCheerioBasic, materialTableBasic, materialCandleBasic, materialFlameBasic];

var phongMaterials = [materialPilotPhong, materialTopPhong, materialWheelPhong, materialOrangePhong, materialLeafPhong, materialButterPhong, materialPackagePhong, materialCheerioPhong, materialTablePhong, materialCandlePhong, materialFlamePhong];

var lambertMaterials = [materialPilotLambert, materialTopLambert, materialWheelLambert, materialOrangeLambert, materialLeafLambert, materialButterLambert, materialPackageLambert, materialCheerioLambert, materialTableLambert, materialCandleLambert, materialFlameLambert];

var world_light = 1;

var basicFlag = 0;

var animation;

var paused = false;

var pause = new Pause(0, 0, 0, materialPause);

var gameisover = false;

var gameover = new Gameover(0, 0, 0, materialGameover);

var cameraHUD, sceneHUD;


function render(){
	'use strict';
	renderer.clear();
	renderer.render(sceneHUD, cameraHUD);
	renderer.render(scene, camera[active_camera_id]);

}

function createOranges(){
	for(var i = 0; i<3; i++){
		var orange = new Orange(randomXPosition(), randomYPosition(), 29, materialOrangePhong);
		scene.add(orange);
		//sceneObjects.push(orange);
		oranges.push(orange);
	}
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	sceneHUD = new THREE.Scene();

	sceneHUD.add( pause );

	sceneHUD.add( gameover );

	scene.add(new THREE.AxisHelper(200));

	table = new Table(0, 0, 0, materialTablePhong);
	scene.add(table);

	createOranges();

	car = new Car(0, -262, 15, materialPilotPhong, materialTopPhong, materialWheelPhong, 0, accel);
	scene.add(car);

	for(var i = 0; i<5; i++){
		var butter = new Butter(randomXPosition(), randomYPosition(), 9, materialPackagePhong, materialButterPhong);
		scene.add(butter);
		sceneObjects.push(butter);
		butters.push(butter);

	}

	for(var i = 0; i<6; i++){
		var light = new THREE.PointLight( 0xffffff, 1, 700 );
		var candle = candle = new Candle(light_positions[i][0], light_positions[i][1], 0, materialCandlePhong, materialFlamePhong);
		light.position.set( light_positions[i][0], light_positions[i][1], 70 );
		light.visible = true;
		lights.push(light);
		candles.push(candle);
		scene.add(light);
		scene.add(candle);
	}

	directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.z = 1000;
	scene.add( directionalLight );

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
				for(var i = 0; i < basicMaterials.length; i++){
					basicMaterials[i].wireframe = !basicMaterials[i].wireframe;
					phongMaterials[i].wireframe = !phongMaterials[i].wireframe;
					lambertMaterials[i].wireframe = !lambertMaterials[i].wireframe;
				}
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
		case 67: // CANDLES (C)
			if(lights_on == 1){
				for(var i = 0; i < lights.length; i++){
					lights[i].visible = false;
				}
				lights_on = 0;
			}

			else if(lights_on == 0){
				for(var i = 0; i < lights.length; i++){
					lights[i].visible = true;
				}
				lights_on = 1;
			}

			break;

		case 71: // ILLUMINATION TYPES (G)
			if(materials == 1) materials = 2;
			else if(materials == 2) materials = 1;

			if(basicFlag == 0){
				if(materials == 1){
					car.setPhong();
					table.setPhong();
					for(var i = 0; i< sceneObjects.length; i++){
						sceneObjects[i].setPhong();
					}

					for(var i = 0; i< oranges.length; i++){
						oranges[i].setPhong();
					}

					for(var i = 0; i< candles.length; i++){
						candles[i].setPhong();
					}
				}

				else if(materials == 2){
					car.setLambert();
					table.setLambert();
					for(var i = 0; i< sceneObjects.length; i++){
						sceneObjects[i].setLambert();
					}

					for(var i = 0; i< oranges.length; i++){
						oranges[i].setLambert();
					}

					for(var i = 0; i< candles.length; i++){
						candles[i].setLambert();
					}
				}
			}
			break;

			case 76: // OVERALL LIGHT (L)

				if(basicFlag == 1) basicFlag = 0;
				else if(basicFlag == 0) basicFlag = 1;

				if(world_light == 1){
					directionalLight.visible = false;
					directional_on = 0;

					for(var i = 0; i < lights.length; i++){
						lights[i].visible = false;
					}
					lights_on = 0;

					world_light = 0;

					car.setBasic();
					table.setBasic();
					for(var i = 0; i< sceneObjects.length; i++){
						sceneObjects[i].setBasic();
					}

					for(var i = 0; i< oranges.length; i++){
						oranges[i].setBasic();
					}

					for(var i = 0; i< candles.length; i++){
						candles[i].setBasic();
					}

					car.children[8].visible = !car.children[8].visible;
					car.children[6].visible = !car.children[6].visible;
				}

				else if(world_light == 0){
					directionalLight.visible = true;
					directional_on = 1;

					for(var i = 0; i < lights.length; i++){
						lights[i].visible = true;
					}
					lights_on = 1;

					world_light = 1;

					if(materials == 1){
						car.setPhong();
						table.setPhong();
						for(var i = 0; i< sceneObjects.length; i++){
							sceneObjects[i].setPhong();
						}

						for(var i = 0; i< oranges.length; i++){
							oranges[i].setPhong();
						}

						for(var i = 0; i< candles.length; i++){
							candles[i].setPhong();
						}
					}
					else if(materials == 2){
						car.setLambert();
						table.setLambert();
						for(var i = 0; i< sceneObjects.length; i++){
							sceneObjects[i].setLambert();
						}

						for(var i = 0; i< oranges.length; i++){
							oranges[i].setLambert();
						}

						for(var i = 0; i< candles.length; i++){
							candles[i].setLambert();
						}
					}

					car.children[8].visible = !car.children[8].visible;
					car.children[6].visible = !car.children[6].visible;
				}

				break;

		case 78: // DIRECTIONAL LIGHT (N)
			if(directional_on == 1){
				directionalLight.visible = false;
				directional_on = 0;
			}
			else if(directional_on == 0){
				directionalLight.visible = true;
				directional_on = 1;
			}
			break;

		case 82: // RESTART GAME (R)
			if(gameisover == true){

					gameover.visible = false;
					gameisover = false;

					for (var i = 0; i < 3/*oranges.length*/ ; i++) {
						oranges[i].visible = false;
						scene.remove(oranges[i]);
					}

					oranges = [];

					createOranges();

					for (var i = 0; i < 5 ; i++) {
						carLives.children[i].visible = true;
					}

					for (var i = 0; i < circuit.length ; i++) {
						circuit[i].position.set(circuit[i].originalPos_x, circuit[i].originalPos_y,circuit[i].originalPos_z);
					}

					car.restart();

					requestAnimationFrame( animate );
				}
			break;

		case 83: // PAUSE GAME (S)
			if(paused == false){
				console.log("no pause");
					cancelAnimationFrame( animation );
					pause.visible = true;
					paused = true;
				}
				else{
					requestAnimationFrame(animate);
					pause.visible = false;
					paused = false;
				}
			break;
		case 72: //SPOTLIGHT OFF
			car.children[8].visible = !car.children[8].visible;
			car.children[6].visible = !car.children[6].visible;
			break;
	}
	render();
}

function animate() {

	var obj;
	delta = clock.getDelta();

  	car.updateObjectMovement(delta);
  	car.updateObjectRotation(delta);

  	/* Percorre todos os objetos na cena para atualizar o seu movimento (posição) */

	for (var i = 0; i<sceneObjects.length;i++) {
		sceneObjects[i].updateObjectMovement(delta);
	}

	for (var i = 0; i<oranges.length;i++) {
		oranges[i].updateObjectMovement(delta);
	}

	/* Percorre todos os objetos na cena para testar colisões com o carro e fazer o seu tratamento */

	for (var i = 0; i<sceneObjects.length;i++) {
		car.hasCollision(sceneObjects[i]);
	}

	for (var i = 0; i<oranges.length;i++) {
		car.hasCollision(oranges[i]);
	}

	if(car.lives == 0) {
		gameisover = true;
		gameover.visible = true;
	}
	else{
  	animation = requestAnimationFrame(animate);
	}
	render();
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
		cheerio1 = new Cheerio(600 *Math.cos(i), 325 * Math.sin(i), 7, materialCheerioPhong);
		cheerio2 = new Cheerio(400 *Math.cos(i), 200 * Math.sin(i), 7, materialCheerioPhong);
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

		renderer.autoClear = false;

    aspect_ratio = window.innerWidth / window.innerHeight;

    document.body.appendChild(renderer.domElement);

    createScene();
	  cameraHUD = new THREE.OrthographicCamera(-window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, 1, -2000);
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


function reviveOrange(orange){
		orange.position.set(randomXPosition(), randomYPosition(), 29);
		var tempo = Math.floor(Math.random() * 3000) + 100;
		setTimeout(function(){scene.add(orange);}, tempo);
		orange.visible = true;
	}
