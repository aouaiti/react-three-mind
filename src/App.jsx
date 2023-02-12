import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

function App() {
  const container = useRef(null);
  const [ar, setAr] = useState(null);

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

  useEffect(() => {
    if (!container) return;
    init()
      .then(async (data) => {
        setAr(data);
        console.log(data);
        const { renderer, scene, camera } = data;
        console.log(renderer, scene, camera);
        await data.start();
      })
      .catch((err) => console.log(err));
  }, [container]);

  const [count, setCount] = useState(0);

  return <div ref={container} className='App'></div>;
}

export default App;
