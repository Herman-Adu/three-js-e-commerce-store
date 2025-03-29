"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";

import Link from "next/link";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { a, easings, useSpring } from "@react-spring/three";
import * as THREE from "three";
import { useInView } from "framer-motion";
import Image from "next/image";

interface ModelProps {
  url: string;
  finalPosition: [number, number, number];
  initialPosition: [number, number, number];
  rotation: [number, number, number];
}

const Model = ({
  url,
  initialPosition,
  finalPosition,
  rotation,
}: ModelProps) => {
  const gltf = useLoader(GLTFLoader, url);
  const modelRef = useRef<THREE.Mesh>(null);

  const { position } = useSpring({
    from: { position: initialPosition },
    to: { position: finalPosition },
    config: { duration: 1500, easing: easings.easeInOutCubic },
    delay: 200,
  });

  return (
    <a.mesh
      ref={modelRef}
      position={position}
      rotation={rotation}
      scale={[0.65, 0.65, 0.65]}
    >
      <primitive object={gltf.scene} />
    </a.mesh>
  );
};

const Sale = () => {
  const mountRef = useRef(null);
  const isInView = useInView(mountRef, { once: true });
  //
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); //

  const leftModelInitialPosition: [number, number, number] = [-2, 0, 0];
  const rightModelInitialPosition: [number, number, number] = [2, 0, 0];

  const leftModelFinalPosition: [number, number, number] = [-3.1, -1.3, 0];
  const rightModelFinalPosition: [number, number, number] = isMobile
    ? [1.5, -1, 0]
    : [2.9, 0.8, 0];

  const modelRotation: [number, number, number] = [
    Math.PI / 2,
    (Math.PI / 180) * 80,
    (Math.PI / 180) * -10,
  ];

  return (
    <div className="container flex flex-col items-center gap-8 pt-32 mx-auto relative">
      <div
        ref={mountRef}
        className="absolute w-full h-screen lg:h-[150vh] top-0 md:top-[-60vh] left-0 "
      >
        {/* If you want to return an image on mobile instead of the canvas*/}
        {/* isMobile ? <Image /> : (<Canvas ...>...</Canvas>) */}
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <directionalLight position={[-5, 5, 5]} intensity={3} />
          {isInView && (
            <>
              {!isMobile && (
                <Model
                  url="/assets/keyboard.glb"
                  initialPosition={leftModelInitialPosition}
                  finalPosition={leftModelFinalPosition}
                  rotation={modelRotation}
                />
              )}
              <Model
                url="/assets/keyboard3.glb"
                initialPosition={rightModelInitialPosition}
                finalPosition={rightModelFinalPosition}
                rotation={modelRotation}
              />
            </>
          )}
        </Canvas>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Limited collection
        <br /> for sale
      </h2>
      <p className="uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent">
        discounts up to 30%
      </p>
      <Link
        href="#preview"
        className="w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient"
      >
        Buy keyboard
      </Link>
    </div>
  );
};

export default Sale;
