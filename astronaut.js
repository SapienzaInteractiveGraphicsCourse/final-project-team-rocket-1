

//Astronaut







const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );


//torso
const torso = new THREE.Mesh( geometry, material );
torso.position.set(900, 0, 0) // cube is offset x = 5 from of its parent.
torso.scale.set(40, 70, 60);

scene.add(torso); // add the cube to the scene. The scene becomes its parent Object3D.






//head


const head = new THREE.Mesh( geometry, material );
//head.position.set(0, 0.6, 0) // cube is offset x = 5 from of its parent.
//head.scale.set(0.8, 0.6, 0.7);
head.scale.set(1.6, 1.2, 1.4);
head.position.set(0, 1, 0)

torso.add(head);// add the cube to the scene. The scene becomes its parent Object3D.


//leftUpperArm--------------------------------------------------------------------------

const leftUpperArm = new THREE.Mesh( geometry, material );
leftUpperArm.position.set(0, 0.2, 0.57) //forward,up,-
leftUpperArm.scale.set(0.3, 0.5, 0.1);
leftUpperArm.rotation.x -= 0.32;

torso.add(leftUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.


//rightUpperArm

const rightUpperArm = new THREE.Mesh( geometry, material );
rightUpperArm.position.set(0, 0.2, -0.57) //forward,up,left
rightUpperArm.scale.set(0.3, 0.5, 0.1);
rightUpperArm.rotation.x += 0.32;

torso.add(rightUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.




//leftLowerArm
const leftLowerArm = new THREE.Mesh( geometry, material );
leftLowerArm.position.set(0, -0.75, 0) //forward,up,-
leftLowerArm.scale.set(1, 0.5, 1);


leftUpperArm.add(leftLowerArm); // add te cube to the scene. The scene becomes its parent Object3D.


//rightLowerArm
const rightLowerArm = new THREE.Mesh( geometry, material );
rightLowerArm.position.set(0, -0.75, 0) //forward,up,-
rightLowerArm.scale.set(1, 0.5, 1);


rightUpperArm.add(rightLowerArm); // add te cube to the scene. The scene becomes its parent Object3D.

//leftUpperLeg-------------------------------------------------------------------------------------
const leftUpperLeg = new THREE.Mesh( geometry, material );
leftUpperLeg.position.set(0, -0.70, 0.3) //forward,up,-
leftUpperLeg.scale.set(0.3, 0.4, 0.2);


torso.add(leftUpperLeg);

//rightUpperLeg-------------------------------------------------------------------------------------
const rightUpperLeg = new THREE.Mesh( geometry, material );
rightUpperLeg.position.set(0, -0.70, -0.3) //forward,up,-
rightUpperLeg.scale.set(0.3, 0.4, 0.2);


torso.add(rightUpperLeg);


//leftLowerLeg
const leftLowerLeg = new THREE.Mesh( geometry, material );
leftLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
leftLowerLeg.scale.set(1, 1, 1);


leftUpperLeg.add(leftLowerLeg);

//rightLowerLeg
const rightLowerLeg = new THREE.Mesh( geometry, material );
rightLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
rightLowerLeg.scale.set(1, 1, 1);


rightUpperLeg.add(rightLowerLeg);



//small animations which makes the astronaut moving his arms up and down
var count = 0;
const animate = function () {
    requestAnimationFrame( animate );
    count+=0.1;
    
    if(count <= 5){
    leftUpperArm.rotation.x -= 0.01;
    rightUpperArm.rotation.x += 0.01;
    torso.rotation.z += 0.005;
    }else if(count > 5 && count <= 10){
        leftUpperArm.rotation.x += 0.01;
        rightUpperArm.rotation.x -= 0.01; 
        torso.rotation.z -= 0.005;
        
    }else if(count > 10){
        count = 0;
    }

   
    
};

animate();

