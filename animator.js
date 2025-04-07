import * as THREE from 'three';

export function createAnimator(crane, renderer, scene, camera) {
  let lastTime = 0;
  
  function animate(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;
    
    // Update controls based on keyboard input
    controls.update(deltaTime);
    
    // Add some subtle ambient movement to make the crane feel more alive
    crane.hookGroup.rotation.y += Math.sin(time * 0.001) * 0.01;
    
    // Render the scene
    renderer.render(scene, camera);
    
    // Continue the animation loop
    requestAnimationFrame(animate);
  }
  
  // Get the controls object from the module scope
  const controls = {
    update: function() {} // Default empty function, will be replaced
  };
  
  return {
    start: function() {
      // Import the controls module and get the update function
      import('./controls.js').then(module => {
        const controlsObj = module.createControls(crane);
        controls.update = controlsObj.update;
        
        // Start the animation loop
        requestAnimationFrame(animate);
      });
    }
  };
}
