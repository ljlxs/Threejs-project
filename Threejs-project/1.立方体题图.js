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
    //2.创建场景对象
    scene=new THREE.Scene();


    //3.创建摄像机对象
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)


    // 改变摄像机z轴的位置, 把摄像机向后移动5个单位(移动摄像机向 z 轴5个单位, 默认摄像机和物体的坐标轴都在原点)
    camera.position.z = 2


    //4.创建渲染器设置画布大小（创建canvas标签）
    renderer=new THREE.WebGLRenderer({
        antialias: true, //抗锯齿
    })


    //设置画布大小
    renderer.setSize(window.innerWidth , window.innerHeight)

    // 将画布添加到DOM
    document.body.append(renderer.domElement)

}
//创建立方体
function createCube(){
    // 1.创建图形立方体
    const geometry = new THREE.BoxGeometry(1,1,1)

    //// 2. 创建材质，颜色为绿色 0x00ff00 
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // const colorArr = ['red', 'green', 'blue', 'pink', 'orange', 'write']
    // const material = colorArr.map(item=>{
    //     return new THREE.MeshBasicMaterial({ color: item })
    // })

    // 1. 加载不同纹理图片并创建材质对象 6 个,（x 正负，y 正负，z 正负）
    const imgUrlArr = ['x.jpg', '-x.jpg', 'y.jpg', '-y.jpg', 'z.jpg', '-z.jpg']
    // 2. 纹理加载器
    const textureLoader = new THREE.TextureLoader()
    // 设置当前纹理加载器公共的基础路径
    textureLoader.setPath('image/class/')
    // 创建材质
    const material = imgUrlArr.map(item => {
        // 创建纹理图片对象
        const texture = textureLoader.load(item)
        return new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
    })

    cube=new THREE.Mesh(geometry, material)
    scene.add(cube)
}
// 创建球体
function createCircle(){
    const geometry = new THREE.SphereGeometry(15, 32, 16, 0, 6.283185307179586, 0, 3.141592653589793)
    //// 2. 创建材质，颜色为绿色 0x00ff00 
    const material = new THREE.MeshBasicMaterial({ color: '#3a8cb8' })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)
}
// 创建轨道控制器
function createControls(){
    controls = new OrbitControls(camera, renderer.domElement)
    // 开启阻尼效果
    controls.enableDamping = true
    // 开启自动旋转
    // controls.autoRotate=true
    //自定选装速度控制
    // controls.autoRotateSpeed=5
    // 设置水平旋转角度的上限
    // controls.maxAzimuthAngle = 1 * Math.PI //左
    // 设置水平旋转角度的下限
    // controls.minAzimuthAngle = 1.5 * Math.PI //右

    // 设置摄像机向外移动的距离
    // controls.maxDistance = 10
    // 设置摄像机向内移动的距离
    // controls.minDistance = 1

    // 设置垂直旋转的角度的上限
    // controls.maxPolarAngle =Math.PI
    // 设置垂直旋转的角度的下限
    // controls.minPolarAngle = 0.5
}
// 循环渲染中更新场景
function animate(){
    // 循环渲染(根据当前计算机浏览器刷新帧率,(默认60次 / 秒), 不断调用此函数渲染最新画面状态, )
    // 好处是: 当前页面切换到后台, 暂停递归
    requestAnimationFrame(animate)

    // 更新(手动js代码更新摄像机信息,必须调用轨道控制器 update 方法)
    controls.update();

    //将场景更新到画布
    renderer.render(scene, camera);
}
// 坐标轴
function createHelper(){
    //  创建坐标轴
    const axesHelper = new THREE.AxesHelper(100)
    // 将坐标轴添加到场景中
    scene.add(axesHelper)
}
// 适配
function renderResize(){
    window.addEventListener("resize",()=>{
        renderer.setSize(window.innerWidth, window.innerHeight)
        camera.aspect = window.innerWidth / window.innerHeight
    })
}
// 移动
function moveCube(){
    // cube.position.x=5
    // cube.scale.z = 0.5
    // 设置物体渲染
    // cube.rotation.x = Math.PI / 2
}
// 创建GUI工具
function createGUI(){
    // 2. 创建gui对象
    const gui = new dat.GUI();
    // 添加一个标题控制器
    gui.add(document, "title")
    // 控制物体显示或者隐藏
    gui.add(cube, "visible")
    // 重置轨道控制器
    gui.add(controls, 'reset')

    // 添加颜色
    // const colorObj = {
    //     "col": `#${cube.material.color.getHexString()}`
    // }
    // gui.addColor(colorObj, "col").onChange((val) => {
    //     cube.material.color = new THREE.Color(val)
    // })
    // 分组
    const group =gui.addFolder("位移")
    // 参数3：最小值范围，参数4：最大值范围，参数5：步长 （数字->进度条）
    group.add(cube.position, "x", 0, 10, 1)
    group.add(cube.position, "y", 0, 10, 1)
    group.add(cube.position, "z", 0, 10, 1)
    // 3.5 下拉菜单(关键：第三个参数为对象时->下拉菜单)
    // 对象中属性名->下拉菜单选项名
    // 初始值匹配后会影响下拉菜单默认选中哪一项
    gui.add({ type: "1" },"type",{'方案1':'1','方案2':'2'}).onChange((val)=>{
        console.log(val);
        switch (val){
            case '1':
                cube.position.x=10
                break;
            case '2':
                cube.position.x = 5
                break;
        }
    })
}
init()
//创建立方体
createCube()
//创建球体
// createCircle()
// 调用轨道控制器的方法
createControls()


// 5. 将摄像机与场景渲染到画布上面(传入场景与摄像机, 并渲染到画面)
renderer.render(scene, camera)


animate()
//坐标轴
createHelper()

renderResize()

// 移动
moveCube()

// 创建GUI工具
createGUI()



