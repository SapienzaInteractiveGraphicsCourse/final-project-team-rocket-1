//Astronaut and pet 


//------------------------------------
//WASD --> move
//G--> extract sword
//H--> sheathe sword
//J-->sword attack






//flags
var walking = true;
var sword = false;
var attack = false;
var lights = true;



//textures--------------------------------------------------------------------------------
var texloader = new THREE.TextureLoader();
var textureArms = texloader.load('textures/mainCharacter/arms.png');
var armsMat = new THREE.MeshBasicMaterial({
    map: textureArms,
   
})
var texturePlatform = texloader.load('textures/mainCharacter/platform.jpg');
var texturePlatform2 = texloader.load('textures/mainCharacter/platform.png');
var platformMat = new THREE.MeshBasicMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 10,
    roughness: 1,
    map: texturePlatform,
    
   
})
var platformMat2 = new THREE.MeshBasicMaterial({
    map: texturePlatform2,
   
})
var textureTorso = texloader.load('textures/mainCharacter/body.png');
var torsoMat = new THREE.MeshBasicMaterial({
    map: textureTorso,

   
})


var textureSword = texloader.load('textures/mainCharacter/sword.jpg');
var swordMat = new THREE.MeshBasicMaterial({
    map: textureSword,
   
})
var textureFace = texloader.load('textures/mainCharacter/face.jpg');
var headMat = [ new THREE.MeshBasicMaterial({
    map: textureArms,
   
}),
new THREE.MeshBasicMaterial({
    map: textureFace,
   
}),
new THREE.MeshBasicMaterial({
    map: textureArms,
   
}),
new THREE.MeshBasicMaterial({
    map: textureArms,
   
}),
new THREE.MeshBasicMaterial({
    map: textureArms,
   
}),
new THREE.MeshBasicMaterial({
    map: textureArms,
   
})]










//define geometry and materials

const geometry = new THREE.BoxGeometry(1,1,1);






const material = new THREE.MeshBasicMaterial( 
    {color: 0xffffff ,
        emissive: 0xffffee,
        emissiveIntensity: 10,
        roughness: 1,
    
    });
const materialBlack = new THREE.MeshBasicMaterial( { color: 0x000000 } );








//torso
const torso = new THREE.Mesh( geometry, torsoMat );
torso.position.set(2000, 0, 0) // cube is offset x = 5 from of its parent.
torso.scale.set(40, 70, 60);

torso.receiveShadow = true;

    


//torsoBB = new THREE.Box3(minTorsoBB, maxTorsoBB).setFromObject(torso);*/
//in the case of the platform as father, use the lines below
//torso.position.set(0, 0, -85)
//torso.scale.set(40, 70, 60);
//torso.rotation.x = -Math.PI/2
//----------------
scene.add(torso);


// platform-------------------------------------------------------

const rectangle = new THREE.BoxGeometry(2.5, 5, 0.125)
var recmaterial = new THREE.MeshPhongMaterial({
    color: 'green'
})

var platform = new THREE.Mesh(rectangle,platformMat2)
platform.rotation.x = Math.PI/2
platform.position.set(0, -1.9, 0)
platform.receiveShadow = true;
torso.add(platform);

const sphere = new THREE.SphereGeometry( 0.7, 40, 20 );
const p1 = new THREE.Mesh( sphere, platformMat);
p1.position.set(0, 0, 0) // cube is offset x = 5 from of its parent.
p1.scale.set(1, 1, 1);
platform.add(p1);
//little spheres
const p2 = new THREE.Mesh( sphere, platformMat);
p2.position.set(1, 2, 0) // cube is offset x = 5 from of its parent.
p2.scale.set(0.2, 0.2, 0.2);
platform.add(p2);
const p3 = new THREE.Mesh( sphere, platformMat);
p3.position.set(-1, 2, 0) // cube is offset x = 5 from of its parent.
p3.scale.set(0.2, 0.2, 0.2);
platform.add(p3);
const p4 = new THREE.Mesh( sphere, platformMat);
p4.position.set(1, -2, 0) // cube is offset x = 5 from of its parent.
p4.scale.set(0.2, 0.2, 0.2);
platform.add(p4);
const p5 = new THREE.Mesh( sphere, platformMat);
p5.position.set(-1, -2, 0) // cube is offset x = 5 from of its parent.
p5.scale.set(0.2, 0.2, 0.2);
platform.add(p5);
const p6 = new THREE.Mesh( sphere, platformMat);
p6.position.set(-1, 0, 0) // cube is offset x = 5 from of its parent.
p6.scale.set(0.2, 0.2, 0.2);
platform.add(p6);
const p7 = new THREE.Mesh( sphere, platformMat);
p7.position.set(1, 0, 0) // cube is offset x = 5 from of its parent.
p7.scale.set(0.2, 0.2, 0.2);
platform.add(p7);

//cones
const cone = new THREE.ConeGeometry( 2, 40, 8);
const c1 = new THREE.Mesh( cone, platformMat);
c1.scale.set(0.1, 0.1, 0.1);
c1.position.set(0, 3.5, 0);
c1.rotation.y = Math.PI;
platform.add( c1);
const c2 = new THREE.Mesh( cone, platformMat);
c2.scale.set(0.1, 0.1, 0.1);
c2.position.set(0, -3.5, 0);
c2.rotation.y = Math.PI;
c2.rotation.z = Math.PI;


platform.add( c2);





//head--------------------------------------------
const head = new THREE.Mesh( geometry, headMat );

head.scale.set(1.6, 1.2, 1.4);
head.position.set(0, 1, 0)
head.receiveShadow = true;
torso.add(head);// add the cube to the scene. The scene becomes its parent Object3D.


//leftUpperArm--------------------------------------------------------------------------

const leftUpperArm = new THREE.Mesh( geometry, armsMat );
leftUpperArm.position.set(0, 0.2, 0.57) //forward,up,-
leftUpperArm.scale.set(0.3, 0.5, 0.1);
leftUpperArm.rotation.x -= 0.32;
leftUpperArm.receiveShadow = true;
torso.add(leftUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.


//rightUpperArm

const rightUpperArm = new THREE.Mesh( geometry, armsMat );
rightUpperArm.position.set(0, 0.2, -0.57) //forward,up,left
rightUpperArm.scale.set(0.3, 0.5, 0.1);

rightUpperArm.rotation.x += 0.32;
rightUpperArm.receiveShadow = true;
torso.add(rightUpperArm); // add the cube to the scene. The scene becomes its parent Object3D.




//leftLowerArm
const leftLowerArm = new THREE.Mesh( geometry, armsMat );
leftLowerArm.position.set(0, -0.75, 0) //forward,up,-
leftLowerArm.scale.set(1, 0.5, 1);

leftLowerArm.receiveShadow = true;

leftUpperArm.add(leftLowerArm); // add te cube to the scene. The scene becomes its parent Object3D.


//rightLowerArm
const rightLowerArm = new THREE.Mesh( geometry, armsMat );
rightLowerArm.position.set(0, -0.75, 0) //forward,up,-
rightLowerArm.scale.set(1, 0.5, 1);

rightLowerArm.receiveShadow = true;
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

rightUpperLeg.receiveShadow = true;
torso.add(rightUpperLeg);


//leftLowerLeg
const leftLowerLeg = new THREE.Mesh( geometry, armsMat );
leftLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
leftLowerLeg.scale.set(1, 1, 1);

leftLowerLeg.receiveShadow = true;
leftUpperLeg.add(leftLowerLeg);

//rightLowerLeg
const rightLowerLeg = new THREE.Mesh( geometry, armsMat );
rightLowerLeg.position.set(0, -0.75, 0.) //forward,up,-
rightLowerLeg.scale.set(1, 1, 1);

rightLowerLeg.receiveShadow = true;
rightUpperLeg.add(rightLowerLeg);


//lights

var lightp1 = new THREE.PointLight(0xffffff, 1, 10)
lightp1.position.set(0, 0, 0)

p1.add(lightp1);
var lightp2 = new THREE.PointLight(0xffffff, 1 , 10)
lightp2.position.set(0, 0, 0)
p2.add(lightp2);
var lightp3 = new THREE.PointLight(0xffffff, 1, 10 )
lightp3.position.set(0, 0, 0)
p3.add(lightp3);
var lightp4 = new THREE.PointLight(0xffffff, 1 , 10)
lightp4.position.set(0, 0, 0)
p4.add(lightp4);
var lightp5 = new THREE.PointLight(0xffffff, 1 , 10)
lightp5.position.set(0, 0, 0)
p5.add(lightp5);
var lightp6 = new THREE.PointLight(0xffffff, 1, 10)
lightp6.position.set(0, 0, 0)
p5.add(lightp6);





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
body.scale.set(1.5, 0.8, 1);

body.receiveShadow = true;
torso.add(body);

//-----------------------
const l1 = new THREE.Mesh( geometry, alienMaterial );
l1.position.set(0.35, -0.70, -0.5) //forward,up,-
l1.scale.set(0.2, 0.8, 0.1);
l1.rotation.x += 0.32;
l1.receiveShadow = true;
body.add(l1);
//---------------------
const l2 = new THREE.Mesh( geometry, alienMaterial);
l2.position.set(0.35, -0.70, 0.5) //forward,up,-
l2.scale.set(0.2, 0.8, 0.1);
l2.rotation.x -= 0.32;
l2.receiveShadow = true;
body.add(l2);
//--------------------------
const l3 = new THREE.Mesh( geometry, alienMaterial );
l3.position.set(-0.35, -0.70, -0.5) //forward,up,-
l3.scale.set(0.2, 0.8, 0.1);
l3.rotation.x += 0.32;
l3.receiveShadow = true;
body.add(l3);

//-------------------------------------
const l4 = new THREE.Mesh( geometry, alienMaterial );
l4.position.set(-0.35, -0.70, +0.5) //forward,up,-
l4.scale.set(0.2, 0.8, 0.1);
l4.rotation.x -= 0.32;
l4.receiveShadow = true;
body.add(l4);

//-------------------------------------
const l5 = new THREE.Mesh( geometry, alienMaterial );
l5.position.set(-0.35, -0.70, 0) //forward,up,-
l5.scale.set(0.2, 0.8, 0.1);
l5.rotation.y -= 0.32;
l5.receiveShadow = true;
body.add(l5);
//-------------------------------
const l6 = new THREE.Mesh( geometry, alienMaterial);
l6.position.set(0.35, -0.70, 0) //forward,up,-
l6.scale.set(0.2, 0.8, 0.1);
l6.rotation.y -= 0.32;
l6.receiveShadow = true;
body.add(l6);
//OTHER OBJECTS---------------------------------------------------------------------------------------
//--------------these can be used for animations----------------------------------------------------
//------------------------------------------------------------------------------------------------


//-------------------------------------------sword


const s1 = new THREE.Mesh( geometry, swordMat);
s1.position.set(0, -2.6, 0) //forward,up,-
s1.scale.set(1, 4, 1);



function createSword(){
leftLowerArm.add(s1);
}
function removeSword(){
    leftLowerArm.remove(s1);
}















//small animations 
var count = 0;
var attackCount = 0;
const animate = function () {

    requestAnimationFrame( animate );

    









//sword animations
if ( keyboard.pressed("G") ){
    if(!sword){
       
        createSword();
        sword = true;
    }
    
    
    
}


if ( keyboard.pressed("H") ){
    if(sword){
        removeSword();
        sword = false;
    }
    
    
}

if ( keyboard.pressed("J") ){
    attack = true; 
    
    
}







if(attack){
    if(sword){
    
    attackCount+= 0.1;
    if(attackCount < 2.1 ){
        leftUpperArm.rotation.z -= 0.11;
        leftLowerArm.rotation.z -= 0.01;
        torso.translateX( -moveDistance );
        platform.translateX( 0.1);
        //head.rotation.y += 0.2;
        leftUpperLeg.rotation.z += 0.02;
        rightUpperLeg.rotation.z -= 0.02;

    }
    if(attackCount >= 2.1 && attackCount < 4.1){
        leftUpperArm.rotation.z += 0.11;
        leftLowerArm.rotation.z += 0.01;
        torso.translateX( moveDistance );
        platform.translateX( -0.1 );
        //head.rotation.y -= 0.2; 
        leftUpperLeg.rotation.z -= 0.02;
        rightUpperLeg.rotation.z += 0.02;
    }
    if(attackCount >= 4.1){
        attackCount = 0;
        attack = false;
        camera.lookAt(torso.position);
        
    }
}else{
    attack = false;
}
    
}

   





//walking animation(the astronaut goes up and down and moves his arms)
   if(walking){

   
    count+=0.1;


 
    
    if(count <= 5){
    leftUpperArm.rotation.x -= 0.01;
    rightUpperArm.rotation.x += 0.01;

    body.rotation.x -= 0.001; 
    //------
   l1.rotation.x += 0.005;
    l2.rotation.x -= 0.005;
    l3.rotation.x += 0.005;
    l4.rotation.x -= 0.005;
    l5.rotation.z -= 0.005;
    l6.rotation.z += 0.005;
    //translation
    torso.translateY( 0.3 );
    body.translateY( -0.03 );
    platform.translateZ(-0.002)
   //platform colors

   
   p1.material = material;
   p2.material = platformMat;
   p3.material = platformMat;
   p4.material = platformMat;
   p5.material = platformMat;
   p6.material = material;
   p7.material = material;




    }else if(count > 5 && count <= 10){
        leftUpperArm.rotation.x += 0.01;
        rightUpperArm.rotation.x -= 0.01; 
        body.rotation.x += 0.001; 
       // torso.rotation.z -= 0.005;
        torso.translateY( -0.3 );
        body.translateY( 0.03 );
        platform.translateZ(0.002)
     //---------------------
        l1.rotation.x -= 0.005;
        l2.rotation.x += 0.005;
        l3.rotation.x -= 0.005;
        l4.rotation.x += 0.005;
        l5.rotation.z += 0.005;
        l6.rotation.z -= 0.005;
        //colors
        p1.material = platformMat;
        p2.material = material;
        p3.material = material;
        p4.material = material;
        p5.material = material;
        p6.material = platformMat;
        p7.material = platformMat;
        
    }else if(count > 10){
        count = 0;
    }





}
   
    
};


animate();

