import { Ent3D, glRenderer as Ent3DGLRenderingHelper } from '../blockScriptRegister';

Object.defineProperty(window, "Ent3DGLRenderingHelper", {
    value: Ent3D.glRenderer,
});

{
    let shapeToURL = shape => {
        return (typeof shape?.fileurl === 'string') ?
               `https://playentry.org${shape.fileurl}`
             : `https://playentry.org/uploads/${shape.filename.substr(0,2)}/${shape.filename.substr(2,2)}/thumb/${shape.filename}.png`
    }
    const MATERIALS = {
        BASIC: 0,
        LAMBERT: 1,
        PHONG: 2,
        STANDARD: 3,
    }
    const MATERIAL_CONSTRUCTORS = [
        THREE.MeshBasicMaterial,
        THREE.MeshLambertMaterial,
        THREE.MeshPhoneMaterial,
        THREE.MeshStandardMaterial
    ]
    let urlTextures = {};
    const MATERIAL_REGEXP = {
        COLOR: /^#(?:(?:[0-9a-fA-F]){3}){1,2}$/,
        TEXTURE_URL: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
    };
    const POINTER_REGEXP = /^@((?:[0-9a-fA-F])+)$/
    const NULLPTR = '@-1'
    let virtualMemory = [ null ]
    let referencePointer = pointer => {
        if (pointer === NULLPTR)
            return null
        return virtualMemory[parseInt(POINTER_REGEXP.exec(pointer)[1], 16)]
    }
    let getPointer = object =>
        `@${virtualMemory.indexOf(object).toString(16)}`
    let malloc = object => {
        let index = virtualMemory.indexOf(null)
        if (index === virtualMemory.length-1)
            virtualMemory.push(null)
        virtualMemory[index] = object
        return getPointer(object)
    }
    let free = pointer => {
        if (pointer === NULLPTR)
            return
        virtualMemory[parseInt(POINTER_REGEXP.exec(pointer)[1], 16)] = null
    }
    let freeAll = () => {
        virtualMemory = [ null ]
    }
    class MaterialConfig {
        constructor () {
            this.enableLighting = true
            this.enableSpecularHighlighting = false
            this.enablePBR = false
            this.color = '#fff'
            this.texture = null
            this.normalmap = null
            this.displacementmap = null
            this.shininess = 0.25
        }
        enableLighting () {
            this.enableLighting = true
            return this
        }
        disableLighting () {
            this.enableLighting = false
            return this
        }
        enableSpecularHighlighting () {
            this.enableSpecularHighlighting = true
            return this
        }
        disableSpecularHighlighting () {
            this.enableSpecularHighlighting = false
            return this
        }
        enablePBR () {
            this.enablePBR = true
            return this
        }
        disablePBR () {
            this.enablePBR = false
            return this
        }
        setColor (color) {
            if (typeof color === "string" && MATERIAL_REGEXP.COLOR.test(color))
                this.color = color
            return this
        }
        setTexture (texture, sprite, repeat=0) {
            if (repeat>1) return this
            if (typeof texture === "string" && MATERIAL_REGEXP.TEXTURE_URL.test(texture)) {
                if (urlTextures[texture])
                    this.texture = urlTextures[texture]
                else {
                    urlTextures[texture] = new THREE.TextureLoader().load(texture)
                    urlTextures[texture].warpS = THREE.RepeatWrapping
                    urlTextures[texture].warpT = THREE.RepeatWrapping
                    this.texture = urlTextures[texture]
                }
            } else if (typeof texture === 'string') {
                let url = shapeToURL(sprite?.parent?.pictures?.filter?.(v => v?.id === texture)?.[0])
                if (!url) return this
                return this.setTexture(url, sprite, repeat+1)
            } else if (typeof texture === "object" && texture instanceof THREE.Texture) {
                this.texture = texture
            }
            return this
        }
        setNormalmap (normalmap, sprite, repeat=0) {
            if (repeat>1) return this
            if (typeof normalmap === "string" && MATERIAL_REGEXP.TEXTURE_URL.test(normalmap)) {
                if (urlTextures[normalmap])
                    this.normalmap = urlTextures[normalmap]
                else {
                    urlTextures[normalmap] = new THREE.TextureLoader().load(normalmap)
                    urlTextures[normalmap].warpS = THREE.RepeatWrapping
                    urlTextures[normalmap].warpT = THREE.RepeatWrapping
                    this.normalmap = urlTextures[normalmap]
                }
            } else if (typeof normalmap === 'string') {
                let url = shapeToURL(sprite?.parent?.pictures?.filter?.(v => v?.id === normalmap)?.[0])
                if (!url) return this
                return this.setNormalmap(url, sprite, repeat+1)
            } else if (typeof normalmap === "object" && normalmap instanceof THREE.Texture) {
                this.normalmap = normalmap
            }
            return this
        }
        setDisplacementmap (displacementmap, sprite, repeat=0) {
            if (repeat>1) return this
            if (typeof displacementmap === "string" && MATERIAL_REGEXP.TEXTURE_URL.test(displacementmap)) {
                if (urlTextures[displacementmap])
                    this.displacementmap = urlTextures[displacementmap]
                else {
                    urlTextures[displacementmap] = new THREE.TextureLoader().load(displacementmap)
                    urlTextures[displacementmap].warpS = THREE.RepeatWrapping
                    urlTextures[displacementmap].warpT = THREE.RepeatWrapping
                    this.displacementmap = urlTextures[displacementmap]
                }
            } else if (typeof displacementmap === 'string') {
                let url = shapeToURL(sprite?.parent?.pictures?.filter?.(v => v?.id === displacementmap)?.[0])
                if (!url) return this
                return this.setDisplacementmap(url, sprite, repeat+1)
            } else if (typeof displacementmap === "object" && displacementmap instanceof THREE.Texture) {
                this.displacementmap = displacementmap
            }
            return this
        }
        setShininess (shininess) {
            this.shininess = shininess
            return this
        }
        toMaterial () {
            let materialType
            let materialConfig = {}
            if (this.enablePBR) materialType = MATERIALS.STANDARD
            else if (this.enableSpecularHighlighting) materialType = MATERIALS.PHONG
            else if (this.enableLighting) materialType = MATERIALS.LAMBERT
            else materialType = MATERIALS.BASIC
            switch (materialType) {
                case MATERIALS.BASIC:
                    materialConfig = {
                        color: this.color,
                        map: this.texture,
                    }
                    break
                case MATERIALS.LAMBERT:
                    materialConfig = {
                        color: this.color,
                        map: this.texture,
                    }
                    break
                case MATERIALS.PHONG:
                    materialConfig = {
                        color: this.color,
                        map: this.texture,
                        normalmap: this.normalmap,
                        displacementmap: this.displacementmap,
                        shininess: this.shininess*128,
                    }
                    break
                case MATERIALS.STANDARD:
                    materialConfig = {
                        color: this.color,
                        map: this.texture,
                        normalmap: this.normalmap,
                        displacementmap: this.displacementmap,
                        roughness: 1-this.shininess,
                    }
                    break
            }
            return new MATERIAL_CONSTRUCTORS[materialType](materialConfig)
        }
    }
    let loadMaterial = (material, sprite, repeat=0) => {
        if (repeat>1) return new THREE.MeshBasicMaterial({ color: '#ffffff' })
        if (typeof material === "string") {
            if (MATERIAL_REGEXP.COLOR.test(material))
                return new THREE.MeshBasicMaterial({ color: material });
            if (MATERIAL_REGEXP.TEXTURE_URL.test(material)) {
                if (urlTextures[material])
                    return new THREE.MeshBasicMaterial({
                        map: urlTextures[material],
                    });
                else {
                    urlTextures[material] = new THREE.TextureLoader().load(material)
                    console.log(material)
                    urlTextures[material].warpS = THREE.RepeatWrapping
                    urlTextures[material].warpT = THREE.RepeatWrapping
                    return new THREE.MeshBasicMaterial({
                        map: urlTextures[material],
                    });
                }
            } else {
                let url = shapeToURL(sprite?.parent?.pictures?.filter?.(v => v?.id === material)?.[0])
                if (!url) return new THREE.MeshBasicMaterial({ color: '#ffffff' })
                return loadMaterial(url, sprite, repeat+1)
            }
        } else if (typeof material === 'object') {
            if (material instanceof THREE.Material) {
                return material
            }
            if (material instanceof MaterialConfig) {
                return material.toMaterial()
            }
        }
    };
    let angleNormalization = (angle) => angle - 360 * Math.floor(angle / 360);

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener(
        "mousemove",
        (e) => {
            var a = document.createEvent("MouseEvent");
            a.initMouseEvent(
                "mousemove",
                true /* bubble */,
                true /* cancelable */,
                window,
                0,
                0,
                0,
                e.pageX,
                e.pageY /* coordinates */,
                false,
                false,
                false,
                false /* modifier keys */,
                0 /*left*/,
                null
            );
            entryCanvas.dispatchEvent(a);
        }
    );

    document.addEventListener("mousemove", (e) => {
        Ent3D.realMouseCoordinate = { x: e.pageX, y: e.pageY };
    });

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener(
        "mousedown",
        (e) => {
            var a = document.createEvent("MouseEvent");
            a.initMouseEvent(
                "mousedown",
                true /* bubble */,
                true /* cancelable */,
                window,
                0,
                0,
                0,
                e.pageX,
                e.pageY /* coordinates */,
                false,
                false,
                false,
                false /* modifier keys */,
                0 /*left*/,
                null
            );
            entryCanvas.dispatchEvent(a);
        }
    );

    Ent3DGLRenderingHelper.renderer.domElement.addEventListener(
        "mouseup",
        (e) => {
            var a = document.createEvent("MouseEvent");
            a.initMouseEvent(
                "mouseup",
                true /* bubble */,
                true /* cancelable */,
                window,
                0,
                0,
                0,
                e.pageX,
                e.pageY /* coordinates */,
                false,
                false,
                false,
                false /* modifier keys */,
                0 /*left*/,
                null
            );
            entryCanvas.dispatchEvent(a);
        }
    );

    const { Vector3 } = THREE;
    let isRendererEnabled = false;
    let isAutoUpdateEnabled = false;
    let autoUpdateEnded = true;
    let autoUpdateInterval;
    let rendererClearColor = "#000000";
    let _3DObjects = [];
    let mouseCoordinate = { x: 0, y: 0 };
    let croodinateUpdateInterval;
    let objectExist = (name) => _3DObjects.includes(name);
    let findObject = (name) =>
        Ent3DGLRenderingHelper.scene.children.find((l) => l.Ent3DName == name);
    let addObject = (name, mesh) => {
        _3DObjects.push(name);
        mesh.Ent3DName = name;
        Ent3DGLRenderingHelper.scene.add(mesh);
    };
    let removeObject = (name) => {
        if (!objectExist(name)) return;
        let mesh = findObject(name);
        Ent3DGLRenderingHelper.scene.remove(mesh);
        mesh.geometry?.dispose();
        mesh.material?.dispose();
        mesh = undefined;
    };
    let clearObject = () => {
        _3DObjects = [];
        while (Ent3DGLRenderingHelper.scene.children.length) {
            Ent3DGLRenderingHelper.scene.remove(
                Ent3DGLRenderingHelper.scene.children[0]
            );
        }
    };
    let throwError = (msg) => {
        Entry.toast.alert("Ent3D 오류", msg);
        Entry.engine.toggleStop();
    };
    Ent3D._3DObjects = _3DObjects;
    Ent3D.objectExist = objectExist;
    Ent3D.findObject = findObject;
    Ent3D.addObject = addObject;
    Ent3D.removeObject = removeObject;
    Ent3DGLRenderingHelper.renderer.setClearColor(rendererClearColor);
    Ent3DGLRenderingHelper.render();
    Ent3DGLRenderingHelper.renderer.domElement.style.setProperty(
        "display",
        "none"
    );
    Entry.addEventListener("stop", () => {
        (() => {
            if (!isAutoUpdateEnabled) return;
            isAutoUpdateEnabled = false;
            clearInterval(autoUpdateInterval);
        })();
        (() => {
            if (!isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.setProperty(
                "display",
                "none"
            );
            document
                .querySelector("#entryCanvas")
                .style.removeProperty("z-index");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("top", "0");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("position", "relative");
            isRendererEnabled = false;
        })();
        clearInterval(croodinateUpdateInterval);
        _3DObjects.forEach((name) => removeObject(name));
        _3DObjects = [];
        Ent3DGLRenderingHelper.camera.position.set(0, 0, 0);
        Ent3DGLRenderingHelper.camera.rotation.set(0, 0, 0);
    });

    Entry.addEventListener("run", () => {
        croodinateUpdateInterval = setInterval(() => {
            mouseCoordinate = {
                x:
                    ((Ent3D.realMouseCoordinate || 0).x /
                        +getComputedStyle(entry3DCanvas).width.replace(
                            "px",
                            ""
                        )) *
                        2 -
                    1,
                y:
                    ((Ent3D.realMouseCoordinate || 0).y /
                        +getComputedStyle(entry3DCanvas).height.replace(
                            "px",
                            ""
                        )) *
                        2 -
                    1,
            };
            Ent3D.mouseCoordinate = mouseCoordinate;
        }, 1000 / 60 /* 60 FPS */);
    });

    Ent3D.Ent3DScripts = {
        Ent3D_setRendererClearColor(sprite, script) {
            rendererClearColor = script.getValue("COLOR", script);
            Ent3DGLRenderingHelper.renderer.setClearColor(rendererClearColor);
        },
        Ent3D_showRenderer() {
            if (isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.removeProperty(
                "display"
            );
            document
                .querySelector("#entryCanvas")
                .style.setProperty("top", "32px");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("position", "absolute");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("z-index", "-1");
            isRendererEnabled = true;
        },
        Ent3D_hideRenderer() {
            if (!isRendererEnabled) return;
            Ent3DGLRenderingHelper.renderer.domElement.style.setProperty(
                "display",
                "none"
            );
            document
                .querySelector("#entryCanvas")
                .style.removeProperty("z-index");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("top", "0");
            document
                .querySelector("#entryCanvas")
                .style.setProperty("position", "relative");
            isRendererEnabled = false;
        },
        Ent3D_toggleAutoUpdate(sprite, script) {
            const type = script.getField("TOGGLE", script);
            if (type == "enable") {
                if (isAutoUpdateEnabled) return;
                autoUpdateInterval = setInterval(() => {
                    if (!autoUpdateEnded) return;
                    (async () => {
                        autoUpdateEnded = false;
                        await Ent3DGLRenderingHelper.render();
                        autoUpdateEnded = true;
                    })();
                }, 1000 / 60 /* 60 FPS */);
                isAutoUpdateEnabled = true;
            } else if (type == "disable") {
                if (!isAutoUpdateEnabled) return;
                isAutoUpdateEnabled = false;
                clearInterval(autoUpdateInterval);
            }
        },
        async Ent3D_updateScreen() {
            try {
                await Ent3DGLRenderingHelper.render();
            } catch (e) {
                console.log(e);
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
            const OBJNAME = script.getValue("OBJNAME", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            Ent3DGLRenderingHelper.camera.lookAt(findObject(OBJNAME).position);
        },
        Ent3D_lookAtCameraMousePointer() {
            Ent3DGLRenderingHelper.camera.lookAt(
                new Vector3(
                    mouseCoordinate.x * 3,
                    -(mouseCoordinate.y - 1) * 3,
                    0
                )
            );
        },
        Ent3D_setCameraPosition(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = +script.getValue("VALUE", script);
            if (isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.position[DIRECTION] = VALUE;
        },
        Ent3D_adjustCameraPosition(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = +script.getValue("VALUE", script);
            if (isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.position[DIRECTION] += VALUE;
        },
        Ent3D_setCameraRotation(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.rotation[DIRECTION] = Math.radians(
                angleNormalization(VALUE)
            );
        },
        Ent3D_adjustCameraRotation(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (isNaN(VALUE)) return;
            Ent3DGLRenderingHelper.camera.rotation[DIRECTION] += Math.radians(
                angleNormalization(VALUE)
            );
        },
        Ent3D_cameraPosition(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            return Ent3DGLRenderingHelper.camera.position[DIRECTION];
        },
        Ent3D_cameraRotation(sprite, script) {
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            return Math.degrees(
                Ent3DGLRenderingHelper.camera.rotation[DIRECTION]
            );
        },
        Ent3D_clearObject(sprite, script) {
            clearObject();
        },
        Ent3D_createCube(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const COLOR_PTR = script.getValue("COLOR", script);
            if (objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}'의 이름을 가진 오브젝트가 이미 존재합니다.`
                );
            const COLOR = POINTER_REGEXP.test(COLOR_PTR) ?
                          referencePointer(COLOR_PTR)
                        : COLOR_PTR
            const geometry = new THREE.BoxGeometry();
            const material = loadMaterial(COLOR, sprite);
            const mesh = new THREE.Mesh(geometry, material);
            addObject(OBJNAME, mesh);
        },
        Ent3D_createCubeSixColor(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const COLOR_PTRS = new Array(6)
                .fill(0)
                .map((_, index) => script.getValue(`COLOR${index}`, script));
            if (objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}'의 이름을 가진 오브젝트가 이미 존재합니다.`
                );
            const geometry = new THREE.BoxGeometry();
            const materials = new Array(6)
                .fill(0)
                .map(
                    (_, index) =>
                    loadMaterial((POINTER_REGEXP.test(COLOR_PTRS[index]) ?
                                  referencePointer(COLOR_PTRS[index])
                                : COLOR_PTRS[index]), sprite)
                );
            const material = new THREE.MeshFaceMaterial(materials);
            const mesh = new THREE.Mesh(geometry, material);
            addObject(OBJNAME, mesh);
        },
        Ent3D_deleteObject(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            removeObject(OBJNAME);
        },
        Ent3D_setObjectPosition(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            if (isNaN(VALUE)) return;
            findObject(OBJNAME).position[DIRECTION] = VALUE;
        },
        Ent3D_adjustObjectPosition(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            if (isNaN(VALUE)) return;
            findObject(OBJNAME).position[DIRECTION] =
                findObject(OBJNAME).position[DIRECTION] + VALUE;
        },
        Ent3D_setObjectRotation(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            if (isNaN(VALUE)) return;
            findObject(OBJNAME).rotation[DIRECTION] = Math.radians(
                angleNormalization(VALUE)
            );
        },
        Ent3D_adjustObjectRotation(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            const VALUE = script.getNumberValue("VALUE", script);
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            if (isNaN(VALUE)) return;
            findObject(OBJNAME).rotation[DIRECTION] =
                findObject(OBJNAME).rotation[DIRECTION] +
                Math.radians(angleNormalization(VALUE));
        },
        Ent3D_objectPosition(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            return findObject(OBJNAME).position[DIRECTION];
        },
        Ent3D_objectRotation(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            const DIRECTION = script
                .getValue("DIRECTION", script)
                .toLowerCase();
            if (!objectExist(OBJNAME))
                return throwError(
                    `'${OBJNAME}' 이름의 오브젝트를 찾을수 없습니다.`
                );
            return Math.degrees(findObject(OBJNAME).rotation[DIRECTION]);
        },
        Ent3D_isObjectExist(sprite, script) {
            const OBJNAME = script.getValue("OBJNAME", script);
            return objectExist(OBJNAME);
        },
        Ent3D_newMaterial(sprite, script) {
            let material = malloc(new MaterialConfig())
            return material;
        },
        Ent3D_enableLighting(sprite, script) {
            const MATERIAL = referencePointer(script.getValue("MATERIAL", script));
            return getPointer(MATERIAL.enableLighting());
        },
        Ent3D_disableLighting(sprite, script) {
            const MATERIAL = referencePointer(script.getValue("MATERIAL", script));
            return getPointer(MATERIAL.disableLighting());
        },
        Ent3D_setMaterialColor(sprite, script) {
            const MATERIAL = referencePointer(script.getValue("MATERIAL", script));
            const COLOR = script.getValue("COLOR", script);
            return getPointer(MATERIAL.setColor(COLOR));
        },
        Ent3D_setMaterialTexture(sprite, script) {
            const MATERIAL = referencePointer(script.getValue("MATERIAL", script));
            const TEXTURE = script.getValue("TEXTURE", script);
            return getPointer(MATERIAL.setTexture(TEXTURE, sprite));
        },
        Ent3D_reset(sprite, script) {
            clearObject()
            freeAll()
            Ent3DGLRenderingHelper.renderer.setClearColor('#000')
            Ent3DGLRenderingHelper.camera.position.set(0, 0, 0);
            Ent3DGLRenderingHelper.camera.rotation.set(0, 0, 0);
        },
    };
}
