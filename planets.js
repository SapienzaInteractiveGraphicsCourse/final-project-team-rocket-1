// Planets file 

// function used to calculate the orbit of each planet
function loadPlanetsData() {
    
    // Planet Data
    // radius - planet radius in millions of meters
    // tilt - planet axis angle
    // N1 N2 - longitude of the ascending node
    // i1 i2 - inclination to the ecliptic (plane of the Earth's orbit)
    // w1 w2 - argument of perihelion
    // a1 a2 - semi-major axis, or mean distance from Sun
    // e1 e2 - eccentricity (0=circle, 0-1=ellipse, 1=parabola)
    // M1 M2 - mean anomaly (0 at perihelion; increases uniformly with time)
    // period - sidereal rotation period
    // centerOfOrbit - the planet in the center of the orbit
    // (orbital elements based on http://www.stjarnhimlen.se/comp/ppcomp.html)
    
    var sun = { radius: 694.439, tilt: 63.87, period: 25.05 };
    PlanetsData.push(sun);
    var mercury = {
        radius: 2.433722, tilt: 0.04, N1: 48.3313, N2: 0.0000324587,
        i1: 7.0047, i2: 0.0000000500, w1: 29.1241, w2: 0.0000101444,
        a1: 0.387098, a2: 0, e1: 0.205635, e2: 0.000000000559,
        M1: 168.6562, M2: 4.0923344368, period: 58.646,
        centerOfOrbit: SUN
    };
    PlanetsData.push(mercury);
    var venus = {
        radius: 6.046079, tilt: 177.36, N1: 76.6799, N2: 0.0000246590,
        i1: 3.3946, i2: 0.0000000275, w1: 54.8910, w2: 0.0000138374,
        a1: 0.723330, a2: 0, e1: 0.006773, e2: -0.000000001302,
        M1: 48.0052, M2: 1.6021302244, period: 243.0185,
        centerOfOrbit: SUN
    };
    PlanetsData.push(venus);
    var earth = {
        radius: 6.371, tilt: 25.44, N1: 174.873, N2: 0,
        i1: 0.00005, i2: 0, w1: 102.94719, w2: 0,
        a1: 1, a2: 0, e1: 0.01671022, e2: 0,
        M1: 357.529, M2: 0.985608, period: 0.997,
        centerOfOrbit: SUN
    };
    PlanetsData.push(earth);
    var mars = {
        radius: 3.389372, tilt: 25.19, N1: 49.5574, N2: 0.0000211081,
        i1: 1.8497, i2: -0.0000000178, w1: 286.5016, w2: 0.0000292961,
        a1: 1.523688, a2: 0, e1: 0.093405, e2: 0.000000002516,
        M1: 18.6021, M2: 0.5240207766, period: 1.025957,
        centerOfOrbit: SUN
    };
    PlanetsData.push(mars);
    var jupiter = {
        radius: 71.41254, tilt: 3.13, N1: 100.4542, N2: 0.0000276854,
        i1: 1.3030, i2: -0.0000001557, w1: 273.8777, w2: 0.0000164505,
        a1: 5.20256, a2: 0, e1: 0.048498, e2: 0.000000004469,
        M1: 19.8950, M2: 0.0830853001, period: 0.4135,
        centerOfOrbit: SUN
    };
    PlanetsData.push(jupiter);
    var saturn = {
        radius: 60.19958, tilt: 26.73, N1: 113.6634, N2: 0.0000238980,
        i1: 2.4886, i2: -0.0000001081, w1: 339.3939, w2: 0.0000297661,
        a1: 9.55475, a2: 0, e1: 0.055546, e2: -0.000000009499,
        M1: 316.9670, M2: 0.0334442282, period: 0.4395,
        centerOfOrbit: SUN
    };
    PlanetsData.push(saturn);
    var uranus = {
        radius: 25.5286, tilt: 97.77, N1: 74.0005, N2: 0.000013978,
        i1: 0.7733, i2: 0.000000019, w1: 96.6612, w2: 0.000030565,
        a1: 19.18171, a2: -0.0000000155, e1: 0.047318, e2: 0.00000000745,
        M1: 142.5905, M2: 0.011725806, period: 0.71833,
        centerOfOrbit: SUN
    };
    PlanetsData.push(uranus);
    var neptune = {
        radius: 24.73859, tilt: 28.32, N1: 131.7806, N2: 0.000030173,
        i1: 1.7700, i2: -0.000000255, w1: 272.8461, w2: 0.000006027,
        a1: 30.05826, a2: 0.00000003313, e1: 0.008606, e2: 0.00000000215,
        M1: 260.2471, M2: 0.005995147, period: 0.6713,
        centerOfOrbit: SUN
    };
    PlanetsData.push(neptune);
    var moon = {
        radius: 1.5424, tilt: 28.32, N1: 125.1228, N2: -0.0529538083,
        i1: 5.1454, i2: 0, w1: 318.0634, w2: 0.1643573223,
        a1: 0.273, a2: 0, e1: 0.054900, e2: 0,
        M1: 115.3654, M2: 13.0649929509, period: 27.321582,
        centerOfOrbit: EARTH
    };
    PlanetsData.push(moon);
    
}

/* function to create Solar System in scale 1:1 */
function  CreateSystem() {
    
    commonSphere = new THREE.SphereGeometry(1, 64, 64)
    
    for(var i = 0; i < PlanetsData.length; i++){
        switch(i){
            case SUN:
                Sun = createSun(PlanetsData[i]["radius"])
                Sun.position.set(0, 0, 0)
                scene.add(Sun)
                Planets.push(Sun)
            break
                
            case MERCURY:
                Mercury = createPlanet(PlanetsData[i]["radius"], 0.005, 'textures/Mercury/Mercury.jpg','textures/Mercury/Mercury.jpg')
                scene.add(Mercury)
                Planets.push(Mercury)
            break
                    
            case VENUS:
                Venus = createPlanet(PlanetsData[i]["radius"], 0.005, 'textures/Venus/Venus.jpg','textures/Venus/Venus.jpg')
                scene.add(Venus)
                Planets.push(Venus)
            break
                        
            case EARTH:
                Earth = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Earth/Earth.jpg','textures/Earth/Earth_Bump.jpg','textures/Earth/Earth_Specular.jpg')
                createCloud(Earth)
                scene.add(Earth)
                Planets.push(Earth)
            break
                
            case MARS:
                Mars = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Mars/Mars.jpg','textures/Mars/Mars_Bump.jpg')
                scene.add(Mars)
                Planets.push(Mars)
            break

            case JUPITER:
                Jupiter = createPlanet(PlanetsData[i]["radius"], 0.02, 'textures/Jupiter/jupiter2_4k.jpg','textures/Jupiter/jupiter2_4k.jpg')
                scene.add(Jupiter)
                Planets.push(Jupiter)
            break

            case SATURN:
                Saturn = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Saturn/saturnSurface.jpg','textures/Saturn/saturnSurface.jpg')
                // innerRadius = (planets[i]["radius"] + 6.630) / planets[i]["radius"]
                // outerRadius = (planets[i]["radius"] + saturnOuterRadius) / planets[i]["radius"]
                // ring = createRing(innerRadius, outerRadius, ringSegments,'qrc:images/saturnringcolortrans.png')
                // ring.receiveShadow = true
                // ring.castShadow = true
                // mesh.add(ring)
                scene.add(Saturn)
                Planets.push(Saturn)
            break

            case URANUS:
                Uranus = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Uranus/Uranus.jpg','textures/Uranus/Uranus.jpg');
                // innerRadius = (planets[i]["radius"] + 2) / planets[i]["radius"]
                // outerRadius = (planets[i]["radius"] + uranusOuterRadius) / planets[i]["radius"]
                // ring = createRing(innerRadius, outerRadius, ringSegments,'qrc:images/uranusringcolortrans.png')
                // ring.receiveShadow = true
                // ring.castShadow = true
                // mesh.add(ring)
                scene.add(Uranus)
                Planets.push(Uranus)
            break
            
            case NEPTUNE:
                Neptune = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Neptune/Neptune.jpg','textures/Neptune/Neptune.jpg')
                scene.add(Neptune)
                Planets.push(Neptune)
            break

            case MOON:
                Moon = createPlanet(PlanetsData[i]["radius"], 0.05, 'textures/Earth/Moon.jpg', 'textures/Earth/Moon_Bump.jpg')
                scene.add(Moon)
                Planets.push(Moon)
            break
        }
    }
}

/* function to create a planet */
function createPlanet(radius, bumpMapScale, mapTexture, bumpTexture, specularTexture) {
    
    var material = new THREE.MeshPhongMaterial({
        map: loader.load(mapTexture),
        bumpMap: loader.load(bumpTexture),
        bumpScale: bumpMapScale
    });
    
    if (specularTexture) {
        material.specularMap = loader.load(specularTexture);
        material.specular = new THREE.Color('grey');
        material.shininess = 5.0;
    } else {
        material.shininess = 1.0;
    }
    
    var mesh = new THREE.Mesh(commonSphere, material);
    mesh.scale.set(radius, radius, radius);
    mesh.position.set(0,0,0)
    
    return mesh;
    
}

/* function to create clouds on Earth */
function createCloud(earthMesh) {
    
    var material = new THREE.MeshPhongMaterial({
        map: loader.load('textures/Earth/earthcloudmapcolortrans.png'),
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.8,
        shininess: 10
    })
    var mesh = new THREE.Mesh(commonSphere, material)
    
    var material2 = new THREE.MeshPhongMaterial({
        map: loader.load('textures/Earth/earthcloudmapcolortrans.png'),
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.8
    })
    var mesh2 = new THREE.Mesh(commonSphere, material2)
    
    mesh.scale.set(1.02, 1.02, 1.02)
    earthMesh.add(mesh)
    mesh2.scale.set(1.02, 1.02, 1.02)
    earthMesh.add(mesh2)
}

/* function to create lights on Earth night side*/
function createLights(earthMesh) {
    
    var material = new THREE.MeshPhongMaterial({
        map: loader.load('textures/Earth/Earth_Lights.jpg'),
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.1,
        shininess: 0
    })
    var mesh = new THREE.Mesh(commonSphere, material)
    
    var material2 = new THREE.MeshPhongMaterial({
        map: loader.load('textures/Earth/Earth_Lights.jpg'),
        side: THREE.FrontSide,
        transparent: true,
        opacity: 0.1
    })
    var mesh2 = new THREE.Mesh(commonSphere, material2)
    
    mesh.scale.set(1.01, 1.01, 1.01)
    earthMesh.add(mesh)
    mesh2.scale.set(1.01, 1.01, 1.01)
    earthMesh.add(mesh2)
}

/* function to create the Sun */
function createSun(radius) {
    
    var texture = loader.load('textures/Sun/Sun.jpg')
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        bumpMap: texture,
        bumpScale: 0.05
    })
    var sun = new THREE.Mesh(commonSphere, material)
    sun.scale.set(radius, radius, radius)
    
    sun.receiveShadow = false
    sun.castShadow = false
    
    return sun
}

/* function to create a static Solar System 
function CreateSystem_static() {
    
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
}*/

loadPlanetsData()
CreateSystem()