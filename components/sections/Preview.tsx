import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const Preview = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const sceneWidth = window.innerWidth;
    const sceneHeight = window.innerHeight;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sceneWidth, sceneHeight);

    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      75,
      sceneWidth / sceneHeight,
      0.1,
      1000
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    for (let i = 0; i < 10; i++) {
      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      scene.add(cube);
    }

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 6;

    renderer.setAnimationLoop(animate);

    function animate() {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.x += 0.01;
          object.rotation.y += 0.01;
        }
      });

      renderer.render(scene, camera);
    }
  });
  return <div ref={mountRef} className="w-screen h-screen" />;
};

export default Preview;
