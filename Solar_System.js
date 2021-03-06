"use strict"

var flag = false
var orbits = true
var orbitsC = false

var canvas = document.getElementById('gl-canvas');
var context = canvas.getContext('2d');

var collidableMeshList = [];

// planets numbers
var SUN = 0
var MERCURY = 1
var VENUS = 2
var EARTH = 3
var MARS = 4
var JUPITER = 5
var SATURN = 6
var URANUS = 7
var NEPTUNE = 8
var MOON = 9

var SunCollision;

// planets array and data array
var Planets = []
var PlanetsData = []

var planetsfocus = false
var freefocus = true
var bodyfocus = false
var focus = 0

var newplanet
var commonSphere
var Sun,Mercury,Venus,Earth,Mars,Jupiter,Saturn,Uranus,Neptune,Moon
var SaturnsRing
var UranusRing

var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

var delta
var moveDistance
var rotateAngle

var daysPerFrame = 0.25

// Date for planets position
// Time scale formula based on http://www.stjarnhimlen.se/comp/ppcomp.html
var y = 2000;
var m = 1;
var D = 1;
var startD = 367 * y - 7 * (y + (m + 9) / 12) / 4 + 275 * m / 9 + D - 730530;
var oldTimeD = startD;
var currTimeD = startD;

var auScale = 149597.870700; // AU in thousands of kilometers

var dtheta = 2*Math.PI/10000
var theta = [1,3,5,7,11,13,17,19,23,29]
var PlanetsR = [1000,1300,1600,1900,2100,2400,2700,3000,3300,80] // radius of simplified orbits
var orbitals = []

// set up the scene and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 2000000000000)
camera.position.set(2000,0,0)
camera.up.set = (0,1,0)
camera.lookAt(0, 0, 0)
scene.add(camera)

// setup texture loader
var loader = new THREE.TextureLoader()

// adding the scene texture
var Galaxy = BigBang(8500000)
scene.add(Galaxy)

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize( innerWidth, innerHeight )
document.body.appendChild( renderer.domElement )

// setup lights
var light = new THREE.PointLight(0x111111, 1)
light.position.set(0, 0, 0)
scene.add(light)
var ambient = new THREE.AmbientLight(0x111111)
scene.add(ambient)

/* --------------------------------------------------------------------------------------- */

function createRings(){
    var ring = new THREE.RingGeometry(70, 100, 128)
    var gas = new THREE.MeshBasicMaterial({
        //wireframe: true
        map: loader.load('textures/Saturn/saturnringcolor.jpg')
    })
    SaturnsRing = new THREE.Mesh(ring,gas)
    SaturnsRing.rotation.x = 11.2
    scene.add(SaturnsRing)

    ring = new THREE.RingGeometry(40, 50, 100)
    gas = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Uranus/uranusringcolour.jpg')
    })
    UranusRing = new THREE.Mesh(ring,gas)
    UranusRing.rotation.y = 11.77
    scene.add(UranusRing)
}
createRings()

function BigBang(radius) {

    var texture = loader.load('textures/Stars.jpg')
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
    })
    var geometry = new THREE.SphereGeometry(radius, 100, 100)
    var mesh = new THREE.Mesh(geometry, material)

    return mesh
}

function render() {
    
    requestAnimationFrame(render); 
    renderer.render(scene, camera);

    delta = clock.getDelta(); // seconds.
	moveDistance = 500 * delta // 200 pixels per second
	rotateAngle = Math.PI / 4 * delta   // pi/2 radians (90 degrees) per second
    
    
    
    
    // change view modality
    if(keyboard.pressed("P")) {
        planetsfocus = true
        bodyfocus = false
        freefocus = false
        orbits = true
    }
    if(keyboard.pressed("B")) {
        planetsfocus = false
        bodyfocus = true
        freefocus = false
        orbits = false
    }
    if(keyboard.pressed("L")) {
        planetsfocus = false
        bodyfocus = false
        freefocus = true
    }

    if(orbits == true){

        for(var i = 0; i < PlanetsData.length-2; i++){
            if(orbitsC == true) orbitals[i].visible = false
        }

        // make the planets real orbit
        for(var i = 1; i < PlanetsData.length; i++){

            // Advance the time in days
            oldTimeD = currTimeD;
            currTimeD = currTimeD + daysPerFrame;
            var deltaTimeD = currTimeD - oldTimeD;

            var P = Planets[i]
            var Data = PlanetsData[i]

            // Calculate the planet orbital elements from the current time in days
            var N =  (Data["N1"] + Data["N2"] * currTimeD) * Math.PI / 180;
            var iData = (Data["i1"] + Data["i2"] * currTimeD) * Math.PI / 180;
            var w =  (Data["w1"] + Data["w2"] * currTimeD) * Math.PI / 180;
            var a = Data["a1"] + Data["a2"] * currTimeD;
            var e = Data["e1"] + Data["e2"] * currTimeD;
            var M = (Data["M1"] + Data["M2"] * currTimeD) * Math.PI / 180;
            var E = M + e * Math.sin(M) * (1.0 + e * Math.cos(M));

            var xv = a * (Math.cos(E) - e);
            var yv = a * (Math.sqrt(1.0 - e * e) * Math.sin(E));
            var v = Math.atan2(yv, xv);

            // Calculate the distance (radius)
            var r = Math.sqrt(xv * xv + yv * yv);

            // From http://www.davidcolarusso.com/astro/
            // Modified to compensate for the right handed coordinate system of OpenGL
            var xh = r * (Math.cos(N) * Math.cos(v + w)
                        - Math.sin(N) * Math.sin(v + w) * Math.cos(iData));
            var zh = -r * (Math.sin(N) * Math.cos(v + w)
                        + Math.cos(N) * Math.sin(v + w) * Math.cos(iData));
            var yh = r * (Math.sin(w + v) * Math.sin(iData));

            // Apply the position offset from the center of orbit to the bodies
            var orbitcenter = Planets[Data["centerOfOrbit"]]
            P.position.set(orbitcenter.position.x + xh * auScale, orbitcenter.position.y  + yh * auScale, orbitcenter.position.z  + zh * auScale);
            
            // Calculate and apply the appropriate axis tilt to the bodies
            // and rotate them around the axis
            var radians = Data["tilt"] * Math.PI / 180; // tilt in radians
            P.rotation.order = 'ZXY';
            P.rotation.x = 0;
            P.rotation.y += (deltaTimeD / Data["period"]) * Math.PI /100;
            P.rotation.z = radians;
            P.updateMatrix();

        }
    } else {
        
        // planets simplified position to make
        
        // maybe scale the planets if too big

        oldTimeD = currTimeD
        currTimeD = currTimeD + daysPerFrame
        var deltaTimeD = currTimeD - oldTimeD

        // create simplified orbits
        if(!orbitsC){
            for(var i = 1; i < PlanetsData.length-1; i++){

                var orb = new THREE.RingGeometry(PlanetsR[i],PlanetsR[i]+0.000001, 128);
                orb.rotateX(-Math.PI / 2);
                var line = new THREE.LineBasicMaterial( { color: 'white' } );
                var orbital = new THREE.Line( orb, line );
                scene.add(orbital)
                orbitals.push(orbital)
            }
            orbitsC = true
        } else {
            for(var i = 1; i < PlanetsData.length-2; i++){
                orbitals[i].visible = true
            }
        }
        
        for(var i = 1; i < PlanetsData.length-1; i++){

            theta[i] += dtheta
            Planets[i].position.x = PlanetsR[i] * Math.cos(theta[i]);
            Planets[i].position.z = PlanetsR[i] * Math.sin(theta[i]);
            Planets[i].position.y = Planets[0].position.y
            Planets[i].rotation.y += 0.05
        }
        Planets[9].position.x = Planets[3].position.x + 20 * Math.cos(4*theta[i]);
        Planets[9].position.y = Planets[3].position.y ;
        Planets[9].position.z = Planets[3].position.z ;
    }
    
    SaturnsRing.position.x = Planets[6].position.x
    SaturnsRing.position.y = Planets[6].position.y
    SaturnsRing.position.z = Planets[6].position.z
    SaturnsRing.rotation.z += 5*dtheta
    
    UranusRing.rotation.z += 5*dtheta
    UranusRing.position.x = Planets[7].position.x
    UranusRing.position.y = Planets[7].position.y
    UranusRing.position.z = Planets[7].position.z

    // rotate the Sun
    //console.log(Sun)
    collidableMeshList.push(Sun);
    Sun = Planets[0]
    Sun.rotation.order = 'ZXY';
    Sun.rotation.x = 0;
    Sun.rotation.y += (deltaTimeD / PlanetsData[SUN]["period"]) * Math.PI/10;
    Sun.rotation.z = PlanetsData[SUN]["tilt"] * Math.PI / 180; // tilt in radians
    Sun.updateMatrix();


    if(bodyfocus == true) {
        // BODY MOVEMENTS
        // using WASD to move  around
        if ( keyboard.pressed("W") ){
            //camera.translateZ( -moveDistance );
            torso.translateX( -moveDistance/8);
        }
        if ( keyboard.pressed("S") ){
            //camera.translateZ(  moveDistance );
            torso.translateX(  moveDistance/8 );
        }
        if ( keyboard.pressed("A") ){
            //camera.translateX( -moveDistance );
            torso.translateZ( moveDistance/8 );
        }
        if ( keyboard.pressed("D") ){
            //camera.translateX(  moveDistance );
            torso.translateZ( -moveDistance/8 );
        }
        //go up and down with spacebar and V----------
        if ( keyboard.pressed(" ") ){
            //camera.translateX(  moveDistance );
            torso.translateY( moveDistance/8 );
        }
        if ( keyboard.pressed("V") ){
            //camera.translateX(  moveDistance );
            torso.translateY( -moveDistance/8 );
        } 


        //COLLISION DETECTION-----------------------------------------------------------------------
        //TORSO
        const geomT = torso.geometry;
         geomT.computeBoundingBox();
        var torsoBB = geomT.boundingBox;
        //SUN
        const geomS = Sun.geometry;
        geomS.computeBoundingBox();
        var SunBB = geomS.boundingBox;
        

        //then we apply the right matrix for each box
        SunBB.applyMatrix4(Sun.matrixWorld);
        torsoBB.applyMatrix4(torso.matrixWorld);
        
         SunCollision = torsoBB.intersectsBox(SunBB);

        
        if (SunCollision ){
            
            torso.position.set(4000, 0, 0);
           
        }
        
        //--------------------------------------------------------------------------------
         //collision detection with distance
        



/*


         var distanceFromSun = (torso.position.x - Sun.position.x)**2 + (torso.position.y - Sun.position.y)**2 + (torso.position.z - Sun.position.z)**2 ;
         distanceFromSun= Math.sqrt(distanceFromSun); 
           if(distanceFromSun < 694.439)
           torso.position.set(900, 0, 0);
        
      */
    


     /*
        //explore planets-----------------------------------------------------------------------
        if ( keyboard.pressed("0") ) 
        torso.position.set(Planets[0].position.x, Planets[0].position.y-100, Planets[0].position.z + 1000)
        if ( keyboard.pressed("1") )
            torso.position.set(Planets[1].position.x, Planets[1].position.y + 10 , Planets[1].position.z  + 1000 );
            
        
        
        if ( keyboard.pressed("2") ) 
        torso.position.set(Planets[2].position.x, Planets[2].position.y + 10, Planets[2].position.z + 1000)
        if ( keyboard.pressed("3") ) 
        torso.position.set(Planets[3].position.x, Planets[3].position.y + 10, Planets[3].position.z + 1000)
        if ( keyboard.pressed("4") )
        torso.position.set(Planets[4].position.x, Planets[4].position.y + 10, Planets[4].position.z + 1000)
        if ( keyboard.pressed("5") )
         torso.position.set(Planets[5].position.x, Planets[5].position.y + 10, Planets[5].position.z + 1000)
        if ( keyboard.pressed("6") )
        torso.position.set(Planets[6].position.x, Planets[6].position.y + 10, Planets[6].position.z + 1000)
        if ( keyboard.pressed("7") )
        torso.position.set(Planets[7].position.x, Planets[7].position.y + 10, Planets[7].position.z + 1000)
        if ( keyboard.pressed("8") )
        torso.position.set(Planets[8].position.x, Planets[8].position.y + 10, Planets[8].position.z + 1000)
        if ( keyboard.pressed("9") ) 
        torso.position.set(Planets[9].position.x, Planets[9].position.y + 10, Planets[9].position.z + 1000)


*/

        // rotate left/right/up/down
        if ( keyboard.pressed("A") )
            torso.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
        if ( keyboard.pressed("D") )
            torso.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
        if ( keyboard.pressed("R") )
            torso.rotateOnAxis( new THREE.Vector3(0,0,1), -rotateAngle);
        if ( keyboard.pressed("F") )
            torso.rotateOnAxis( new THREE.Vector3(0,0,1), rotateAngle);

        var relativeCameraOffset = new THREE.Vector3(20,5,1);
        var cameraOffset = relativeCameraOffset.applyMatrix4( torso.matrixWorld );

        camera.position.x = cameraOffset.x;
        camera.position.y = cameraOffset.y;
        camera.position.z = cameraOffset.z;
        camera.lookAt( torso.position );

    }
    else if(planetsfocus == true) {
    
        // using numbers to switch the focus on one planet
        if ( keyboard.pressed("0") ) focus = 0
        if ( keyboard.pressed("1") ) focus = 1
        if ( keyboard.pressed("2") ) focus = 2
        if ( keyboard.pressed("3") ) focus = 3
        if ( keyboard.pressed("4") ) focus = 4
        if ( keyboard.pressed("5") ) focus = 5
        if ( keyboard.pressed("6") ) focus = 6
        if ( keyboard.pressed("7") ) focus = 7
        if ( keyboard.pressed("8") ) focus = 8
        if ( keyboard.pressed("9") ) focus = 9

        if(focus == 0) {
            camera.position.set(Planets[0].position.x, Planets[0].position.y+10, Planets[0].position.z + 3000)
            camera.lookAt(Planets[0].position)
        }
        else if(focus == 1) {
            camera.position.set(Planets[1].position.x + 50, Planets[1].position.y+10, Planets[1].position.z + 50)
            camera.lookAt(Planets[1].position)
        }
        else if(focus == 2) {
            camera.position.set(Planets[2].position.x, Planets[2].position.y+10, Planets[2].position.z + 50)
            camera.lookAt(Planets[2].position)
        }
        else if(focus == 3) {
            camera.position.set(Planets[3].position.x, Planets[3].position.y+20, Planets[3].position.z + 50)
            camera.lookAt(Planets[3].position)
        }
        else if(focus == 4) {
            camera.position.set(Planets[4].position.x, Planets[4].position.y+10, Planets[4].position.z + 50)
            camera.lookAt(Planets[4].position)
        }
        else if(focus == 5) {
            camera.position.set(Planets[5].position.x, Planets[5].position.y+10, Planets[5].position.z + 500)
            camera.lookAt(Planets[5].position)
        }
        else if(focus == 6) {
            camera.position.set(Planets[6].position.x, Planets[6].position.y+10, Planets[6].position.z + 500)
            camera.lookAt(Planets[6].position)
        }
        else if(focus == 7) {
            camera.position.set(Planets[7].position.x, Planets[7].position.y+10, Planets[7].position.z + 200)
            camera.lookAt(Planets[7].position)
        }
        else if(focus == 8) {
            camera.position.set(Planets[8].position.x, Planets[8].position.y+10, Planets[8].position.z + 200)
            camera.lookAt(Planets[8].position)
        }
        else if(focus == 9) {
            camera.position.set(Planets[9].position.x, Planets[9].position.y+10, Planets[9].position.z + 100)
            camera.lookAt(Planets[9].position)
        }
    
    }
    else if(freefocus == true) {
        // CAMERA MOVEMENTS
        // using WASD to move  around
        if ( keyboard.pressed("W") )
            camera.translateZ( -moveDistance )
        if ( keyboard.pressed("S") )
            camera.translateZ(  moveDistance )
        if ( keyboard.pressed("A") )
            camera.translateX( -moveDistance )
        if ( keyboard.pressed("D") )
            camera.translateX( moveDistance )

        // using QERF to rotate the camera around axis
        if (keyboard.pressed("Q"))
            camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle)
        if (keyboard.pressed("E"))
            camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle)
        if (keyboard.pressed("R"))
            camera.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle)
        if (keyboard.pressed("F"))
            camera.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle)
        if (keyboard.pressed("Z")) {
            camera.position.set(2000,0,0)
            camera.rotation.set(0,0,0)
        }
    }
    
    if(keyboard.pressed("K")){
        light.intensity += 0.5
        ambient.intensity += 0.5
    }
    if(keyboard.pressed("U")){
        light.intensity -= 0.5
        ambient.intensity -= 0.5
    }
    
    console.log(light.intensity)
}

render()