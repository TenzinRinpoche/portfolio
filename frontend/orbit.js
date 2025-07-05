// https://www.solarsystemscope.com/textures/
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x808080);
const camera = new THREE.PerspectiveCamera(
      75,                                 // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.9,                                // Near plane (how close we can see)
  1000                                // Far plane (how far we can see)
);

const inclination = document.getElementById('inclination');
const angles = inclination.value * Math.PI / 180;
const altitude = 7

let isDragging = false;
let previousMouseY = 0;


const loader = new THREE.TextureLoader();
loader.load('starfield.jpg', function (texture) {
  scene.background = texture;
});


const speedControl = document.getElementById('speedControl');

// Math.tan(angle) = x/y
// xc = y*Math.tan(angles)
// yc = x/Math.tan(angles)



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement); // Add the canvas to the webpage
const geometry = new THREE.SphereGeometry(0.75, 70, 70); // width, height, depth
const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // solid white
const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = false;
sphere.position.set(0,0,0)
scene.add(sphere); // Add it to the world
console.log(sphere.position);

const edges = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const outline = new THREE.LineSegments(edges, edgeMaterial);
sphere.add(outline); // attach the outline to the box

//create light and lightbox
const lightposition = new THREE.Vector3(0,0,0) //default position
const lightgeom = new THREE.SphereGeometry(0.05,70,70)
const lightbox = new THREE.MeshBasicMaterial({color: 0xffffff })
const lightmesh = new THREE.Mesh(lightgeom, lightbox)
const light = new THREE.DirectionalLight(0xffffff, 1)
lightmesh.position.copy(lightposition)
light.position.copy(lightposition)
scene.add(light)
scene.add(lightmesh)

const spriteMaterial = new THREE.SpriteMaterial({
  map: loader.load('glow.png'),     // should be a white-to-transparent radial gradient
  color: 0xffffff,                  // pure white
  transparent: true,
  opacity: 1.0,
  depthWrite: false,
  depthTest: true,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: true             // ← this is key for consistent glow across distances
});

const glow = new THREE.Sprite(spriteMaterial);
glow.scale.set(0.1, 0.1, 0.5); // Make the glow bigger than the light sphere
lightmesh.add(glow);

let angle = 0;
const orbitradius = 3;
function animate() {
  requestAnimationFrame(animate);

  //Set position of object
  // const z = orbitradius*Math.sin(angle)
  // const y = orbitradius*Math.cos(angle)
  
  // lightmesh.position.set(0,y,z)
  // light.position.set(0,y,z)
  
if (positionVector) {
  lightmesh.position.copy(positionVector);
  light.position.copy(positionVector);
}

  //Set Inclination of Camera
  xc = altitude * Math.cos(inclination.value * Math.PI / 180)
yc = altitude * Math.sin(inclination.value * Math.PI / 180)

camera.position.z = 0;
camera.position.y = yc;
camera.position.x=xc;
camera.lookAt(0, 0, 0); // Look at the center of the scene (origin)
  
  angle += 0.05*speedControl.value
  renderer.render(scene, camera);
}

animate()