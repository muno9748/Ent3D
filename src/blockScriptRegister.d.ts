import THREE from 'three';
interface HUDGraphicsManager {
    HUDTexture: THREE.Texture;
    HUDCamera: THREE.OrthographicCamera;
    HUDScene: THREE.Scene;
    updateCanvas: () => Promise<void>
}
export let glRenderer: {
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    HUDGraphicsManager: HUDGraphicsManager;
    render: () => void;
}
// export let Ent3DScripts: any;
export as namespace Ent3D;