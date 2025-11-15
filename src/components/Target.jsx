import { useRef, useState, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Target = (props) => {
  const targetRef = useRef(null);
  const [scene, setScene] = useState(null);
  const [animations, setAnimations] = useState([]);
  const [loading, setLoading] = useState(true);
  const mixerRef = useRef(null);

  const onlineGLTF = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/target-stand/model.gltf';
  const fallbackGLTF = '/models/robot/scene.gltf';
  useEffect(() => {
    const loader = new GLTFLoader();

    const load = (url, onError) => {
      loader.load(
        url,
        (gltf) => {
          setScene(gltf.scene);
          setAnimations(gltf.animations || []);
          setLoading(false);
        },
        undefined,
        (err) => {
          if (onError) onError(err);
          else console.error('GLTF load failed', err);
        }
      );
    };

    // Try online first, fallback to local
    load(onlineGLTF, () => {
      console.warn('Online GLTF failed, using fallback.');
      load(fallbackGLTF);
    });
  }, []);

  // Setup AnimationMixer
  useEffect(() => {
    if (scene && animations.length) {
      mixerRef.current = new AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
    }
  }, [scene, animations]);

  // Advance animation every frame
  useFrame((state, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  // GSAP animation on mesh
  useGSAP(() => {
    if (!targetRef.current) return;
    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      {/* Placeholder cube while loading */}
      {loading && <boxGeometry args={[1, 1, 1]} />}
      {loading && <meshStandardMaterial color="hotpink" />}

      {/* GLTF scene once loaded */}
      {scene && <primitive object={scene} />}
    </mesh>
  );
};

export default Target;
