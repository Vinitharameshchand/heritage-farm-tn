import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useControls } from "leva";

function AvatarModel({ isAnimating }) {
  const group = useRef();
  const [modelPath] = useState("/models/64bfa15f0e72c63d7c3934a6.glb");
  const [currentAnimIndex, setCurrentAnimIndex] = useState(0);
  
  // Leva controls for easy configuration
  const { 
    scale, 
    positionX, 
    positionY, 
    positionZ,
    rotationY,
    enableFloating,
    floatingSpeed,
    floatingAmount
  } = useControls('Avatar Model', {
    scale: { value: 3.5, min: 0.5, max: 8, step: 0.1 },
    positionX: { value: 0, min: -3, max: 3, step: 0.1 },
    positionY: { value: 2.2, min: -3, max: 5, step: 0.1 },
    positionZ: { value: 0, min: -3, max: 3, step: 0.1 },
    rotationY: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    enableFloating: true,
    floatingSpeed: { value: 0.8, min: 0, max: 2, step: 0.1 },
    floatingAmount: { value: 0.08, min: 0, max: 0.3, step: 0.01 }
  });
  
  try {
    // Load the main model
    const { scene, animations: modelAnimations } = useGLTF(modelPath, true);
    
    // Load talking animations from Algo-swap with error handling
    let talking0, talking1, talking2, idle;
    let talkingAnimations = [...(modelAnimations || [])];
    
    try {
      talking0 = useFBX("/animations/Talking_0.fbx");
      if (talking0?.animations) talkingAnimations = [...talkingAnimations, ...talking0.animations];
    } catch (e) { console.warn("Failed to load Talking_0:", e); }
    
    try {
      talking1 = useFBX("/animations/Talking_1.fbx");
      if (talking1?.animations) talkingAnimations = [...talkingAnimations, ...talking1.animations];
    } catch (e) { console.warn("Failed to load Talking_1:", e); }
    
    try {
      talking2 = useFBX("/animations/Talking_2.fbx");
      if (talking2?.animations) talkingAnimations = [...talkingAnimations, ...talking2.animations];
    } catch (e) { console.warn("Failed to load Talking_2:", e); }
    
    try {
      idle = useFBX("/animations/Standing Idle.fbx");
      if (idle?.animations) talkingAnimations = [...talkingAnimations, ...idle.animations];
    } catch (e) { console.warn("Failed to load Idle:", e); }
    
    const { actions, mixer } = useAnimations(talkingAnimations, group);

    useEffect(() => {
      if (scene) {
        scene.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Ensure materials are visible
            if (child.material) {
              child.material.needsUpdate = true;
            }
          }
        });
      }
    }, [scene]);

    // Play talking animation when speaking
    useEffect(() => {
      if (actions && isAnimating) {
        const actionNames = Object.keys(actions);
        if (actionNames.length > 0) {
          // Stop all actions first
          actionNames.forEach(name => actions[name]?.stop());
          
          // Randomly select a talking animation or use the first one
          const talkingActions = actionNames.filter(name => 
            name.toLowerCase().includes('talk') || name.toLowerCase().includes('speaking')
          );
          
          const actionName = talkingActions.length > 0 
            ? talkingActions[Math.floor(Math.random() * talkingActions.length)]
            : actionNames[currentAnimIndex % actionNames.length];
          
          const action = actions[actionName];
          if (action) {
            action.reset().fadeIn(0.5).play();
            action.setLoop(THREE.LoopRepeat);
          }
          
          setCurrentAnimIndex(prev => (prev + 1) % actionNames.length);
        }
      } else if (actions && !isAnimating) {
        // Return to idle animation
        const actionNames = Object.keys(actions);
        const idleAction = actionNames.find(name => 
          name.toLowerCase().includes('idle') || name.toLowerCase().includes('standing')
        );
        
        actionNames.forEach(name => {
          if (name !== idleAction) {
            actions[name]?.fadeOut(0.5);
          }
        });
        
        if (idleAction && actions[idleAction]) {
          actions[idleAction].reset().fadeIn(0.5).play();
          actions[idleAction].setLoop(THREE.LoopRepeat);
        }
      }
    }, [actions, isAnimating, mixer]);

    // Gentle floating and breathing animation with Leva controls
    useFrame((state) => {
      if (group.current) {
        // Apply floating animation if enabled
        const floatY = enableFloating 
          ? Math.sin(state.clock.elapsedTime * floatingSpeed) * floatingAmount 
          : 0;
        
        group.current.position.set(positionX, positionY + floatY, positionZ);
        
        // Keep model facing straight (no automatic rotation when not speaking)
        if (isAnimating) {
          // Slight head movement when speaking
          group.current.rotation.y = rotationY + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        } else {
          // Face straight
          group.current.rotation.y = rotationY;
        }
      }
    });

    return (
      <group ref={group} scale={scale}>
        <primitive object={scene} />
      </group>
    );
  } catch (error) {
    console.error("Error loading 3D model:", error);
    return <FallbackAvatar />;
  }
}

// Fallback animated avatar if model fails to load
function FallbackAvatar() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#ec4899"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.3, 0.3]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
      </mesh>
      <mesh position={[-0.2, 0.2, 0.4]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.2, 0.2, 0.4]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  );
}

export default function Avatar3D({ isAnimating = false, className = "" }) {
  const [error, setError] = useState(false);
  
  // Camera controls with Leva
  const { cameraZ, cameraY, fov, showControls } = useControls('Camera', {
    cameraZ: { value: 3.5, min: 0.1, max: 10, step: 0.1 },
    cameraY: { value: 0.5, min: -3, max: 3, step: 0.1 },
    fov: { value: 45, min: 20, max: 120, step: 5 },
    showControls: false
  });

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, cameraY, cameraZ], fov: fov }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Lights />
        {!error ? (
          <AvatarModel isAnimating={isAnimating} />
        ) : (
          <FallbackAvatar />
        )}
        {showControls && <OrbitControls enableZoom={true} enablePan={true} />}
      </Canvas>
    </div>
  );
}

// Preload the model and animations with error handling
try {
  useGLTF.preload("/models/64bfa15f0e72c63d7c3934a6.glb");
  // Preload talking animations
  useFBX.preload("/animations/Talking_0.fbx");
  useFBX.preload("/animations/Talking_1.fbx");
  useFBX.preload("/animations/Talking_2.fbx");
  useFBX.preload("/animations/Standing Idle.fbx");
} catch (error) {
  console.warn("Could not preload 3D assets, will load on demand:", error);
}
