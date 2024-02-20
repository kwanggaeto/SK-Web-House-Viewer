'use client'
import { Clone, Environment, Html, OrbitControls, Sky, useGLTF, useProgress } from "@react-three/drei"
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface IModel
{
  name : string;
  url : string;
}

const Models : IModel[] = [
  { name : "house", url : "/models/scene.glb" },
]

const Model = (data : any) => {
  console.log(`data = ${data.url}`);
  console.log(`data = ${Models[0].name}`);
  const { scene } :any  = useLoader(GLTFLoader, Models[0].url);
  return (
    <primitive object = {scene}>
    </primitive>
  );
}

function Loader() {
    const { progress } = useProgress();
    return (
      <Html center>
        <svg width={300} height={10}>
          <rect width={300} height={10} stroke="black" strokeWidth={2} fillOpacity={0} />
          <rect width={300 * (progress/100)} height={10} fill="black" />
        </svg>
        <p className="text-sm w-full flex justify-center opacity-50">{`loading ${progress.toPrecision(3)} %`}</p>
      </Html>
    );
}

const HouseScene = () => {
  return(
      <div className="w-full h-screen">
          <Canvas camera = {{ position : [0,-400,10], near : 0.025, fov:40}} shadows={true}>
              <Suspense fallback={<Loader />}>
                  <Model data={Models[0]} />
                  <ambientLight intensity={0.5} />
              </Suspense>
              <OrbitControls
                autoRotate
                autoRotateSpeed={0.5}
                target={[0,3,0]}
                minDistance={50}
                maxDistance={450}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI * 0.4}                
                />
              {/* <Sky sunPosition={[100, 110, 50]} /> */}
              <Environment
                preset="sunset"
                background blur={0.5}
                ground={{
                  height: 5,
                  radius: 1000,
                  scale: 1,
                }} />
              <directionalLight 
              position={[3.3, 1.0, 4.4]} 
              intensity={0.8} 
              castShadow 
              shadow-radius={5}
              shadow-mapSize-height={512}
              shadow-mapSize-width={512} />
          </Canvas>
      </div>
  )
}
export default HouseScene;