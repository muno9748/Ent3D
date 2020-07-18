import { Ent3D, glRenderer as Ent3DGLRenderingHelper } from '../blockScriptRegister';

Object.defineProperty(window, 'Ent3DGLRenderingHelper', { value: Ent3D.glRenderer })

{

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener('mousemove', e => {
        var a = document.createEvent('MouseEvent');
        a.initMouseEvent(
            "mousemove",
            true /* bubble */, true /* cancelable */,
            window, 0,
            0, 0, e.pageX, e.pageY, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        entryCanvas.dispatchEvent(a)
    });

    document.addEventListener('mousemove', e => {
        Ent3D.realMouseCoordinate = { x: e.pageX, y: e.pageY }
    })

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener('mousedown', e => {
        var a = document.createEvent('MouseEvent');
        a.initMouseEvent(
            "mousedown",
            true /* bubble */, true /* cancelable */,
            window, 0,
            0, 0, e.pageX, e.pageY, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        entryCanvas.dispatchEvent(a)
    });

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener('mouseup', e => {
        var a = document.createEvent('MouseEvent');
        a.initMouseEvent(
            "mouseup",
            true /* bubble */, true /* cancelable */,
            window, 0,
            0, 0, e.pageX, e.pageY, /* coordinates */
            false, false, false, false, /* modifier keys */
            0 /*left*/, null
        );
        entryCanvas.dispatchEvent(a)
    });

    const { Vector3 } = THREE;
    let isRendererEnabled = false;
    let isAutoUpdateEnabled = false;
    let autoUpdateEnded = true;
    let autoUpdateInterval;
    let rendererClearColor = '#000000';
    let _3DObjects = [];
    let mouseCoordinate = { x: 0, y: 0 }
    let croodinateUpdateInterval;
    let objectExist = name => _3DObjects.includes(name)
    let findObject = name => Ent3DGLRenderingHelper.scene.children.find(l => l.Ent3DName == name)
    let addObject = (name, mesh) => {_3DObjects.push(name); mesh.Ent3DName = name;Ent3DGLRenderingHelper.scene.add(mesh);}
    let removeObject = name => {
        if(!objectExist(name)) return;
        let mesh = findObject(name);
        Ent3DGLRenderingHelper.scene.remove(mesh)
        mesh.geometry?.dispose()
        mesh.material?.dispose();
        mesh = undefined;
    }
    let throwError = msg => {
        Entry.toast.alert('Ent3D 오류', msg);
        Entry.engine.toggleStop()
    }
    Ent3D._3DObjects = _3DObjects;
    Ent3D.objectExist = objectExist;
    Ent3D.findObject = findObject;
    Ent3D.addObject = addObject;
    Ent3D.removeObject = removeObject;
    Ent3DGLRenderingHelper.renderer.setClearColor(rendererClearColor);
    Ent3DGLRenderingHelper.render();
    Ent3DGLRenderingHelper.renderer.domElement.style.setProperty('display', 'none');
    Entry.addEventListener('stop', () => {
        (() => {
            if(!isAutoUpdateEnabled) return;
            isAutoUpdateEnabled = false;
            clearInterval(autoUpdateInterval);
        })();
        (() => {
            if(!isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.setProperty('display', 'none');
            document.querySelector('#entryCanvas').style.removeProperty('z-index');
            document.querySelector('#entryCanvas').style.setProperty('top', '0');
            document.querySelector('#entryCanvas').style.setProperty('position', 'relative');
            isRendererEnabled = false;
        })();
        clearInterval(croodinateUpdateInterval)
        _3DObjects.forEach(name => removeObject(name));
        _3DObjects = [];
        Ent3DGLRenderingHelper.camera.position.set(0, 0, 0);
        Ent3DGLRenderingHelper.camera.rotation.set(0, 0, 0);
    });

    croodinateUpdateInterval = setInterval(() => {
        mouseCoordinate = {
            x: ((Ent3D.realMouseCoordinate || 0).x / +getComputedStyle(entry3DCanvas).width.replace("px", "")) * 2 - 1,
            y: ((Ent3D.realMouseCoordinate || 0).y / +getComputedStyle(entry3DCanvas).height.replace("px", "")) * 2 - 1
        };
        Ent3D.mouseCoordinate = mouseCoordinate;
    }, 1000 / 60 /* 60 FPS */);

    Ent3D.Ent3DScripts = {
        Ent3D_setRendererClearColor(sprite, script) {
            rendererClearColor = script.getValue('COLOR', script);
            Ent3DGLRenderingHelper.renderer.setClearColor(rendererClearColor);
        },
        Ent3D_showRenderer() {
            if(isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.removeProperty('display');
            document.querySelector('#entryCanvas').style.setProperty('top', '32px');
            document.querySelector('#entryCanvas').style.setProperty('position', 'absolute');
            document.querySelector('#entryCanvas').style.setProperty('z-index', '-1');
            isRendererEnabled = true;
        },
        Ent3D_hideRenderer() {
            if(!isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.setProperty('display', 'none');
            document.querySelector('#entryCanvas').style.removeProperty('z-index');
            document.querySelector('#entryCanvas').style.setProperty('top', '0');
            document.querySelector('#entryCanvas').style.setProperty('position', 'relative');
            isRendererEnabled = false;
        },
        Ent3D_toggleAutoUpdate(sprite, script) {
            const type = script.getField('TOGGLE', script);
            if(type == 'enable') {
                if(isAutoUpdateEnabled) return;
                autoUpdateInterval = setInterval(() => {
                    if(!autoUpdateEnded) return;
                    (async () => {
                        autoUpdateEnded = false;
                        await Ent3DGLRenderingHelper.render();
                        autoUpdateEnded = true;
                    })();
                },1000 / 60 /* 60 FPS */);
                isAutoUpdateEnabled = true;
            } else if (type == 'disable') {
                if(!isAutoUpdateEnabled) return;
                isAutoUpdateEnabled = false;
                clearInterval(autoUpdateInterval)
            }
        },
        async Ent3D_updateScreen() {
            try {
                await Ent3DGLRenderingHelper.render();
            } catch (e) {
                console.log(e)
            }
        },
        Ent3D_rendererClearColor() {
            return rendererClearColor;
        },
        Ent3D_rendererEnabled() {
            return isRendererEnabled;
        },
        Ent3D_screenAutoUpdateEnabled() {
            return isAutoUpdateEnabled;
        },
        Ent3D_lookAtCamera(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            Ent3DGLRenderingHelper.camera.lookAt(findObject(OBJNAME).position);
        },
        Ent3D_lookAtCameraMousePointer() {
            Ent3DGLRenderingHelper.camera.lookAt(new Vector3(mouseCoordinate.x * 3, -mouseCoordinate.y * 3, 0))
        },
        Ent3D_setCameraPosition(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = +script.getValue('VALUE', script);
            if(isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.position[DIRECTION] = VALUE;
        },
        Ent3D_adjustCameraPosition(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = +script.getValue('VALUE', script);
            if(isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.position[DIRECTION] += VALUE;
        },
        Ent3D_setCameraRotation(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.rotation[DIRECTION] = Math.radians(Math.VALUE);
        },
        Ent3D_adjustCameraRotation(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.rotation[DIRECTION] += Math.radians(Math.VALUE);
        },
        Ent3D_cameraPosition(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            return Ent3DGLRenderingHelper.camera.position[DIRECTION];
        },
        Ent3D_cameraRotation(sprite, script) {
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            return Math.degrees(Ent3DGLRenderingHelper.camera.rotation[DIRECTION]);
        },
        Ent3D_createCube(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const COLOR = script.getValue('COLOR', script);
            if(objectExist(OBJNAME)) return throwError(`'${OBJNAME}'의 이름을 가진 오브젝트가 이미 존재합니다.`);
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: COLOR });
            const mesh = new THREE.Mesh(geometry, material);
            Ent3DGLRenderingHelper.scene.add(mesh);
        },
        Ent3D_deleteObject(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            removeObject(OBJNAME);
        },
        Ent3D_setObjectPosition(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            if(isNaN(VALUE)) return;
            findObject(OBJNAME).position[DIRECTION] = VALUE;
        },
        Ent3D_adjustObjectPosition(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            if(isNaN(VALUE)) return;
            findObject(OBJNAME).position[DIRECTION] = findObject(OBJNAME).position[DIRECTION] + VALUE;
        },
        Ent3D_setObjectRotation(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            if(isNaN(VALUE)) return;
            findObject(OBJNAME).rotation[DIRECTION] = VALUE;
        },
        Ent3D_adjustObjectRotation(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            const VALUE = script.getNumberValue('VALUE', script);
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            if(isNaN(VALUE)) return;
            findObject(OBJNAME).rotation[DIRECTION] = findObject(OBJNAME).rotation[DIRECTION] + VALUE;
        },
        Ent3D_objectPosition(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            return findObject(OBJNAME).position[DIRECTION];
        },
        Ent3D_objectRotation(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            const DIRECTION = script.getValue('DIRECTION', script).toLowerCase();
            if(!objectExist(OBJNAME)) return throwError(`'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`);
            return Math.degrees(findObject(OBJNAME).rotation[DIRECTION]);
        },
        Ent3D_isObjectExist(sprite, script) {
            const OBJNAME = script.getValue('OBJNAME', script);
            return objectExist(OBJNAME);
        }
    }
}