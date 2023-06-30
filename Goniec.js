let canvas = document.getElementById("glcanvas");
const scene = new THREE.Scene({color: 0xfff});
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light;
    light = new THREE.DirectionalLight();
    light.position.set(-5, -4, 10);
    camera.add(light);
    scene.add(camera);

const material = new THREE.MeshPhongMaterial(
    {
        color: 0x000000,
        // wireframe: true
    });

const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.15, 100);
const base = new THREE.Mesh(baseGeometry, material);
const upperBaseGeometry = new THREE.CylinderGeometry(0.9, 0.9, 0.25, 100);
const upperBase = new THREE.Mesh(upperBaseGeometry, material);
upperBase.position.y = 0.1;

let group = new THREE.Group();
    group.add(base);
    group.add(upperBase);
    group.position.set(0, 0, 0);
    group.scale.set(1, 1, 1);

let points = [];
    for (var i = 0; i < 8; i++) {
        points.push(new THREE.Vector2(Math.sin(-i * 0.8)*2+6 , (i - 9) * 4));
    }
let size = 0.1;
let geometry1 = new THREE.LatheGeometry(points);
let lathe1 = new THREE.Mesh(geometry1, material);
    lathe1.position.set(0, -1, 0);
    lathe1.scale.set(size, -size, -size);

const ballGeometry = new THREE.SphereGeometry(Math.PI * 0.185, 100, 100, Math.PI,  2*Math.PI, 0, 0.5 * Math.PI);
    material.side = THREE.DoubleSide;
const ball = new THREE.Mesh(ballGeometry, material);
    ball.position.set(0, 1.4, 0);
    ball.scale.set(1, 1, 1);

const ballGeometryTop = new THREE.SphereGeometry(Math.PI * 0.07, 100, 100, Math.PI,  2*Math.PI, 0, 0.7 * Math.PI);
    material.side = THREE.DoubleSide;
const ballTop = new THREE.Mesh(ballGeometryTop, material);
    ballTop.position.set(0, 2, 0);
    ballTop.scale.set(1, 1, 1);

let head = new THREE.Group();
    head.add(ball);
    head.add(ballTop);
    head.position.set(0,1.2,0);

const ringGeometry = new THREE.CylinderGeometry(0.7, 0.7, 0.3, 100);
const ring = new THREE.Mesh(ringGeometry, material);
ring.position.set(0, 2, 0);

let neck = new THREE.Group();
    neck.add(ring);
    neck.position.set(0,0,0);

let chessBishop = new THREE.Group();
chessBishop.add(group, lathe1, head, neck);
    scene.add(chessBishop);

function animate() {
    requestAnimationFrame(animate);
    chessBishop.rotation.y += 0.01;
    renderer.render(scene, camera);
}

camera.position.z = 3;
camera.position.y = 2;

animate();
