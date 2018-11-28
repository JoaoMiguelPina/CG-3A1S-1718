/*global THREE*/

'use strict';

var camera, scene, renderer;

var car, table;

var orange1, orange2, orange3, butter1, butter2, butter3, butter4, butter5;

var geometry, mesh, material;

var aspect_ratio;

var clock = new THREE.Clock();

var accel = 2;
var accel_back = 0.5;
var accel_break = 3;

var delta;

var materialPilot = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
var materialTop = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var materialWheel = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

var materialOrange = new THREE.MeshBasicMaterial({color: 0xe74600, wireframe: true});
var materialButter = new THREE.MeshBasicMaterial({color: 0xff8D00, wireframe: true});
var materialPackage = new THREE.MeshBasicMaterial({color: 0xc5bdbd, wireframe: true});


var materialCheerio = new THREE.MeshBasicMaterial({color: 0xe5ab3c, wireframe: true});

var materialTable = new THREE.MeshBasicMaterial({color: 0x124d05 , wireframe: true});

var front = false;

var back = false;

var left = false;

var right = false;

var frontBreak = false;

var backBreak = false;

var rotWorldMatrix;

var cheerios;

/*function createCamera1(){
	'use strict';

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

	camera.position.x = 0;
	camera.position.y = -500;
	camera.position.z = 50;
	camera.lookAt(scene.position);
}*/

function render(){
	'use strict';
	renderer.render(scene, camera);
}

function createScene(){
	'use strict';

	scene = new THREE.Scene();

	scene.add(new THREE.AxisHelper(200));

	table = new Table(0, 0, 0, materialTable);
	scene.add(table);

	car = new Car(0, -262, 15, materialPilot, materialTop, materialWheel);
	scene.add(car);

	orange1 = new Orange(250, 200, 29, materialOrange);
	scene.add(orange1);

	orange2 = new Orange(-325, 170, 29, materialOrange);
	scene.add(orange2);

	orange3 = new Orange(0, -300, 29, materialOrange);
	scene.add(orange3);

	butter1 = new Butter(-100, 280, 9, materialPackage, materialButter);
	scene.add(butter1);

  	butter2 = new Butter(525, -100, 9, materialPackage, materialButter);
	scene.add(butter2);

	butter3 = new Butter(-550, 0, 9, materialPackage, materialButter);
	scene.add(butter3);

	butter4 = new Butter(325, -170, 9, materialPackage, materialButter);
	scene.add(butter4);

	butter5 = new Butter(-300, -240, 9, materialPackage, materialButter);
	scene.add(butter5);

	createCircuit();

}

function createCamera(){
	'use strict';

	camera = new THREE.OrthographicCamera(1400 / -2, 1400 / 2, 800 / 2, 800 / -2, 1, 2000);

	camera.position.z = 1000;
	camera.lookAt(scene.position);
}




function onResize(){
	console.log("resize");

    var new_height = window.innerWidth / aspect_ratio;

    if (new_height <= window.innerHeight ) {
        camera.aspect = aspect_ratio;
        renderer.setSize( window.innerWidth, new_height );
    }
    else {
        camera.aspect = 1/aspect_ratio;
        renderer.setSize( window.innerHeight * aspect_ratio, window.innerHeight );
    }
    camera.updateProjectionMatrix();
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
	}
	render();
}

function animate() {

	delta = clock.getDelta();

    updateObjectMovement(delta);
    updateObjectRotation(delta);
    render();
    requestAnimationFrame(animate);
}

function moveFront(max, delta){
		if(car.speed + accel*delta < max){
			car.speed += accel*delta;
		}
		else{
			car.speed = max;
		}
}

function moveBack(max, delta){
		if(car.speed + accel_break*delta > -max){
			car.speed -= accel_break*delta;
		}
		else{
			car.speed = -max;
		}
}

function rotateLeft(delta){
	if(left &&!right && car.speed != 0){
		car.rotateZ(delta*2);
	}
}

function rotateRight(delta){
	if(right &&!left && car.speed != 0){
		car.rotateZ(-delta*2);
	}
}


function stopFront(delta){
	if(car.speed - accel_break*delta > 0){
		car.speed -= accel_break * delta;
	}
	else{
		car.speed = 0;
	}
}

function stopBack(delta){
	if(car.speed + accel_break * delta < 0){
		car.speed += accel_break*delta;
	}
	else{
		car.speed = 0;
	}
}


function updateObjectMovement(delta){

	if(front && back){
		moveFront(0, delta);
	}

	else if(front && !back){
		moveFront(5, delta);
	}

	else if(!front && back){
		moveBack(3, delta);
	}

	else if(frontBreak){
		stopFront(delta);
	}

	else if(backBreak){
		stopBack(delta);
	}

	car.translateX(car.speed);
}

function updateObjectRotation(delta){

	if(left){
		rotateLeft(delta);
	}
	if(right){
		rotateRight(delta);
	}
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
	for(i = 0; i<2*Math.PI;  ){
		scene.add( new Cheerio(600 *Math.cos(i), 325 * Math.sin(i), 7, materialCheerio ));
		scene.add( new Cheerio(400 *Math.cos(i), 200 * Math.sin(i), 7, materialCheerio ));
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
    createCamera();
    //createCamera1();

    render();

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}