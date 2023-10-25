import './style.css'
// 目标：three.js 三要素 (场景、相机、渲染器)
// 1. 下载并引入 three 库
// 2. 创建场景对象
// 3. 创建摄像机对象
// 参数1：垂直角度（建议 75），视野范围
// 参数2：宽高比（建议与画布相同宽高），物体绘制比例
// 参数3：近截面距离摄像机距离
// 参数4：远截面距离摄像机距离
// 4. 创建渲染器，并设置画布大小
// 5. 添加到 DOM 显示
// 6. 将摄像机与场景渲染的画布上面

// 1. 下载并导入整个 three.js核心库
import * as THREE from 'three'
// 1. 引入轨道控制器构造函数
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 1. 引入dat.gui
import * as dat from 'dat.gui';
let scene, camera, renderer
let controls
let cube
function init(){
    // 创建场景对象
    scene = new THREE.Scene()
    // /创建摄像机对象
    camera =new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z=5
    // 创建渲染器，并设置画布大小
    renderer = new THREE.WebGLRenderer({
        antialias: true, //抗锯齿
    })
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.append(renderer.domElement)
}
//创建立方体
function createCube(){
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
}
// 创建轨道控制器
function createControls(){
    controls = new OrbitControls(camera, renderer.domElement)
    // 开启阻尼效果
    controls.enableDamping = true
}
// 在循环渲染中更新场景
function renderLoop(){
    requestAnimationFrame(renderLoop)
    controls.update()
    renderer.render(scene, camera)
}
init()
createCube()
createControls()

renderer.render(scene, camera)
renderLoop()