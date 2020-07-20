createjs.Text.prototype._prepContext = function(a) {
    a.font = this.font ||                 a.font         || "10px sans-serif";
    a.textAlign = this.textAlign ||       a.textAlign    || "left";
    a.textBaseline = this.textBaseline || a.textBaseline || "top";
    return a;
}
Object.defineProperty(Ent3D, 'glRenderer', {
	value: await (async () => {
		const [ CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT ] = [
			captureBoardManager.CANVAS_MAX_WIDTH, 
			captureBoardManager.CANVAS_MAX_HEIGHT 
		]
		const setupHUD = async () => {
			await captureBoardManager.captureCanvas();
			const HUDFirstWidth = CANVAS_MAX_WIDTH, HUDFirstHeight = CANVAS_MAX_HEIGHT;
			const HUDCanvas = captureBoardManager.canvas;
			const HUDCamera = new THREE.OrthographicCamera( -HUDFirstWidth / 2, HUDFirstWidth / 2, HUDFirstHeight / 2, -HUDFirstHeight / 2, 0, 30 );
			const HUDScene = new THREE.Scene();
			const HUDTexture = new THREE.Texture(HUDCanvas);
			HUDTexture.needsUpdate = true;
			const HUDOverlayMaterial = new THREE.MeshBasicMaterial({ map: HUDTexture });
			HUDOverlayMaterial.transparent = true;
			const HUDOverlayGeometry = new THREE.PlaneGeometry( HUDFirstWidth, HUDFirstHeight );
			const HUDOverlay = new THREE.Mesh( HUDOverlayGeometry, HUDOverlayMaterial );
			HUDScene.add(HUDOverlay);
			const updateCanvas = async () => {
				captureBoardManager.createCanvas(true);
				captureBoardManager.canvas.style.setProperty('display', 'none');
				await captureBoardManager.captureCanvas();
				HUDTexture.image = captureBoardManager.canvas;
				HUDTexture.needsUpdate = true;
			}
			return { HUDTexture, HUDCamera, HUDScene, updateCanvas, HUDOverlay }
		}
	
		if(!window.THREE) await import('https://cdn.jsdelivr.net/gh/muno9748/Ent3D@master/three.min.js');
		if(document.querySelector('#entry3DCanvas')) document.querySelector('#entry3DCanvas').remove();
		document.querySelector('#entryCanvas').insertAdjacentHTML('afterend', `<canvas id="entry3DCanvas" width="${
			CANVAS_MAX_WIDTH
		}" height="${
			CANVAS_MAX_HEIGHT
		}" class="entryCanvas3DWorkspace" style="width: 100%;"></canvas>`);
	
		captureBoardManager.createCanvas(true);
		captureBoardManager.canvas.style.setProperty('display', 'none');
		const canvas = document.querySelector('#entry3DCanvas');
		const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera( 75, CANVAS_MAX_WIDTH / CANVAS_MAX_HEIGHT, 0.1, 1000 );
		
		const HUDGraphicsManager = await setupHUD();
	
		renderer.setSize( CANVAS_MAX_WIDTH, CANVAS_MAX_HEIGHT );
		renderer.autoClear = false;
		canvas.style.setProperty('width', '100%');
		canvas.style.removeProperty('height');
		canvas.width = CANVAS_MAX_WIDTH;
		canvas.height = CANVAS_MAX_HEIGHT;

		const render = async () => {
			await HUDGraphicsManager.updateCanvas();
			renderer.clear();
			renderer.render(scene, camera);
			renderer.render(HUDGraphicsManager.HUDScene, HUDGraphicsManager.HUDCamera);
		}
	
		return { renderer, scene, camera, HUDGraphicsManager, render };
	})()
})