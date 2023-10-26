// 1. 下载并导入整个 three.js核心库
import * as THREE from 'three'
// 引入轨道控制器构造函数
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 引入将dom 2d 转化为3d方法
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'

export let scene, camera, renderer, controls, css3dRenderer; 

(function init(){
    //创建场景
    scene=new THREE.Scene();
    //创建摄像机
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 0.1
    //渲染器{抗锯齿}
    renderer = new THREE.WebGLRenderer({ antialias:true})
    //设置画布大小
    renderer.setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement)
})();
//坐标轴
(function createHelper(){
    const axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);
})();
// 场景适配
(function resizeRender(){
    window.addEventListener('resize',()=>{
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth/window.innerHeight
        camera.updateProjectionMatrix()
    })
}
)();
//轨道控制器
(function createControls() {
    controls = new OrbitControls(camera, renderer.domElement)
    // 设置轨道控制器垂直方向
    controls.minPolarAngle=0.25*Math.PI
    // 阻尼效果
    controls.enableDamping = true
    // 鼠标滚轮缩放禁止
    controls.enableZoom = false
})();
// 将原生dom3d渲染到3D场景中
(function create3dRenderer() {
    // 创建文本3d渲染器
    css3dRenderer = new CSS3DRenderer()
    // 设置文本渲染器的大小
    css3dRenderer.setSize(window.innerWidth, window.innerHeight)
    // 默认去除dom事件
    css3dRenderer.domElement.style.pointerEvents = "none"
    // 设置固定定位
    css3dRenderer.domElement.style.position = "fixed"
    // 设置距离左侧间距为0
    css3dRenderer.domElement.style.left = 0
    // 设置距离上侧间距为0
    css3dRenderer.domElement.style.top = 0
    // 添加到body中
    document.body.appendChild(css3dRenderer.domElement)
})();
//循环更新
(function animate(){
    controls.update()
    renderer.render(scene, camera)
    // 场景和摄像机渲染到文本画布上面
    css3dRenderer.render(scene, camera)
    requestAnimationFrame(animate)

})();
