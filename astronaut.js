//Astronaut and pet 








//flags
var walking = true;
var sword = false;
var attack = false;
var lights = true;
var running = false;
var info = true;






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
    emissive: 0xffffee,
    emissiveIntensity: 10,
    roughness: 1,
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
torso.position.set(2000, 0, 0) 
torso.scale.set(40, 70, 60);

torso.receiveShadow = true;
scene.add(torso);


// platform-------------------------------------------------------

const rectangle = new THREE.BoxGeometry(2.5, 5, 0.125)
var recmaterial = new THREE.MeshPhongMaterial({
    color: 'green'
})

var platform = new THREE.Mesh(rectangle,platformMat2)
platform.rotation.x = Math.PI/2
platform.position.set(0, -2.1, 0)
platform.receiveShadow = true;
torso.add(platform);

const sphere = new THREE.SphereGeometry( 0.7, 40, 20 );
const p1 = new THREE.Mesh( geometry, platformMat);
p1.position.set(0, 0, 0) 
p1.scale.set(1, 1, 1);
platform.add(p1);
//little spheres
const p2 = new THREE.Mesh( sphere, platformMat);
p2.position.set(1, 2, 0) 
p2.scale.set(0.2, 0.2, 0.2);
platform.add(p2);
const p3 = new THREE.Mesh( sphere, platformMat);
p3.position.set(-1, 2, 0) 
p3.scale.set(0.2, 0.2, 0.2);
platform.add(p3);
const p4 = new THREE.Mesh( sphere, platformMat);
p4.position.set(1, -2, 0) 
p4.scale.set(0.2, 0.2, 0.2);
platform.add(p4);
const p5 = new THREE.Mesh( sphere, platformMat);
p5.position.set(-1, -2, 0) 
p5.scale.set(0.2, 0.2, 0.2);
platform.add(p5);
const p6 = new THREE.Mesh( sphere, platformMat);
p6.position.set(-1, 0, 0) 
p6.scale.set(0.2, 0.2, 0.2);
platform.add(p6);
const p7 = new THREE.Mesh( sphere, platformMat);
p7.position.set(1, 0, 0) 
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


head.scale.set(1, 0.8, 0.9)
head.position.set(0, 1, 0)
head.receiveShadow = true;
torso.add(head);


//left shoulder
const leftShoulder = new THREE.Mesh( sphere, armsMat);
leftShoulder.scale.set(0.25, 0.25, 0.25)
leftShoulder.position.set(0, 0.4, 0.5)
torso.add(leftShoulder)


//right shoulder
const rightShoulder = new THREE.Mesh( sphere, armsMat);
rightShoulder.scale.set(0.25, 0.25, 0.25)
rightShoulder.position.set(0, 0.4, -0.5)
torso.add(rightShoulder)

//leftUpperArm--------------------------------------------------------------------------

const leftUpperArm = new THREE.Mesh( geometry, armsMat );
leftUpperArm.position.set(0, -0.7, 0.55) 

leftUpperArm.scale.set(0.6, 2., 0.6);
leftUpperArm.rotation.x -= 0.32;
leftUpperArm.receiveShadow = true;
leftShoulder.add(leftUpperArm);







//rightUpperArm

const rightUpperArm = new THREE.Mesh( geometry, armsMat );
rightUpperArm.position.set(0, -0.7, -0.55) 

rightUpperArm.scale.set(0.6, 2., 0.6);
rightUpperArm.rotation.x += 0.32;
rightUpperArm.receiveShadow = true;
rightShoulder.add(rightUpperArm);



//left arm joint
const laj = new THREE.Mesh( sphere, armsMat);
laj.scale.set(1.5, 0.3, 1.5)

laj.position.set(0, -0.4, 0)

leftUpperArm.add(laj)


//right arm joint
const raj = new THREE.Mesh( sphere, armsMat);
raj.scale.set(1.5, 0.3, 1.5)
raj.position.set(0, -0.4, 0)
rightUpperArm.add(raj)





//leftLowerArm
const leftLowerArm = new THREE.Mesh( geometry, armsMat );
leftLowerArm.position.set(0, -1.1, 0) 
leftLowerArm.scale.set(0.6, 3, 0.6);

leftLowerArm.receiveShadow = true;

laj.add(leftLowerArm); 


//rightLowerArm
const rightLowerArm = new THREE.Mesh( geometry, armsMat );
rightLowerArm.position.set(0, -1.1, 0) 
rightLowerArm.scale.set(0.6, 3, 0.6);

rightLowerArm.receiveShadow = true;
raj.add(rightLowerArm);

//leftUpperLeg-------------------------------------------------------------------------------------
const leftUpperLeg = new THREE.Mesh( geometry, armsMat );
leftUpperLeg.position.set(0, -0.60, 0.3) 
leftUpperLeg.scale.set(0.3, 0.4, 0.2);


torso.add(leftUpperLeg);

//rightUpperLeg-------------------------------------------------------------------------------------
const rightUpperLeg = new THREE.Mesh( geometry, armsMat );
rightUpperLeg.position.set(0, -0.60, -0.3) 
rightUpperLeg.scale.set(0.3, 0.4, 0.2);

rightUpperLeg.receiveShadow = true;
torso.add(rightUpperLeg);



//left leg joint

const llj = new THREE.Mesh( sphere, armsMat);
llj.scale.set(1., 0.4, 1.)
llj.position.set(0, -0.4, 0)
leftUpperLeg.add(llj)



//right leg joint
const rlj = new THREE.Mesh( sphere, armsMat);
rlj.scale.set(1., 0.4, 1.)
rlj.position.set(0, -0.4, 0)
rightUpperLeg.add(rlj)


//leftLowerLeg
const leftLowerLeg = new THREE.Mesh( geometry, armsMat );
leftLowerLeg.position.set(0, -1.4, 0.) 
leftLowerLeg.scale.set(0.8, 4, 0.8);

leftLowerLeg.receiveShadow = true;
llj.add(leftLowerLeg);

//rightLowerLeg
const rightLowerLeg = new THREE.Mesh( geometry, armsMat );
rightLowerLeg.position.set(0, -1.4, 0.) 
rightLowerLeg.scale.set(0.8, 4, 0.8);

rightLowerLeg.receiveShadow = true;
rlj.add(rightLowerLeg);


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
p6.add(lightp6);
var lightp7 = new THREE.PointLight(0xffffff, 1, 10)
lightp7.position.set(0, 0, 0)
p6.add(lightp7);







//LITTLE ALIEN ----------------------------------------------------------------------------------
//---------------------the body of the alien is torso's son-------------------------------------
//---------------------in this way they move together---------------------------------


//setting texture
var textureAlien = texloader.load('textures/mainCharacter/squidtex.jpg')
var textureAlien2 = texloader.load('textures/mainCharacter/squidlegs.jpg')


var alienMaterial = new THREE.MeshBasicMaterial({
    map: textureAlien,
    emissive: 0xffffee,
    emissiveIntensity: 30,
    
   
})
var alienMaterial2 = new THREE.MeshBasicMaterial({
    map: textureAlien2,
    emissive: 0xffffee,
    emissiveIntensity: 40,
    
   
})
//-----------------------------------------------------

//BUILDING BODY AND 'LEGS'
const body = new THREE.Mesh( geometry, alienMaterial );
body.position.set(0, 3, 3.) 
body.scale.set(1.5, 0.8, 1);

body.receiveShadow = true;
torso.add(body);

var lightpet = new THREE.PointLight(0xffffff, 1)
lightpet.position.set(0, 0, 0)

body.add(lightpet);
//-----------------------
const l1 = new THREE.Mesh( geometry, alienMaterial2 );
l1.position.set(0.35, -0.70, -0.5) 
l1.scale.set(0.2, 2, 0.1);
l1.rotation.x += 0.32;
l1.receiveShadow = true;
body.add(l1);
//---------------------
const l2 = new THREE.Mesh( geometry, alienMaterial2);
l2.position.set(0.35, -0.70, 0.5) 
l2.scale.set(0.2, 2, 0.1);
l2.rotation.x -= 0.32;
l2.receiveShadow = true;
body.add(l2);
//--------------------------
const l3 = new THREE.Mesh( geometry, alienMaterial2 );
l3.position.set(-0.35, -0.70, -0.5) 
l3.scale.set(0.2, 2, 0.1);
l3.rotation.x += 0.32;
l3.receiveShadow = true;
body.add(l3);

//-------------------------------------
const l4 = new THREE.Mesh( geometry, alienMaterial2 );
l4.position.set(-0.35, -0.70, +0.5) 
l4.scale.set(0.2, 2, 0.1);
l4.rotation.x -= 0.32;
l4.receiveShadow = true;
body.add(l4);

//-------------------------------------
const l5 = new THREE.Mesh( geometry, alienMaterial2);
l5.position.set(-0.35, -0.70, 0) 
l5.scale.set(0.2, 2, 0.1);
l5.rotation.y -= 0.32;
l5.receiveShadow = true;
body.add(l5);
//-------------------------------
const l6 = new THREE.Mesh( geometry, alienMaterial2);
l6.position.set(0.35, -0.70, 0) 
l6.scale.set(0.2, 2, 0.1);
l6.rotation.y -= 0.32;
l6.receiveShadow = true;
body.add(l6);
//OTHER OBJECTS---------------------------------------------------------------------------------------
//--------------these can be used for animations----------------------------------------------------
//------------------------------------------------------------------------------------------------


//-------------------------------------------sword


const s1 = new THREE.Mesh( geometry, swordMat);
s1.position.set(0, -1.6, 0) 
s1.scale.set(1, 2.6, 1);



function createSword(){
leftLowerArm.add(s1);
}
function removeSword(){
    leftLowerArm.remove(s1);
}















//small animations 
var count = 0;
var runCount = 0;
var attackCount = 0;
const animate = function () {

    requestAnimationFrame( animate );
  if(keyboard.pressed('I')){
      info = true;
  }
  if(keyboard.pressed('O')){
    info = false;
}

   
   if(!info){
    var element = document.getElementById('overlay');
    element.style.opacity = "0";
   }
   if(info){
    var element = document.getElementById('overlay');
    element.style.opacity = "1";
   }
   
 
    //transitions between running and walking
    
    if ( keyboard.pressed("X") ){
        if(sword){
            removeSword();
            sword = false;

        }
        torso.position.set(2000, 0, 0) 
        body.position.set(0, 3, 3.)
        body.rotation.x = 0; 
       //------
           l1.rotation.x = 0.32;
           l2.rotation.x = -0.32;
           l3.rotation.x = 0.32;;
           l4.rotation.x = -0.32;
           l5.rotation.y = -0.32;
           l6.rotation.y = -0.32;
           //l6.rotation.z = 0;
           l5.rotation.z = 0;



        walking = false;
        
        leftUpperArm.rotation.x = 0;
       rightUpperArm.rotation.x = 0;
       running = true;
       

        
        
        
    }

    if ( keyboard.pressed("Z") ){
        if(!walking){
        
        
        
        running = false;
        torso.position.set(2000, 0, 0) 
        runCount=0;
        leftShoulder.rotation.z =0;
        rightShoulder.rotation.z =0;


       leftLowerArm.rotation.z =0;
       rightLowerArm.rotation.z =0;
       
       
       body.position.set(0, 3, 3.)
    
      
        llj.rotation.z =0;
        rlj.rotation.z =0;


        rightUpperLeg.rotation.z =0;
        leftUpperLeg.rotation.z =0;
        




        leftUpperArm.rotation.x = -0.32;
       rightUpperArm.rotation.x = +0.32;
       leftUpperArm.rotation.y= 0;
       rightUpperArm.rotation.y = 0;

       rightLowerArm.position.set(0, -1.1, 0)
       leftLowerArm.position.set(0, -1.1, 0)



       body.rotation.x = 0; 
       //------
           l1.rotation.x = 0.32;
           l2.rotation.x = -0.32;
           l3.rotation.x = 0.32;;
           l4.rotation.x = -0.32;
           l5.rotation.y = -0.32;
           l6.rotation.y = -0.32;
          // l6.rotation.z = 0;
           l5.rotation.z = 0;


       walking=true;

        }
        
       
       

        
        
        
    }



if(running && !walking){

    
    
    runCount+=0.25;

    
 
    
    if(runCount <= 5){


       leftShoulder.rotation.z -= 0.04;
       leftLowerArm.rotation.z -= 0.02;
       leftLowerArm.translateX(-0.02)
       rightShoulder.rotation.z += 0.04;
       rightLowerArm.rotation.z -= 0.02;
       rightLowerArm.translateX(-0.02)


      
        llj.rotation.z += 0.04;
        
      
       

        rlj.rotation.z += 0.04;
        rightUpperLeg.rotation.z -= 0.04;
        
    //-----------
         body.rotation.x -= 0.001; 
    //------
        l1.rotation.x += 0.005;
        l2.rotation.x -= 0.005;
        l3.rotation.x += 0.005;
        l4.rotation.x -= 0.005;
        l5.rotation.z -= 0.005;
        l6.rotation.z += 0.005;
    //translation
        torso.translateY( 0.3);
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




    }else if(runCount > 5 && runCount <= 10){
        leftShoulder.rotation.z += 0.04;
        leftLowerArm.rotation.z += 0.02;
        leftLowerArm.translateX(+0.02)
        rightShoulder.rotation.z -= 0.04
        rightLowerArm.rotation.z+= 0.02;
        rightLowerArm.translateX(+0.02)
        

        llj.rotation.z -= 0.04;

        rlj.rotation.z -= 0.04;
        rightUpperLeg.rotation.z += 0.04;

       
        

       
       //------------
        body.rotation.x += 0.001; 
       
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

    
       
        
    }else if(runCount > 10 && runCount <= 15){




       rightShoulder.rotation.z -= 0.04;
       rightLowerArm.rotation.z -= 0.02;
       rightLowerArm.translateX(-0.02)
       leftShoulder.rotation.z += 0.04;
       leftLowerArm.rotation.z -= 0.02;
       leftLowerArm.translateX(-0.02)


      
        rlj.rotation.z += 0.04;
        
      
       

        llj.rotation.z += 0.04;
        leftUpperLeg.rotation.z -= 0.04;
        
    //-----------
         body.rotation.x -= 0.001; 
    //------
        l1.rotation.x += 0.005;
        l2.rotation.x -= 0.005;
        l3.rotation.x += 0.005;
        l4.rotation.x -= 0.005;
        l5.rotation.z -= 0.005;
        l6.rotation.z += 0.005;
    //translation
        torso.translateY( 0.3);
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





    }else if(runCount > 15 && runCount <= 20){


        rightShoulder.rotation.z += 0.04;
        rightLowerArm.rotation.z += 0.02;
        rightLowerArm.translateX(+0.02)
        leftShoulder.rotation.z -= 0.04
        leftLowerArm.rotation.z+= 0.02;
        leftLowerArm.translateX(+0.02)
        

        rlj.rotation.z -= 0.04;

        llj.rotation.z -= 0.04;
        leftUpperLeg.rotation.z += 0.04;

       
        

       
       //------------
        body.rotation.x += 0.001; 
       
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
        


    }
    
    
    
    
    else if(runCount > 20){
        runCount = 0;
        leftLowerArm.position.set(0, -1.1, 0)
        rightLowerArm.position.set(0, -1.1, 0)
        
    }







}





//sword animations
if ( keyboard.pressed("G") ){
    if(!sword && !running){
       
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
        leftShoulder.rotation.z -= 0.09;
        
        
        
        torso.translateX( -moveDistance );
        platform.translateX( 0.1);
        
        leftUpperLeg.rotation.z += 0.02;
        rlj.rotation.z += 0.02;
        llj.rotation.z += 0.02;
        rightUpperLeg.rotation.z -= 0.02;

    }
    if(attackCount >= 2.1 && attackCount < 4.1){
        leftShoulder.rotation.z += 0.09;
        
        torso.translateX( moveDistance );
        platform.translateX( -0.1 );
        
        leftUpperLeg.rotation.z -= 0.02;
        rlj.rotation.z -= 0.02;
        llj.rotation.z -= 0.02;
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

