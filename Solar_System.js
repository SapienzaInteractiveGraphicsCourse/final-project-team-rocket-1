"use strict"

var canvas
var gl
var program

var flag = false

// set up the scene and camera
const scene = new THREE.Scene()
// scene.background = new THREE.Color("rgb(128, 128, 128)")
scene.background = new THREE.Color("rgb(0, 0, 0)")
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.x = 30
// camera.lookAt()

// setup texture loader
var loader = new THREE.TextureLoader()

const renderer = new THREE.WebGLRenderer()
renderer.setSize( innerWidth, innerHeight )
document.body.appendChild( renderer.domElement )

/* function to create Solar System in scale 1:1 */
// var  CreateSystem_real = function() {

    // create the Solar System Group(hierarchical model)
    var Solar_system = new THREE.Group()
    Solar_system.name = "Solar System"
    scene.add(Solar_system)

    // create the Sun
    var SunGroup = new THREE.Group()
    var sphere = new THREE.SphereGeometry(10,50,50)
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
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
        map: loader.load('textures/earthmap1k.jpg')
    })
    var Earth = new THREE.Mesh(sphere,material)
    Earth.position.x = 26.5
    EarthGroup.add(Earth)
    planets.add(EarthGroup)

    // create Moon
    sphere = new THREE.SphereGeometry(0.5,30,30)
    var material = new THREE.MeshDepthMaterial({
        wireframe: true
    })
    var Moon = new THREE.Mesh(sphere,material)
    Moon.position.x = 0
    EarthGroup.add(Moon)

    // create MercuryGroup
    // create Mercury
    var MercuryGroup = new THREE.Group()
    sphere = new THREE.SphereGeometry(1,50,50)
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
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
        wireframe: true
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
        wireframe: true
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
        map: loader.load('textures/jupiter2_4k.jpg')
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
        map: loader.load('textures/saturnmap.jpg')
    })
    var Saturn = new THREE.Mesh(sphere,material)
    Saturn.position.x = 62
    SaturnGroup.add(Saturn)
    planets.add(SaturnGroup)

    // create Saturn's Ring
    var ring = new THREE.RingGeometry(7.5, 9.5, 100)
    material = new THREE.MeshBasicMaterial({
        // wireframe: true
        map: loader.load('textures/saturnringcolor.jpg')
    })
    var SaturnsRing = new THREE.Mesh(ring,material)
    SaturnsRing.position.x = 62
    SaturnsRing.rotation.x = 11.2
    SaturnGroup.add(SaturnsRing)

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
        wireframe: true
    })
    var Uranus = new THREE.Mesh(sphere,material)
    Uranus.position.x = 85
    UranusGroup.add(Uranus)
    planets.add(UranusGroup)

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
        wireframe: true
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
// }

camera.position.z = 25
var render = function () {
    
    requestAnimationFrame(render)

    // sun rotation
    // Sun.rotation.y += 0.01
    Earth.rotation.y +=0.001
    // Moon.rotation.y +=0.01
    // Mercury.rotation.y +=0.01
    Saturn.rotation.y +=0.001
    SaturnsRing.rotation.z +=0.0001
    Jupiter.rotation.y +=0.001
    // console.log(SaturnsRing.rotation.x)
    // if(camera.position.x > 100) flag = true
    // if(camera.position.x < 0) flag = false

    // if(!flag) camera.position.x += 0.1
    // else camera.position.x -= 0.1
    renderer.render(scene, camera)
};

// CreateSystem_real()
render()

/* TODO: 
FIRST PART
    - create saturn's ring
    - make a visible-friendly distance from planets-sun
    - make the possibility to switch to true distance planets-sun
    - give textures to all objects (possible bump map and flares of light)
    - background texture
    - make the orbits of all objects
    - camera control even with mouse and keys (WASD + QEZC)
    - maybe add some comets

SECOND PART
    - object flying through the system:
        - find a model
        - textures
        - animate it in a cool way
        - switch camera focus to it (make it possible to choose)
        - other features to think :)
*/

/*  https://codepen.io/recursiveElk/pen/rXaoKY?editors=0010
    <iframe src="https://clara.io/embed/08db1e83-5559-4c29-b7eb-7b96dd9cfdb2?renderer=webgl" width="800" height="600" allowfullscreen></iframe>
maybe a good rocket model */

/* https://github.com/mrdoob/three.js/blob/master/examples/js/controls/FirstPersonControls.js
first person camera control */