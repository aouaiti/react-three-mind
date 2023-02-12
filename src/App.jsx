import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { Canvas, useThree } from "@react-three/fiber";

function Shape({ getScene }) {
  const three = useThree();
  getScene(three);
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}

function App() {
  const container = useRef(null);
  const [ar, setAr] = useState(null);
  const [scene, setScene] = useState(null);

  async function init() {
    return new Promise((resolve, reject) => {
      resolve(
        new MindARThree({
          container: container.current,
          imageTargetSrc:
            "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/examples/image-tracking/assets/card-example/card.mind",
        })
      );
    });
  }

  const getScene = (prop) => {
    setScene(prop.scene);
  };

  useEffect(() => {
    (function () {
      var s = document.createElement("script");
      s.src = "https://remotejs.com/agent/agent.js";
      s.setAttribute(
        "data-consolejs-channel",
        "926606f4-8635-10b3-1582-c8a579d09065"
      );
      document.head.appendChild(s);
    })();
  }, []);

  useEffect(() => {
    if (!container) return;
    console.log(scene);
    init()
      .then(async (data) => {
        setAr(data);
        // console.log(data);
        const { renderer, camera } = data;
        // console.log(renderer, scene, camera);
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          transparent: true,
          opacity: 0.7,
        });
        const plane = new THREE.Mesh(geometry, material);
        const anchor = data.addAnchor(0);
        anchor.group.add(plane);
        await data.start();
        console.log(scene);
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      })
      .catch((err) => console.log(err));
  }, [container]);

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={container}>
      <Canvas>
        <Shape getScene={getScene} />
      </Canvas>
    </div>
  );
}

export default App;
