let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);
camera.position.z = 5;
scene.add(camera);

let box = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: "red" });
let mesh = new THREE.Mesh(box, material);
scene.add(mesh);

// position the mesh

// mesh.position.x = 0;
// mesh.position.z = -1;
// mesh.position.y = -2;

// rotate the mesh

// mesh.rotation.z = 0.5;
// mesh.rotation.y = 0.5;

// scale the mesh

// mesh.scale.y = 2;
// mesh.scale.z = 1.5;

let canvas = document.querySelector("canvas");
let renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

let clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.y = clock.getElapsedTime();
}

// animate();