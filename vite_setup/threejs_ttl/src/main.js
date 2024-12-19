import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const canvas = document.getElementById("canvas");
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load HDRI
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdrr",
    function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        console.log("HDRI loaded");
    },
    undefined,
    function (error) {
        console.error("An error occurred loading the HDRI", error);
    }
);

// Load GLTF
const gltfLoader = new GLTFLoader();
gltfLoader.load(
    "../model/kuchbhi.glb",
    function (gltf) {
        gltf.scene.position.y = -1;
        scene.add(gltf.scene);
        console.log("GLTF model loaded");
    },
    undefined,
    function (error) {
        console.error("An error occurred loading the GLTF model", error);
    }
);

// Add a light
const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);
// add directional light
const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(0, 1, 0);
scene.add(directional);
// add point light
const point = new THREE.PointLight(0xffffff, 1);
point.position.set(0, 1, 0);
scene.add(point);

// Add a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.enableZoom = true;

camera.position.set(0, 0, 100);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});