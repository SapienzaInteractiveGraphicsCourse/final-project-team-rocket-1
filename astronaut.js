//Astronaut and pet 





//textures
var texloader = new THREE.TextureLoader();
var textureArms = texloader.load('textures/mainCharacter/arms.png');
var armsMat = new THREE.MeshBasicMaterial({
    map: textureArms,
   
})
var textureTorso = texloader.load('textures/mainCharacter/body.png');
var torsoMat = new THREE.MeshBasicMaterial({
    map: textureTorso,
   
})








//define geometry and materials

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const materialBlack = new THREE.MeshBasicMaterial( { color: 0x000000 } );


//torso
const torso = new THREE.Mesh( geometry, torsoMat );
torso.position.set(900, 0, 0) // cube is offset x = 5 from of its parent.
torso.scale.set(40, 70, 60);

scene.add(torso); // add the cube to the scene. The scene becomes its parent Object3D.






//head


const head = new THREE.Mesh( geometry, material );

head.scale.set(1.6, 1.2, 1.4);
head.position.set(0, 1, 0)

torso.add(head);// add the cube to the scene. The scene becomes its parent Object3D.


//leftUpperArm--------------------------------------------------------------------------

const leftUpperArm = new THREE.Mesh( geometry, armsMat );
leftUpperArm.position.set(0, 0.2, 0.57) //forward,up,-
leftUpperArm.scale.set(0.3, 0.5, 0.1);
leftUpperArm.rotation.x -= 0.32;

torso.add(leftUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.


//rightUpperArm

const rightUpperArm = new THREE.Mesh( geometry, armsMat );
rightUpperArm.position.set(0, 0.2, -0.57) //forward,up,left
rightUpperArm.scale.set(0.3, 0.5, 0.1);
rightUpperArm.rotation.x += 0.32;

torso.add(rightUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.




//leftLowerArm
const leftLowerArm = new THREE.Mesh( geometry, armsMat );
leftLowerArm.position.set(0, -0.75, 0) //forward,up,-
leftLowerArm.scale.set(1, 0.5, 1);


leftUpperArm.add(leftLowerArm); // add te cube to the scene. The scene becomes its parent Object3D.


//rightLowerArm
const rightLowerArm = new THREE.Mesh( geometry, armsMat );
rightLowerArm.position.set(0, -0.75, 0) //forward,up,-
rightLowerArm.scale.set(1, 0.5, 1);


rightUpperArm.add(rightLowerArm); // add te cube to the scene. The scene becomes its parent Object3D.

//leftUpperLeg-------------------------------------------------------------------------------------
const leftUpperLeg = new THREE.Mesh( geometry, armsMat );
leftUpperLeg.position.set(0, -0.70, 0.3) //forward,up,-
leftUpperLeg.scale.set(0.3, 0.4, 0.2);


torso.add(leftUpperLeg);

//rightUpperLeg-------------------------------------------------------------------------------------
const rightUpperLeg = new THREE.Mesh( geometry, armsMat );
rightUpperLeg.position.set(0, -0.70, -0.3) //forward,up,-
rightUpperLeg.scale.set(0.3, 0.4, 0.2);


torso.add(rightUpperLeg);


//leftLowerLeg
const leftLowerLeg = new THREE.Mesh( geometry, armsMat );
leftLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
leftLowerLeg.scale.set(1, 1, 1);


leftUpperLeg.add(leftLowerLeg);

//rightLowerLeg
const rightLowerLeg = new THREE.Mesh( geometry, armsMat );
rightLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
rightLowerLeg.scale.set(1, 1, 1);


rightUpperLeg.add(rightLowerLeg);





//LITTLE ALIEN ----------------------------------------------------------------------------------
//---------------------the body of the alien is torso's son-------------------------------------
//---------------------in this way they move together---------------------------------


//setting texture
var textureAlien = texloader.load('textures/mainCharacter/squidtex.jpg')


var alienMaterial = new THREE.MeshBasicMaterial({
    map: textureAlien,
   
})
//-----------------------------------------------------

//BUILDING BODY AND 'LEGS'
const body = new THREE.Mesh( geometry, alienMaterial );
body.position.set(0, 3, 3.) //forward,up,-
body.scale.set(1, 0.8, 1);


torso.add(body);

//-----------------------
const l1 = new THREE.Mesh( geometry, alienMaterial );
l1.position.set(0.4, -0.70, -0.5) //forward,up,-
l1.scale.set(0.2, 0.8, 0.1);
l1.rotation.x += 0.32;

body.add(l1);
//---------------------
const l2 = new THREE.Mesh( geometry, alienMaterial);
l2.position.set(0.4, -0.70, 0.5) //forward,up,-
l2.scale.set(0.2, 0.8, 0.1);
l2.rotation.x -= 0.32;

body.add(l2);
//--------------------------
const l3 = new THREE.Mesh( geometry, alienMaterial );
l3.position.set(-0.4, -0.70, -0.5) //forward,up,-
l3.scale.set(0.2, 0.8, 0.1);
l3.rotation.x += 0.32;

body.add(l3);

//-------------------------------------
const l4 = new THREE.Mesh( geometry, alienMaterial );
l4.position.set(-0.4, -0.70, +0.5) //forward,up,-
l4.scale.set(0.2, 0.8, 0.1);
l4.rotation.x -= 0.32;

body.add(l4);

//-------------------------------------
const l5 = new THREE.Mesh( geometry, alienMaterial );
l5.position.set(-0.5, -0.70, 0) //forward,up,-
l5.scale.set(0.2, 0.8, 0.1);
l5.rotation.y -= 0.32;

body.add(l5);
//-------------------------------
const l6 = new THREE.Mesh( geometry, alienMaterial);
l6.position.set(0.5, -0.70, 0) //forward,up,-
l6.scale.set(0.2, 0.8, 0.1);
l6.rotation.y -= 0.32;

body.add(l6);



//small animations which makes the astronaut moving his arms up and down
var count = 0;
const animate = function () {

    requestAnimationFrame( animate );

    delta = clock.getDelta(); // seconds.
	moveDistance = 500 * delta;

if ( keyboard.pressed("W") )
    torso.translateZ( -moveDistance );
if ( keyboard.pressed("S") )
    torso.translateZ(  moveDistance );
if ( keyboard.pressed("A") )
    torso.translateX( -moveDistance );
if ( keyboard.pressed("D") )
    torso.translateX(  moveDistance );






   
    count+=0.1;


 
    
    if(count <= 5){
    leftUpperArm.rotation.x -= 0.01;
    rightUpperArm.rotation.x += 0.01;
    //------
    l1.rotation.x += 0.005;
    l2.rotation.x -= 0.005;
    l3.rotation.x += 0.005;
    l4.rotation.z += 0.005;
    l5.rotation.z -= 0.005;
    //torso.rotation.z += 0.005;
    torso.translateY( 2 );
    }else if(count > 5 && count <= 10){
        leftUpperArm.rotation.x += 0.01;
        rightUpperArm.rotation.x -= 0.01; 
       // torso.rotation.z -= 0.005;
        torso.translateY( -2 );
     //---------------------
        l1.rotation.x -= 0.005;
        l2.rotation.x += 0.005;
        l3.rotation.x -= 0.005;
        l4.rotation.z -= 0.005;
        l5.rotation.z += 0.005;
        
    }else if(count > 10){
        count = 0;
    }

   
    
};


animate();

