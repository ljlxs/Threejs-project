import './style.css'

import { scene, camera, renderer, controls, css3dRenderer } from  './utils/init.js'

import * as THREE from 'three'

// 引入dat.gui
import guiMove from "./utils/gui.js"

// 引入将dom 2d 转化为3d方法
import { CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'

//创建分组
let groud = new THREE.Group()

let video
let videoStatus

//准备立方体贴图数据
const sceneInfoObj = {
    one: {
        // 公共资源路径
        publicPath: "technology/1/",
        // 需要加载的图片资源
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.46, -0.11, -0.11],
                // 物体的旋转角度
                rotation: [1.42, 0.68, 1.63],
                // 切换的下一个场景
                targetAttr: 'two'
            }
        ]
    },
    two:{
        publicPath: "technology/2/",
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [0.35, -0.09, 0.03],
                // 物体的旋转角度
                rotation: [4.72, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'one'
            },
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.46, -0.11, -0.11],
                // 物体的旋转角度
                rotation: [1.42, 0.68, 1.63],
                // 切换的下一个场景
                targetAttr: 'three'
            }
        ]
    },
    three:{
        publicPath: "technology/3/",
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [0.27, -0.14, 0.31],
                // 物体的旋转角度
                rotation: [5.41, 0.75, 3.35],
                // 切换的下一个场景
                targetAttr: 'two'
            },
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [0.31, -0.16, -0.25],
                // 物体的旋转角度
                rotation: [1.74, 3.26, 1.63],
                // 切换的下一个场景
                targetAttr: 'four'
            }
        ]
    },
    four:{
        publicPath: "technology/4/",
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.44, -0.15, -0.06],
                // 物体的旋转角度
                rotation: [1.53, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'three'
            },
            {
                // 标记点名称
                name: 'dom',
                // 物体的位置坐标
                position: [0.49, 0, 0],
                // 物体的旋转角度
                rotation: [0, -0.5 * Math.PI, 0],
                // 切换的下一个场景
                targetAttr: 'five',
                // 回调函数
                active() {
                    setMaterialCube(sceneInfoObj.five)
                },
            }
        ]
    },
    five:{
        publicPath: "technology/5/",
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.44, -0.15, -0.06],
                // 物体的旋转角度
                rotation: [1.53, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'four'
            },
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.44, -0.15, -0.06],
                // 物体的旋转角度
                rotation: [1.53, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'six'
            },
            {
                // 标记点名称
                name: 'video',
                // 视频路径
                imgUrl: 'video/movie.mp4',
                // 物体的宽高
                wh: [0.2, 0.1],
                // // 物体的位置坐标
                position: [0.49, 0.04, 0.05],
                // 物体的旋转角度
                rotation: [0.39, -1.49, 0.39],
            }
        ]
    },
    six:{
        publicPath: "technology/5/",
        imgUrlArr: ["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"],
        markList: [
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.44, -0.15, -0.06],
                // 物体的旋转角度
                rotation: [1.53, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'five'
            },
            {
                // 标记点名称
                name: 'landmark',
                // 标记点图片的路径
                imgUrl: 'other/landmark.png',
                // 物体的宽度
                wh: [0.05, 0.05],
                // 物体的位置坐标
                position: [-0.44, -0.15, -0.06],
                // 物体的旋转角度
                rotation: [1.53, 0.89, 2.36],
                // 切换的下一个场景
                targetAttr: 'four'
            }
        ]
    }
}

//创建立方体
function createCube(){
    const geometry = new THREE.BoxGeometry(1,1,1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
    const cube = new THREE.Mesh(geometry, material);
    // 调整立方体沿着 z 轴做 -1 缩小（镜面翻转）
    cube.scale.set(1, 1, -1)

    scene.add(cube)
    // 将物体对象返回给函数
    return cube
}
//创建纹理加载器并对立方缓存几何体进行贴图
function setMaterialCube(infoObj){
    //清空上一次数据
    clear()
    const { publicPath, imgUrlArr, markList } = infoObj
    //创建纹理加载器
    const texturlLoader = new THREE.TextureLoader()
    // 图片公共地址
    texturlLoader.setPath(publicPath)
    // 遍历图片依次加入
    const materialArr = imgUrlArr.map(item=>{
        const texturl = texturlLoader.load(item)
        // three.js 颜色通道为 rgb 颜色（为了防止图片太浅）
        texturl.colorSpace = THREE.SRGBColorSpace
        return new THREE.MeshBasicMaterial({
            map: texturl,
            //设置双面渲染
            side: THREE.DoubleSide
        })
    })
    cubeObj.material = materialArr
    markList.forEach(markObj => {
        if (markObj.name === 'landmark') createLandMark(markObj)
        else if (markObj.name === 'dom') createDomMark(markObj)
        else if (markObj.name === 'video') createVideoMark(markObj)
    });

    scene.add(groud)
}
// 坐标指示点
function createLandMark(infoObj){
    const { name, imgUrl, wh, position, rotation ,targetAttr} = infoObj
    const texturlLoader = new THREE.TextureLoader()
    const geometry = new THREE.PlaneGeometry(...wh)
    const material = new THREE.MeshBasicMaterial({
        map: texturlLoader.load(imgUrl),
        side: THREE.DoubleSide,
        transparent:true
    })
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(...position)
    plane.rotation.set(...rotation)
    plane.name=name
    plane.userData.targetAttr = targetAttr
    // guiMove(plane)
    groud.add(plane)
}
// 前进文本标记点
function createDomMark(infoObj){
    console.log(infoObj);
    let { position, rotation, active } = infoObj
    const tag = document.createElement('span')
    tag.className = "mark-style"
    tag.innerHTML = "前进"
    tag.style.color = "#fff"
    tag.style.pointerEvents = "all"
    tag.addEventListener("click", (e) => {
        active(e)
    })


    const tag3d = new CSS3DObject(tag)
    tag3d.scale.set(1 / 800, 1 / 800, 1 / 800)
    tag3d.position.set(...position)
    tag3d.rotation.set(...rotation)
    groud.add(tag3d)
}
function bindClick(){
    const raycaster=new THREE.Raycaster();
    const pointer=new THREE.Vector2()
    window.addEventListener('click', (event)=>{
        // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // 通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        const obj = intersects.find(item => item.object.name ==='landmark')
        const videoObj = intersects.find(item => item.object.name === "video")
        if(obj){
            const infoObj = sceneInfoObj[obj.object.userData.targetAttr]

            setMaterialCube(infoObj)
        }
        if (videoObj) {
            if (videoStatus) {
                console.log("video", video)
                video.pause()
                videoStatus = false
            } else {
                video.play()
                videoStatus = true
            }
        }
    })
}

// 调用创建立方缓冲几何体方法
const cubeObj = createCube()
setMaterialCube(sceneInfoObj.one)
//// 创建视频纹理
function createVideoMark(infoObj){
    const { name, imgUrl, wh, position, rotation, targetAttr } = infoObj
    video = document.createElement('video');
    video.src = imgUrl
    video.muted = true
    video.addEventListener('loadedmetadata',()=>{
        video.play()
        videoStatus = true
        video.muted = false
    })
    const texture = new THREE.VideoTexture(video)
    const geometry = new THREE.PlaneGeometry(...wh)
    const material = new THREE.MeshBasicMaterial({
        map: texture
    })
    // 创建物体
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(...position)
    plane.rotation.set(...rotation)
    plane.name = name
    // guiMove(plane)
    groud.add(plane);
}
//清空
function clear(){
    const list = [...groud.children]

    list.forEach(obj => {
        if (!obj.isCSS3DObject) {
       
            obj.geometry.dispose()
            obj.material.dispose()
        }
        groud.remove(obj)
    })

}

//3D场景添加点击事件
bindClick()