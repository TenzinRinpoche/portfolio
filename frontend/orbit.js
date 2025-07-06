// https://www.solarsystemscope.com/textures/
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x808080);
const camera = new THREE.PerspectiveCamera(
      75,                                 // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.9,                                // Near plane (how close we can see)
  1000                                // Far plane (how far we can see)
);

// Add RayCaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();


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

//Create Canvas
document.body.appendChild(renderer.domElement); // Add the canvas to the webpage

//Add Mouse Listener
window.addEventListener('mousemove', (event) => {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
});

let red=0;
window.addEventListener('click', (event) => {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(lightmesh);
  

  if (intersects.length > 0) {
    console.log("✅ Orb clicked!");
    // Trigger your logic here
    red = 1 - red; //Toggle red on and off
    lightmesh.material.color.set(red ? 0xff0000 : 0xffffff); // becomes red eh
    window.location.href = 'about.html';


    const slider = document.getElementById('inclination');
    let current = +slider.value;
    const max = +slider.max;

    const interval = setInterval(() => {
    const remaining = max - current;

      if (remaining <= 0.1) {
      slider.value = max.toFixed(3);
      clearInterval(interval);
      return;
      }

  // Acceleration: normalized so it's 1 at the start, 0 near the end
    let acceleration = remaining / max;

  // Control speed: max step of 0.5 scaled by acceleration
    const step = 0.5 * acceleration;

    current += step;
    slider.value = current.toFixed(3);
}, 10);
  }
});



//Create Central Sphere
const geometry = new THREE.SphereGeometry(1, 70, 70); // width, height, depth
const material = new THREE.MeshStandardMaterial({ color: 0xffffff }); // solid white
const sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = false;
sphere.position.set(0,0,0)
scene.add(sphere); // Add it to the world
console.log(sphere.position);

//Add edges to central sphere
const edges = new THREE.EdgesGeometry(geometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const outline = new THREE.LineSegments(edges, edgeMaterial);
sphere.add(outline); // attach the outline to the box


//create light and lightbox
const lightposition = new THREE.Vector3(0,0,0) //default position
const lightgeom = new THREE.SphereGeometry(0.2,70,70)
const lightbox = new THREE.MeshBasicMaterial({color: 0xffffff })
const lightmesh = new THREE.Mesh(lightgeom, lightbox)
const light = new THREE.DirectionalLight(0xffffff, 1)
lightmesh.position.copy(lightposition)
lightmesh.geometry.computeBoundingSphere(); // Ensures raycaster sees the object
lightmesh.material.depthTest = true;
lightmesh.material.transparent = false;
lightmesh.material.opacity = 1;
lightmesh.material.needsUpdate = true;
light.position.copy(lightposition)
scene.add(light)
scene.add(lightmesh)

//Add glow to light
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

//Set initial angle to 0 and set orbitradius orbiting object.
let angle = 0;
const orbitradius = 3;

//Animate the objects
function animate() {
  requestAnimationFrame(animate);

  // Set position of object
  const z = orbitradius*Math.sin(angle)
  const y = orbitradius*Math.cos(angle)
  
  lightmesh.position.set(0,y,z)
  light.position.set(0,y,z)
  
// if (positionVector) {
//   lightmesh.position.copy(positionVector);
//   light.position.copy(positionVector);
// }

  //Set Inclination of Camera
  xc = altitude * Math.cos(inclination.value * Math.PI / 180)
yc = altitude * Math.sin(inclination.value * Math.PI / 180)

camera.position.z = 0;
camera.position.y = yc;
camera.position.x=xc;
camera.lookAt(0, 0, 0); // Look at the center of the scene (origin)
  
  angle += 0.05*speedControl.value

// Raycasting
raycaster.setFromCamera(mouse, camera);
const intersects = raycaster.intersectObject(lightmesh);

// if (intersects.length > 0) {
//   // Interaction: Change color on hover
//   // lightmesh.material.color.set(0xff0000); // red when hovered
// } else {
//   lightmesh.material.color.set(0xffffff); // reset to white
// }
const now = Date.now();
if (now - lastLogTime > 5000) {
  console.log("Mouse:", mouse);
  console.log("Intersects:", intersects);
  console.log("Lightmesh Position:", lightmesh.position);
  lastLogTime = now;
}

  renderer.render(scene, camera);
}

let lastLogTime = 0;

animate()