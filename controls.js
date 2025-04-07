import * as THREE from 'three';

export function createControls(crane) {
  // Create keyboard controls for the crane
  const keyState = {};
  
  document.addEventListener('keydown', (event) => {
    keyState[event.code] = true;
  });
  
  document.addEventListener('keyup', (event) => {
    keyState[event.code] = false;
  });
  
  // Add info text
  const info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.left = '10px';
  info.style.color = 'white';
  info.style.backgroundColor = 'rgba(0,0,0,0.5)';
  info.style.padding = '10px';
  info.style.fontFamily = 'Arial';
  info.style.fontSize = '14px';
  info.innerHTML = `
    <h2>Crane Controls:</h2>
    <p>A/D - Rotate base left/right</p>
    <p>W/S - Raise/lower boom</p>
    <p>Q/E - Extend/retract telescoping arm</p>
    <p>R/F - Raise/lower hook</p>
  `;
  document.body.appendChild(info);
  
  // Return the control state for use in the animation loop
  return {
    update: function(deltaTime) {
      // Base rotation (left/right)
      if (keyState['KeyA']) {
        crane.baseGroup.rotation.y += 0.02;
      }
      if (keyState['KeyD']) {
        crane.baseGroup.rotation.y -= 0.02;
      }
      
      // Boom angle (up/down)
      if (keyState['KeyW'] && crane.boomGroup.rotation.x > -Math.PI / 3) {
        crane.boomGroup.rotation.x -= 0.02;
      }
      if (keyState['KeyS'] && crane.boomGroup.rotation.x < Math.PI / 4) {
        crane.boomGroup.rotation.x += 0.02;
      }
      
      // Telescoping arm (extend/retract)
      if (keyState['KeyQ'] && crane.telescopingGroup.position.z < 16) {
        crane.telescopingGroup.position.z += 0.1;
      }
      if (keyState['KeyE'] && crane.telescopingGroup.position.z > 12) {
        crane.telescopingGroup.position.z -= 0.1;
      }
      
      // Cable/hook (up/down)
      if (keyState['KeyR'] && crane.hookGroup.position.y < -5) {
        crane.hookGroup.position.y += 0.2;
        // Adjust cable length
        const cable = crane.cableGroup.children[0];
        cable.scale.y = crane.hookGroup.position.y / -10;
        cable.position.y = crane.hookGroup.position.y / 2;
      }
      if (keyState['KeyF'] && crane.hookGroup.position.y > -20) {
        crane.hookGroup.position.y -= 0.2;
        // Adjust cable length
        const cable = crane.cableGroup.children[0];
        cable.scale.y = crane.hookGroup.position.y / -10;
        cable.position.y = crane.hookGroup.position.y / 2;
      }
    }
  };
}
