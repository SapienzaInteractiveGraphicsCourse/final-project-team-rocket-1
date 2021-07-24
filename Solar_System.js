"use strict"

var flag = false
var orbits = true

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

var theta = 0
var dtheta = 2*Math.PI/1000

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
scene.add(new THREE.AmbientLight(0x111111))

/* --------------------------------------------------------------------------------------- */

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

// too slow and so much lag
// function Movements(event){

//     var key = event.which
//     delta = clock.getDelta(); // seconds.
// 	moveDistance = 500 * delta; // 200 pixels per second
// 	rotateAngle = Math.PI / 2 * delta;   // pi/2 radians (90 degrees) per second

//     // using WASD to move the camera around
//     if (key == 87)
// 		camera.translateZ( -moveDistance )
// 	if (key == 83)
// 		camera.translateZ(  moveDistance )
// 	if (key == 65)
// 		camera.translateX( -moveDistance )
// 	if (key == 68)
// 		camera.translateX(  moveDistance )
        
//     // using QERF to rotate the camera around axis
//     if (key == 81)
//         camera.rotateOnAxis( new THREE.Vector3(0,1,0), rotateAngle);
//     if (key == 69)
//         camera.rotateOnAxis( new THREE.Vector3(0,1,0), -rotateAngle);
//     if (key == 82)
//         camera.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle);
//     if (key == 70)
//         camera.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);
    
//     if (key == 90) {
//         camera.position.set(2000,0,0);
//         camera.rotation.set(0,0,0);
//         camera.lookAt(0, 0, 0)
//     }
// }

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

        var PlanetsR = [1,5,10,20,30,40,50,60,70,80] // radius of simplified orbits
        
        // planets simplified position to make
        
        // maybe scale the planets if too big

        oldTimeD = currTimeD
        currTimeD = currTimeD + daysPerFrame
        var deltaTimeD = currTimeD - oldTimeD

        theta += dtheta

        for(var i = 1; i < PlanetsData.length-1; i++){
            
            Planets[i].position.x = PlanetsR[i] * Math.cos(theta);
            Planets[i].position.y = PlanetsR[i] * Math.sin(theta);
            Planets[i].position.z = Planets[0].position.z
            Planets[i].rotation.y += 0.05
        }
        Planets[9].position.x = 50 * Math.cos(theta);
        Planets[9].position.y = 50 * Math.sin(theta);
        Planets[9].position.z = 50 * Math.sin(theta);
        console.log(Planets[2].position)
    }

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
            torso.translateX( -moveDistance);
        }
        if ( keyboard.pressed("S") ){
            //camera.translateZ(  moveDistance );
            torso.translateX(  moveDistance );
        }
        if ( keyboard.pressed("A") ){
            //camera.translateX( -moveDistance );
            torso.translateZ( moveDistance );
        }
        if ( keyboard.pressed("D") ){
            //camera.translateX(  moveDistance );
            torso.translateZ( -moveDistance );
        }
        //go up and down with spacebar and V----------
        if ( keyboard.pressed(" ") ){
            //camera.translateX(  moveDistance );
            torso.translateY( moveDistance );
        }
        if ( keyboard.pressed("V") ){
            //camera.translateX(  moveDistance );
            torso.translateY( -moveDistance );
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
        //  OTHER PLANETS 
        //for each planet, we clone the bounding box of the sun
        var MercuryBB = SunBB.clone();
        var VenusBB = SunBB.clone();
        var EarthBB = SunBB.clone();
        var MarsBB = SunBB.clone();
        var JupiterBB = SunBB.clone();
        var SaturnBB = SunBB.clone();
        var UranusBB = SunBB.clone();
        var NeptuneBB = SunBB.clone();
        var MoonBB = SunBB.clone();

        //then we apply the right matrix for each box
        SunBB.applyMatrix4(Sun.matrixWorld);
        torsoBB.applyMatrix4(torso.matrixWorld);
        MercuryBB.applyMatrix4(Mercury.matrixWorld);
        VenusBB.applyMatrix4(Venus.matrixWorld);
        EarthBB.applyMatrix4(Earth.matrixWorld);
        MarsBB.applyMatrix4(Mars.matrixWorld);
        JupiterBB.applyMatrix4(Jupiter.matrixWorld);
        SaturnBB.applyMatrix4(Saturn.matrixWorld);
        UranusBB.applyMatrix4(Uranus.matrixWorld);
        NeptuneBB.applyMatrix4(Neptune.matrixWorld);
        MoonBB.applyMatrix4(Moon.matrixWorld);
        //collision
         SunCollision = torsoBB.intersectsBox(SunBB);

        
        if (SunCollision){
            
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
            torso.rotateOnAxis( new THREE.Vector3(1,0,0), rotateAngle*2);
        if ( keyboard.pressed("F") )
            torso.rotateOnAxis( new THREE.Vector3(1,0,0), -rotateAngle);

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

}

render()