```typescript
// from 'beta-r1-quasar132442-1'

// added function
loadMaterial(material: any): THREE.Material

// added constant
const MATERIALS = {
    BASIC: 0,
    LAMBERT: 1,
    PHONG: 2,
    STANDARD: 3,
}

// added constant
const MATERIAL_CONSTRUCTORS = [
    THREE.MeshBasicMaterial,
    THREE.MeshLambertMaterial,
    THREE.MeshPhoneMaterial,
    THREE.MeshStandardMaterial
]

// added class
new MaterialConfig()

// added blocks
'Ent3D_newMaterial'
'Ent3D_enableLighting'
'Ent3D_disableLighting'
'Ent3D_setMaterialColor'
'Ent3D_setMaterialTexture'
'Ent3D_reset'

// added functions
referencePointer(pointer: string): Object
getPointer(object: Object): string
malloc(object: Object): string
free(pointer: string): void
freeAll(): void

// and more
```