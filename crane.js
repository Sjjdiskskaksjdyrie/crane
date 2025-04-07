import * as THREE from 'three';
import { createMaterials } from './materials.js';

export function createCrane() {
  // Create materials
  const materials = createMaterials();
  
  // Main crane group that contains all parts
  const craneGroup = new THREE.Group();
  
  // 1. Base/Cab - This is the bottom part that rotates horizontally
  const baseGroup = new THREE.Group();
  craneGroup.add(baseGroup);
  
  // Create base platform
  const basePlatform = new THREE.Mesh(
    new THREE.CylinderGeometry(2, 2.5, 0.5, 16),
    materials.base
  );
  basePlatform.position.y = 0.25;
  basePlatform.castShadow = true;
  baseGroup.add(basePlatform);
  
  // Create cab
  const cab = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 3),
    materials.cab
  );
  cab.position.y = 1.5;
  cab.castShadow = true;
  baseGroup.add(cab);
  
  // Add cab details (windows)
  const cabWindow = new THREE.Mesh(
    new THREE.BoxGeometry(2.5, 0.8, 0.1),
    materials.glass
  );
  cabWindow.position.set(0, 1.8, 1.55);
  baseGroup.add(cabWindow);
  
  // 2. Boom - The arm that rotates vertically
  const boomGroup = new THREE.Group();
  baseGroup.add(boomGroup);
  boomGroup.position.y = 2.5;
  
  // Create boom base (connection to cab)
  const boomBase = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    materials.joint
  );
  boomBase.castShadow = true;
  boomGroup.add(boomBase);
  
  // Create main boom
  const boomMain = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.8, 12),
    materials.boom
  );
  boomMain.position.z = 6;
  boomMain.castShadow = true;
  boomGroup.add(boomMain);
  
  // Add structural details to boom
  const boomSupport = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 3, 0.2),
    materials.boom
  );
  boomSupport.position.set(0, 1.5, 3);
  boomSupport.castShadow = true;
  boomGroup.add(boomSupport);
  
  // 3. Telescoping section - Extends from the boom
  const telescopingGroup = new THREE.Group();
  boomGroup.add(telescopingGroup);
  telescopingGroup.position.z = 12;
  
  const telescopingArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.6, 8),
    materials.telescoping
  );
  telescopingArm.position.z = 4;
  telescopingArm.castShadow = true;
  telescopingGroup.add(telescopingArm);
  
  // 4. Cable/Hook system - Lowers and raises
  const cableGroup = new THREE.Group();
  telescopingGroup.add(cableGroup);
  cableGroup.position.z = 8;
  
  // Create cable
  const cable = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 10, 8),
    materials.cable
  );
  cable.position.y = -5;
  cable.castShadow = true;
  cableGroup.add(cable);
  
  // Create hook
  const hookGroup = new THREE.Group();
  cableGroup.add(hookGroup);
  hookGroup.position.y = -10;
  
  const hook = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.1, 0.8, 8),
    materials.hook
  );
  hook.castShadow = true;
  hookGroup.add(hook);
  
  // Add hook detail
  const hookEnd = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.1, 8, 16),
    materials.hook
  );
  hookEnd.rotation.x = Math.PI / 2;
  hookEnd.position.y = -0.5;
  hookEnd.castShadow = true;
  hookGroup.add(hookEnd);
  
  // Return all the groups so they can be manipulated
  return {
    craneGroup,    // The entire crane
    baseGroup,     // Rotates horizontally (cab)
    boomGroup,     // Rotates vertically (arm)
    telescopingGroup, // Extends in/out
    cableGroup,    // The cable system
    hookGroup      // The hook at the end of the cable
  };
}
