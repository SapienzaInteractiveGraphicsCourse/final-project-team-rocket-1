"use strict"

var canvas
var gl
var program

var axis = new THREE.Vector3(0,1,0).normalize()

// set up the scene and camera
const scene = new THREE.Scene()
scene.background = new THREE.Color("rgb(128, 128, 128)")
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize( innerWidth, innerHeight )
document.body.appendChild( renderer.domElement )

// setup the Group(hierarchical model)
var Solar_system = new THREE.Group()
Solar_system.name = "Solar System"
scene.add(Solar_system)

// setup the Sun
var SunGroup = new THREE.Group()
var sphere = new THREE.SphereGeometry(10,50,50)
var material = new THREE.MeshDepthMaterial({
    wireframe: true
})
var Sun = new THREE.Mesh(sphere,material)
SunGroup.add(Sun)
Solar_system.add(SunGroup)

// setup the planets group
var planets = new THREE.Group()
Solar_system.add(planets)

// create EarthGroup
// create Earth
var EarthGroup = new THREE.Group()
sphere = new THREE.SphereGeometry(3,30,30)
var material = new THREE.MeshDepthMaterial({
    wireframe: true
})
var Earth = new THREE.Mesh(sphere,material)
Earth.position.x = 0
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
var Mercury = new THREE.Mesh(sphere,material)
Mercury.position.x = 0
MercuryGroup.add(Mercury)
planets.add(MercuryGroup)

// create VenusGroup
// create Venus
var VenusGroup = new THREE.Group()
sphere = new THREE.SphereGeometry(3,50,50)
var Venus = new THREE.Mesh(sphere,material)
Venus.position.x = 0
VenusGroup.add(Venus)
planets.add(VenusGroup)

// create MarsGroup
// create Mars
var MarsGroup = new THREE.Group()
sphere = new THREE.SphereGeometry(3,50,50)
var Mars = new THREE.Mesh(sphere,material)
Mars.position.x = 0
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
sphere = new THREE.SphereGeometry(3,50,50)
var Jupiter = new THREE.Mesh(sphere,material)
Jupiter.position.x = 0
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
sphere = new THREE.SphereGeometry(3,50,50)
var Saturn = new THREE.Mesh(sphere,material)
Saturn.position.x = 0
SaturnGroup.add(Saturn)
planets.add(SaturnGroup)

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
sphere = new THREE.SphereGeometry(3,50,50)
var Uranus = new THREE.Mesh(sphere,material)
Uranus.position.x = 0
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
sphere = new THREE.SphereGeometry(3,50,50)
var Neptune = new THREE.Mesh(sphere,material)
Neptune.position.x = 0
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

camera.position.z = 20
var render = function () {
    requestAnimationFrame(render)

    // sun rotation
    Sun.rotation.y += 0.01
    Earth.rotation.y +=0.01
    Moon.rotation.y +=0.01
    Mercury.rotation.y +=0.01

    renderer.render(scene, camera)
};
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