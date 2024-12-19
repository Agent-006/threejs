import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

let loader = new THREE.TextureLoader();
let color = loader.load("../text/color.jpg");
let roughness = loader.load("../text/roughness.jpg");
let normal = loader.load("../text/normal.png");
// let height = loader.load("../text/height.png");

const geometry = new THREE.BoxGeometry(3, 1.8, 2, 100, 100);
const material = new THREE.MeshStandardMaterial({
    map: color,
    roughnessMap: roughness,
    normalMap: normal,
    // displacementMap: height,
    // displacementScale: 0.0001,
    // wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

camera.position.z = 50;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const gui = new lil.GUI();

const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'roughness', 0, 1, 0.01);
materialFolder.add(material, 'metalness', 0, 1, 0.01);

const meshFolder = gui.addFolder('Mesh');
meshFolder.add(sphere.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotation X');
meshFolder.add(sphere.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotation Y');
meshFolder.add(sphere.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotation Z');
meshFolder.add(sphere.position, 'x', -10, 10, 0.1).name('Position X');
meshFolder.add(sphere.position, 'y', -10, 10, 0.1).name('Position Y');
meshFolder.add(sphere.position, 'z', -10, 10, 0.1).name('Position Z');
meshFolder.add(sphere.scale, 'x', 0.1, 5, 0.1).name('Scale X');
meshFolder.add(sphere.scale, 'y', 0.1, 5, 0.1).name('Scale Y');
meshFolder.add(sphere.scale, 'z', 0.1, 5, 0.1).name('Scale Z');

materialFolder.open();
meshFolder.open();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2);
highIntensityLight.position.set(10, 20, 15);
scene.add(highIntensityLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100, 2);
pointLight.position.set(.4, -1, 1);
scene.add(pointLight);

const highIntensityLightHelper = new THREE.DirectionalLightHelper(
    highIntensityLight,
    5
);
scene.add(highIntensityLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
    directionalLight,
    5
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 3);
scene.add(pointLightHelper);

function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.005;
    // cube.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

animate();