import * as THREE from "three";
import style from "./Cube.module.scss";
import { useEffect, useRef, useState } from "react";

function MyThree() {
    const refContainer = useRef<any>(null);

    const refAnimation = useRef<any>(null)

    const [mouseIsDown, setMouseIsDown] = useState(false)




    useEffect(() => {
        // === THREE.JS CODE START ===
        // if (render) {
        var scene = new THREE.Scene();
        const bgcolor = new THREE.Color("rgb(76, 108, 151);");
        scene.background = bgcolor;

        scene.fog = new THREE.Fog(0xffffff, 10, 15);

        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild( renderer.domElement );
        // use ref as a mount point of the Three.js scene instead of the document.body
        //




        refContainer.current.innerHTML = "";
        refContainer.current.append(renderer.domElement);
        var geometry = new THREE.BoxGeometry(2, 3, 1);
        var material = new THREE.MeshBasicMaterial({ color: "rgb(20, 42, 73)" });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 5;


        var animate = function() {
            refAnimation.current = requestAnimationFrame(animate);
            if (!mouseIsDown) {
                // controls.update();
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;


            } else {

                cube.scale.set(1.5, 1.5, 1)
                cube.rotation.x += 0.01;

                cube.rotation.y += 0.01;
            }


            renderer.render(scene, camera);
        };
        animate();
    }, [mouseIsDown]);
    return <div onMouseUp={() => {
        cancelAnimationFrame(refAnimation.current);
        setMouseIsDown(false)
    }} onMouseDown={() => {
        cancelAnimationFrame(refAnimation.current);
        setMouseIsDown(true)
    }} className={style.mainCube} ref={refContainer}></div>;
}

export default MyThree;
