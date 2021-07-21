"use strict"

var flag = false


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


var light = new THREE.PointLight(0xffffff, 1)
light.position.set(0, 0, 0)
scene.add(light)
scene.add(new THREE.AmbientLight(0x333333))

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
                
/* function to create Solar System in scale 1:1 */
/*function CreateSystem_real() {
    
    // create the Solar System Group(hierarchical model)
    var Solar_system = new THREE.Group()
    Solar_system.name = "Solar System"
    scene.add(Solar_system)
    
    // create the Sun
    var SunGroup = new THREE.Group()
    var sphere = new THREE.SphereGeometry(10,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Sun/Sun.jpg')
    })
    var Sun = new THREE.Mesh(sphere,material)
    SunGroup.add(Sun)
    Solar_system.add(SunGroup)
    
    // create the planets group
    var planets = new THREE.Group()
    Solar_system.add(planets)
    
    // create EarthGroup
    // create Earth
    var EarthGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(3.5,30,30)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Earth/Earth.jpg')
    })
    var Earth = new THREE.Mesh(sphere,material)
    Earth.position.x = 26.5
    EarthGroup.add(Earth)
    planets.add(EarthGroup)
    
    // create Moon
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
        // map: loader.load('textures/Earth/Moon.jpg')
    })
    var Moon = new THREE.Mesh(sphere,material)
    Moon.position.x = 0
    EarthGroup.add(Moon)
    
    // create MercuryGroup
    // create Mercury
    var MercuryGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(1,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Mercury/Mercury.jpg')
    })
    var Mercury = new THREE.Mesh(sphere,material)
    Mercury.position.x = 12
    MercuryGroup.add(Mercury)
    planets.add(MercuryGroup)
    
    // create VenusGroup
    // create Venus
    var VenusGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(2,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Venus/Venus.jpg')
    })
    var Venus = new THREE.Mesh(sphere,material)
    Venus.position.x = 16
    VenusGroup.add(Venus)
    planets.add(VenusGroup)
    
    // create MarsGroup
    // create Mars
    var MarsGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(1.5,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Mars/Mars.jpg')
    })
    var Mars = new THREE.Mesh(sphere,material)
    Mars.position.x = 20.5
    MarsGroup.add(Mars)
    planets.add(MarsGroup)
    
    // create Deimos
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Deimos = new THREE.Mesh(sphere,material)
    Deimos.position.x = 0
    MarsGroup.add(Deimos)
    
    // create Phobos
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Phobos = new THREE.Mesh(sphere,material)
    Phobos.position.x = 0
    MarsGroup.add(Phobos)
    
    // create JupiterGroup
    // create Jupiter
    var JupiterGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(8,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Jupiter/jupiter2_4k.jpg')
    })
    var Jupiter = new THREE.Mesh(sphere,material)
    Jupiter.position.x = 40
    JupiterGroup.add(Jupiter)
    planets.add(JupiterGroup)
    
    // create Io
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Io = new THREE.Mesh(sphere,material)
    Io.position.x = 0
    JupiterGroup.add(Io)
    
    // create Europa
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Europa = new THREE.Mesh(sphere,material)
    Europa.position.x = 0
    JupiterGroup.add(Europa)
    
    // create Ganymede
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Ganymede = new THREE.Mesh(sphere,material)
    Ganymede.position.x = 0
    JupiterGroup.add(Ganymede)
    
    // create Callisto
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Callisto = new THREE.Mesh(sphere,material)
    Callisto.position.x = 0
    JupiterGroup.add(Callisto)
    
    // create SaturnGroup
    // create Saturn
    var SaturnGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(7,50,50)
    material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Saturn/saturnmap.jpg')
    })
    var Saturn = new THREE.Mesh(sphere,material)
    Saturn.position.x = 62
    SaturnGroup.add(Saturn)
    planets.add(SaturnGroup)
    
    // create Saturn's Ring
    var ring = new THREE.TorusGeometry(9, 0.5, 30, 200)
    material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Saturn/saturnringcolor.jpg')
    })
    var SaturnsRing = new THREE.Mesh(ring,material)
    SaturnsRing.position.x = 62
    SaturnsRing.rotation.x = 11.2
    SaturnGroup.add(SaturnsRing)
    
    // create Saturn's Ring
    var ring = new THREE.Shape()
    ring.moveTo(9, 0)
    ring.absarc( 0, 0, 9, 0, 2 * Math.PI, false );
    
    // create Enceladus
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Enceladus = new THREE.Mesh(sphere,material)
    Enceladus.position.x = 0
    SaturnGroup.add(Enceladus)
    
    // create Titan
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Titan = new THREE.Mesh(sphere,material)
    Titan.position.x = 0
    SaturnGroup.add(Titan)
    
    // create UranusGroup
    // create Uranus
    var UranusGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(6,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Uranus/Uranus.jpg')
    })
    var Uranus = new THREE.Mesh(sphere,material)
    Uranus.position.x = 85
    UranusGroup.add(Uranus)
    planets.add(UranusGroup)
    
    // create Uranus Ring
    var ring = new THREE.RingGeometry(9, 10, 100)
    material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Uranus/uranusringcolour.jpg')
    })
    var UranusRing = new THREE.Mesh(ring,material)
    UranusRing.position.x = 85
    UranusRing.rotation.y = 11.77
    UranusGroup.add(UranusRing)
    
    // create Oberon
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Oberon = new THREE.Mesh(sphere,material)
    Oberon.position.x = 0
    UranusGroup.add(Oberon)
    
    // create Miranda
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Miranda = new THREE.Mesh(sphere,material)
    Miranda.position.x = 0
    UranusGroup.add(Miranda)
    
    // create NeptuneGroup
    // create Neptune
    var NeptuneGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(5,50,50)
    var material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/Neptune/Neptune.jpg')
    })
    var Neptune = new THREE.Mesh(sphere,material)
    Neptune.position.x = 97
    NeptuneGroup.add(Neptune)
    planets.add(NeptuneGroup)
    
    // create Tritone
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Tritone = new THREE.Mesh(sphere,material)
    Tritone.position.x = 0
    SaturnGroup.add(Tritone)
    
    // create Talassa
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Talassa = new THREE.Mesh(sphere,material)
    Talassa.position.x = 0
    SaturnGroup.add(Talassa)
    
    // create Ippocampo
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Ippocampo = new THREE.Mesh(sphere,material)
    Ippocampo.position.x = 0
    SaturnGroup.add(Ippocampo)
} */

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

    // too slow and too much lag
    // document.addEventListener("keydown", Movements, true)

    // make the planets orbit
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

    // rotate the Sun
    //console.log(Sun)
    collidableMeshList.push(Sun);
    Sun = Planets[0]
    Sun.rotation.order = 'ZXY';
    Sun.rotation.x = 0;
    Sun.rotation.y += (deltaTimeD / PlanetsData[SUN]["period"]) * Math.PI/10;
    Sun.rotation.z = PlanetsData[SUN]["tilt"] * Math.PI / 180; // tilt in radians
    Sun.updateMatrix();
    
    
    
    
    // change view modality
    if(keyboard.pressed("P")) {
        planetsfocus = true
        bodyfocus = false
        freefocus = false
    }
    if(keyboard.pressed("B")) {
        planetsfocus = false
        bodyfocus = true
        freefocus = false
    }
    if(keyboard.pressed("L")) {
        planetsfocus = false
        bodyfocus = false
        freefocus = true
    }


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

/* TODO:
FIRST PART
    - create saturn's ring (make it 3D not 2D)
    - make a visible-friendly distance from planets-sun
    - make the possibility to switch to true distance planets-sun
    - give textures to all objects (possible bump map and flares of light)
    DONE - background texture
    DONE - make the orbits of all objects
    DONE - camera control even with mouse and keys (WASD + QEZC) 
    - maybe add some comets

SECOND PART
    - object flying through the system:
        - find a model
        - textures
        - animate it in a cool way
        DONE - switch camera focus to it (make it possible to choose)
        - other features to think :)
*/

/*  https://codepen.io/recursiveElk/pen/rXaoKY?editors=0010
    <iframe src="https://clara.io/embed/08db1e83-5559-4c29-b7eb-7b96dd9cfdb2?renderer=webgl" width="800" height="600" allowfullscreen></iframe>
maybe a good rocket model */

/* https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js
first person camera control */






// C:\Users\sandr\Documents\GitHub\final-project-team-rocket-1