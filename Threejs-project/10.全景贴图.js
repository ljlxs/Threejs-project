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
// 引入性能监视器的stats组件
import Stats from 'three/examples/jsm/libs/stats.module.js'

// 1. 引入dat.gui
import * as dat from 'dat.gui';
let scene, camera, renderer 
let controls
let cube
//创建stats
let stats
// 创建分组
let group
function init(){
    //2.创建场景对象
    scene=new THREE.Scene();


    //3.创建摄像机对象
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)


    // 改变摄像机z轴的位置, 把摄像机向后移动5个单位(移动摄像机向 z 轴5个单位, 默认摄像机和物体的坐标轴都在原点)
    camera.position.z = 35


    //4.创建渲染器设置画布大小（创建canvas标签）
    renderer=new THREE.WebGLRenderer({
        antialias: true, //抗锯齿
    })

    //设置画布大小
    renderer.setSize(window.innerWidth , window.innerHeight)

    // 将画布添加到DOM
    document.body.append(renderer.domElement)

}
function createGruop(){
    group= new THREE.Group()
}
//创建立方体
function createCube(){
    const cubeInfoArr=[]
    for(let i =0 ;i<5;i++){
        const obj={
            color: `rgb(${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${Math.floor(Math.random() * (255 - 0 + 1) + 0)},${Math.floor(Math.random() * (255 - 0 + 1) + 0) })`,
            w: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            h: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            d: Math.floor(Math.random() * (3 - 1 + 1) + 1),
            x: Math.floor(Math.random() * (5 - -5 + 1) + -5),
            y: Math.floor(Math.random() * (5 - -5 + 1) + -5),
            z: Math.floor(Math.random() * (5 - -5 + 1) + -5),
        }
        cubeInfoArr.push(obj)
    }
    cubeInfoArr.map(item=>{
        // 创建图形 //线物体LineBasicMaterial，也需要使⽤线材质配合Line(3D)
        const geometry = new THREE.BoxGeometry(item.w, item.h, item.d)
        // 创建材质
        const material = new THREE.LineBasicMaterial({color:item.color})
        // 创建物体网格对象, 并且图形与材质加载的物体网格对象中
        cube = new THREE.Line(geometry, material)
        // 给创建的立方体定以名称
        cube.name = "cn"
        cube.position.set(item.x,item.y,item.z)
        group.add(cube)
    })
    scene.add(group)
}
// 创建球形
function createCircle(){
    
    //圆形缓和几何体
    //创建图形
    const geometry = new THREE.CircleGeometry(5, 32)
    //创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00})
    const circle = new THREE.Mesh(geometry, material)
    // circle.position.set(10,10,10)
    circle.position.set(10, 10, 10)
    scene.add(circle)
}
// //创建球体几何图形
function createSphere(){
    // const geometry = new THREE.SphereGeometry(5, 20, 40)
    // //// 2. 创建材质，颜色为绿色 0x00ff00
    // const material = new THREE.LineBasicMaterial({ color: '#3a8cb8', size: 0.05 })
    // // 设置当前纹理加载器公共的基础路径
    // // textureLoader.setPath('image/class/')
    // const cube = new THREE.Line(geometry, material)
    // cube.position.set(-10, 10, 10)
    // scene.add(cube)

    //创建几何图形
    const geometry=new THREE.SphereGeometry(5, 20, 40)
    // 2. 使⽤纹理加载器并创建⽹格材质对象
    const texture = new THREE.TextureLoader().load('image/earth/earth.png')
    // 立即使用纹理进行材质创建
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material)
    cube.position.set(-10, 10, 10)
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
    stats.update();

    //将场景更新到画布
    renderer.render(scene, camera);
}
////线物体
function createLine(){
    const points=[]
    points.push(new THREE.Vector3(-1, 3, 0));// 1尾部
    points.push(new THREE.Vector3(0, 1, 0));// 1头部
    points.push(new THREE.Vector3(1, 3, 0));// 2尾部
    points.push(new THREE.Vector3(0, 1, 0));// 2头部
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
        color: 0x0000ff
    });
    // Line: ⼀条连续的线
    // LineLoop: ⼀条从头链接到尾的闭合线
    // LineSegments:按顺序⼀对点链接⼀条线
    const line = new THREE.LineSegments(geometry, material);
    scene.add(line);
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

// 创建性能监视器方法
function createStats(){
    stats=new Stats();
    // 3. 设置监视器面板类型（0：fps-每秒传输帧数，1：ms-每帧刷新用时，2：mb-内存占用）
    stats.setMode(0)
    stats.domElement.position ='fixed'
    stats.domElement.style.left='0'
    stats.domElement.style.top='0'
    document.body.appendChild(stats.domElement)
}

// 创建删除立方体
function removeCube(){
    window.addEventListener('dblclick',function(){
        group.children.filter(item =>{
            item.geometry.dispose()
            item.material.dispose()
        })
        scene.remove(group)
        // const arr=scene.children.filter(item=>item.name==='cn')
        // const c=arr[0]
        // if(c){
        //     if (arr.length===1) return
        //     c.geometry.dispose()
        //     c.material.dispose()
        //     scene.remove(c)
        // }
    })
}


init()
createGruop()
//创建球体
createCircle()
//创建立方体
createCube()
//创建球体几何体
createSphere()
//线物体
createLine()

// 调用轨道控制器的方法
createControls()
createStats()
removeCube()

// 5. 将摄像机与场景渲染到画布上面(传入场景与摄像机, 并渲染到画面)
renderer.render(scene, camera)


animate()

//坐标轴
createHelper()

renderResize()

// 移动
moveCube()

// 创建GUI工具
// createGUI()




