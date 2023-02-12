import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import { Canvas, useThree } from "@react-three/fiber";

function Shape({ container }) {
  const three = useThree();
  const group = useRef(null);
  // console.log(container);
  // console.log(three.scene);
  async function init() {
    return new Promise((resolve, reject) => {
      resolve(
        new MindARThree({
          container: container,
          imageTargetSrc:
            "https://cdn.jsdelivr.net/npm/mind-ar@1.1.4/examples/image-tracking/assets/card-example/card.mind",
        })
      );
    });
  }

  useEffect(() => {
    if (!group) return;
    console.log(group);
    init()
      .then(async (data) => {
        // console.log(data);
        const { camera } = data;
        // console.log(renderer, scene, camera);
        const anchor = data.addAnchor(0);
        anchor.group.add(group.current);
        await data.start();
        // console.log(scene);
        renderer.setAnimationLoop(() => {
          renderer.render(three.scene, camera);
        });
      })
      .catch((err) => console.log(err));
  }, [group]);

  return (
    <group ref={group}>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
      <mesh>
        <sphereGeometry />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

function App() {
  const [container, setContainer] = useState(null);

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

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={setContainer}>
      <Canvas>{container && <Shape container={container} />}</Canvas>
    </div>
  );
}

export default App;
