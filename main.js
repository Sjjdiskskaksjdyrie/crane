import * as THREE from 'three';
import { createScene } from './scene.js';
import { createCrane } from './crane.js';
import { createControls } from './controls.js';
import { createAnimator } from './animator.js';

// Initialize the scene, camera, and renderer
const { scene, camera, renderer } = createScene();

// Create the crane with all its articulated parts
const crane = createCrane();
scene.add(crane.craneGroup);

// Create UI controls for manipulating the crane
const controls = createControls(crane);

// Set up the animation loop
const animator = createAnimator(crane, renderer, scene, camera);
animator.start();
