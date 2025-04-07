import * as THREE from 'three';

export function createMaterials() {
  return {
    base: new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Gold/yellow
      roughness: 0.7,
      metalness: 0.3
    }),
    
    cab: new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Gold/yellow
      roughness: 0.7,
      metalness: 0.3
    }),
    
    glass: new THREE.MeshStandardMaterial({
      color: 0x88CCFF,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.7
    }),
    
    joint: new THREE.MeshStandardMaterial({
      color: 0x333333, // Dark gray
      roughness: 0.8,
      metalness: 0.5
    }),
    
    boom: new THREE.MeshStandardMaterial({
      color: 0xFFD700, // Gold/yellow
      roughness: 0.7,
      metalness: 0.3
    }),
    
    telescoping: new THREE.MeshStandardMaterial({
      color: 0xCCCCCC, // Light gray
      roughness: 0.5,
      metalness: 0.8
    }),
    
    cable: new THREE.MeshStandardMaterial({
      color: 0x111111, // Almost black
      roughness: 0.5,
      metalness: 0.8
    }),
    
    hook: new THREE.MeshStandardMaterial({
      color: 0x777777, // Gray
      roughness: 0.3,
      metalness: 0.9
    })
  };
}
