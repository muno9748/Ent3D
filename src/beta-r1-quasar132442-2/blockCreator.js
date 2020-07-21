Entry.staticBlocks = Entry.staticBlocks.filter(l => l.category != 'Ent3D')
Entry.customCategories = Entry.customCategories.filter(l => l != 'Ent3D')

const showErrorMessage = () => entrylms.confirm({
    outerHTML: `<style>
        .Confirm-cssmodule-button-31i1a:not(.Confirm-cssmodule-cancelButton-2bdHa) {
            background-color: #5096f5 !important;
            border-radius: 9999px !important;
            border: 0 !important;
            -webkit-box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
            -moz-box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
            box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
        }

        .Confirm-cssmodule-cancelButton-2bdHa {
            display: none !important;
        }
        
        .Confirm-cssmodule-confirm-FbkMi {
            border-radius: 2rem !important;
            background-size: 10rem;
            background-repeat: no-repeat;
            background-position: bottom left;
            background-color: white;
            max-height: max-content !important;
        }
        
        .Confirm-cssmodule-title-35Vpd {
            border-radius: 2rem 2rem 0 0 !important;
            background-color: #5096f5 !important;
        }
        
        .ModalView-cssmodule-modalView-25KwR .undefined {
            border-radius: 2rem !important;
        }
        
        .button.entryLmsClose {
            display: none !important;
        }
        
        .Confirm-cssmodule-confirm-FbkMi {
            min-height: 0 !important;
        }

        a {
            color: #428bca !important;
        }
    </style>
    오류가 발생했나요?
    <br><br>현제 이 버전은 베타 버전이므로
    <br>버그가 있을수 있습니다.
    <br><br>
    오류가 발생한 경우 <a href="https://github.com/muno9748/Ent3D/issues/new?assignees=&labels=%EB%B2%84%EA%B7%B8&template=bug.md&title=[BUG]+%EC%A0%9C%EB%AA%A9%EC%9D%84+%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94" target="_blank">버그 제보</a>를 할수 있습니다.
    <br><br>
    F12를 눌러 오류 내용을 확인해주세요`,
}, 'Ent3D β-R1', {
    positiveButtonText: '확인'
});

// #region Rendering
new EntLibrary.CustomBlock('Ent3D_renderingCategoryText')
    .setTemplate('%1')
    .setSkeleton('basic_text')
    .setClass('Rendering')
    .setParams({
        data: {
            type: 'Text',
            text: 'Rendering',
            color: EntryStatic.colorSet.common.TEXT,
            class: 'bold',
            align: 'center'
        },
        def: null
    })
    .setColor('transparent', 'transparent')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setRendererClearColor')
    .setTemplate('배경 색을 %1 색으로 정하기 %2')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: "text",
            params: ["#000000"]
        },
        name: 'COLOR'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_rendering.png',
            size: 11
        },
        def: null
    })
    .setClass('Rendering')
    .setColor('#242424', '#1E1E1E', '#ffffff')
    .setSkeleton('basic')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach();


new EntLibrary.CustomBlock('Ent3D_showRenderer')
	.setTemplate('3D 화면 활성화 %1')
	.setClass('Rendering')
	.setColor('#242424', '#1E1E1E', '#ffffff')
	.setSkeleton('basic')
	.setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_rendering.png',
            size: 11
        },
        def: null
    })
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
	.attach()

new EntLibrary.CustomBlock('Ent3D_hideRenderer')
	.setTemplate('3D 화면 비활성화 %1')
	.setClass('Rendering')
	.setColor('#242424', '#1E1E1E', '#ffffff')
	.setSkeleton('basic')
	.setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_rendering.png',
            size: 11
        },
        def: null
    })
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
	.attach()

new EntLibrary.CustomBlock('Ent3D_toggleAutoUpdate')
	.setTemplate('화면 자동 업데이트 %1 %2')
	.setClass('Rendering')
	.setColor('#242424', '#1E1E1E', '#ffffff')
	.setSkeleton('basic')
	.setParams({
        data: {
            type: "Dropdown",
            options: [[
                '켜기', 'enable'
            ], [
                '끄기', 'disable'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#414141'
        },
        def: 'enable',
        name: 'TOGGLE'
	}, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_rendering.png',
            size: 11
        },
        def: null
    })
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()
    
new EntLibrary.CustomBlock('Ent3D_updateScreen')
    .setTemplate('3D 화면 업데이트 %1')
    .setClass('Rendering')
    .setColor('#242424', '#1E1E1E', '#ffffff')
    .setSkeleton('basic')
    .setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_rendering.png',
            size: 11
        },
        def: null
    })
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_rendererClearColor')
    .setTemplate('배경 색')
    .setSkeleton('basic_string_field')
    .setColor('#242424', '#1E1E1E', '#ffffff')
    .setClass('Rendering')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_rendererEnabled')
    .setTemplate('3D 화면이 켜져 있는가?')
    .setSkeleton('basic_boolean_field')
    .setClass('Rendering')
    .setColor('#242424', '#1E1E1E', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_screenAutoUpdateEnabled')
    .setTemplate('화면 자동 업데이트가 켜져 있는가?')
    .setSkeleton('basic_boolean_field')
    .setClass('Rendering')
    .setColor('#242424', '#1E1E1E', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

// #endregion

// #region Camera 
new EntLibrary.CustomBlock('Ent3D_cameraCategoryText')
    .setTemplate('%1')
    .setSkeleton('basic_text')
    .setClass('Camera')
    .setParams({
        data: {
            type: 'Text',
            text: 'Camera Controls',
            color: EntryStatic.colorSet.common.TEXT,
            class: 'bold',
            align: 'center'
        },
        def: null
    })
    .setColor('transparent', 'transparent')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_lookAtCamera')
    .setTemplate('%1 오브젝트를 바라보기 %2')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_lookAtCameraMousePointer')
    .setTemplate('마우스 포인터를 바라보기 %1')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setCameraPosition')
    .setTemplate('카메라 %1축의 좌표를 %2로 정하기 %3')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'number',
            params: ['10']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_adjustCameraPosition')
    .setTemplate('카메라 %1축의 좌표에 %2만큼 더하기 %3')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'number',
            params: ['10']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setCameraRotation')
    .setTemplate('카메라 %1축의 방향를 %2로 정하기 %3')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string',
            defaultType: 'angle'
        },
        def: {
            type: 'number',
            params: ['90']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_adjustCameraRotation')
    .setTemplate('카메라 %1축의 방향에 %2만큼 더하기 %3')
    .setSkeleton('basic')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string',
            defaultType: 'angle'
        },
        def: {
            type: 'number',
            params: ['90']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_camera.png',
            size: 11
        },
        def: null
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_cameraPosition')
    .setTemplate('카메라 %1축 좌표')
    .setSkeleton('basic_string_field')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_cameraRotation')
    .setTemplate('카메라 %1축 방향')
    .setSkeleton('basic_string_field')
    .setClass('Camera')
    .setParams({
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#FFD966'
        },
        def: 'X',
        name: 'DIRECTION'
    })
    .setColor('#FFC000', '#C09200', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

// #endregion

// #region Objects

new EntLibrary.CustomBlock('Ent3D_objectsCategoryText')
    .setTemplate('%1')
    .setSkeleton('basic_text')
    .setClass('Objects')
    .setParams({
        data: {
            type: 'Text',
            text: 'Object Configuration',
            color: EntryStatic.colorSet.common.TEXT,
            class: 'bold',
            align: 'center'
        },
        def: null
    })
    .setColor('transparent', 'transparent')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_reset')
    .setTemplate('초기화 %1')
    .setSkeleton('basic')
    .setClass('Objects')
    .setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_clearObject')
    .setTemplate('오브젝트 초기화하기 %1')
    .setSkeleton('basic')
    .setClass('Objects')
    .setParams({
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_createCube')
    .setTemplate('%1 이름의 %2색 정육면체 생성하기 %3')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_createCubeSixColor')
    .setTemplate('%1 이름의 %2, %3, %4, %5, %6, %7색 정육면체 생성하기 %8')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR1'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR2'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR3'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR4'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR5'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR6'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_deleteObject')
    .setTemplate('%1 오브젝트 삭제하기 %2')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setObjectPosition')
    .setTemplate('%1 이름의 오브젝트의 %2축 좌표를 %3으로 정하기 %4')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'number',
            params: ['10']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_adjustObjectPosition')
    .setTemplate('%1 이름의 오브젝트의 %2축 좌표에 %3만큼 더하기 %4')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'number',
            params: ['10']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setObjectRotation')
    .setTemplate('%1 이름의 오브젝트의 %2축 방향를 %3으로 정하기 %4')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string',
            defaultType: 'angle'
        },
        def: {
            type: 'number',
            params: ['90']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_adjustObjectRotation')
    .setTemplate('%1 이름의 오브젝트의 %2축 방향에 %3만큼 더하기 %4')
    .setSkeleton('basic')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    }, {
        data: {
            type: 'Block',
            accept: 'string',
            defaultType: 'angle'
        },
        def: {
            type: 'number',
            params: ['90']
        },
        name: 'VALUE'
    }, {
        data: {
            type: 'Indicator',
            img: 'https://raw.githubusercontent.com/muno9748/Ent3D/master/images/icon_objects.png',
            size: 11
        },
        def: null
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_objectPosition')
    .setTemplate('%1 오브젝트의 %2축 좌표')
    .setSkeleton('basic_string_field')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_objectRotation')
    .setTemplate('%1 오브젝트의 %2축 방향')
    .setSkeleton('basic_string_field')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    }, {
        data: {
            type: "Dropdown",
            options: [[
                'X', 'X'
            ], [
                'Y', 'Y'
            ], [
                'Z', 'Z'
            ]],
            fontSize: 10,
            arrowColor: '#ffffff',
            bgColor: '#F4AF80'
        },
        def: 'X',
        name: 'DIRECTION'
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_isObjectExist')
    .setTemplate('%1 오브젝트가 존재하는가?')
    .setSkeleton('basic_boolean_field')
    .setColor('#ED7D31', '#DB6413', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['오브젝트 이름']
        },
        name: 'OBJNAME'
    })
    .setClass('Objects')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

// #endregion

// #region Materials

new EntLibrary.CustomBlock('Ent3D_materialsCategoryText')
    .setTemplate('%1')
    .setSkeleton('basic_text')
    .setClass('Materials')
    .setParams({
        data: {
            type: 'Text',
            text: 'Materials',
            color: EntryStatic.colorSet.common.TEXT,
            class: 'bold',
            align: 'center'
        },
        def: null
    })
    .setColor('transparent', 'transparent')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_newMaterial')
    .setTemplate('새 질감')
    .setSkeleton('basic_string_field')
    .setColor('#582FEB', '#370CCF', '#ffffff')
    .setParams()
    .setClass('Materials')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

    new EntLibrary.CustomBlock('Ent3D_enableLighting')
        .setTemplate('질감 %1의 조명 효과를 활성화하기')
        .setSkeleton('basic_string_field')
        .setColor('#582FEB', '#370CCF', '#ffffff')
        .setParams({
            data: {
                type: 'Block',
                accept: 'string'
            },
            def: {
                type: 'text',
                params: ['질감']
            },
            name: 'MATERIAL'
        })
        .setClass('Materials')
        .setAction((sprite, script) => {
            try {
                if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
                return
            } catch (e) {
                console.error('[!] 오류가 발생했습니다.');
                showErrorMessage();
                throw e;
            }
        })
        .attach()

new EntLibrary.CustomBlock('Ent3D_disableLighting')
    .setTemplate('질감 %1의 조명 효과를 비활성화하기')
    .setSkeleton('basic_string_field')
    .setColor('#582FEB', '#370CCF', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['질감']
        },
        name: 'MATERIAL'
    })
    .setClass('Materials')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setMaterialColor')
    .setTemplate('질감 %1의 색상을 %2로 정하기')
    .setSkeleton('basic_string_field')
    .setColor('#582FEB', '#370CCF', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['질감']
        },
        name: 'MATERIAL'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['#ffffff']
        },
        name: 'COLOR'
    })
    .setClass('Materials')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

new EntLibrary.CustomBlock('Ent3D_setMaterialTexture')
    .setTemplate('질감 %1의 텍스쳐를 %2로 정하기')
    .setSkeleton('basic_string_field')
    .setColor('#582FEB', '#370CCF', '#ffffff')
    .setParams({
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['질감']
        },
        name: 'MATERIAL'
    }, {
        data: {
            type: 'Block',
            accept: 'string'
        },
        def: {
            type: 'text',
            params: ['https://playentry.org/lib/entry-js/images/media/entrybot1.png']
        },
        name: 'TEXTURE'
    })
    .setClass('Materials')
    .setAction((sprite, script) => {
        try {
            if(window.Ent3D.Ent3DScripts && window.Ent3D.Ent3DScripts[script.type]) return window.Ent3D.Ent3DScripts[script.type](sprite, script)
            return
        } catch (e) {
            console.error('[!] 오류가 발생했습니다.');
            showErrorMessage();
            throw e;
        }
    })
    .attach()

// #endregion





new EntLibrary.CustomCategory('Ent3D')
    .addBlock(...([].concat([
        /* Rendering Category */
		'Ent3D_renderingCategoryText', 
		'Ent3D_setRendererClearColor', 
		'Ent3D_showRenderer', 
		'Ent3D_hideRenderer',
        'Ent3D_toggleAutoUpdate',
        'Ent3D_updateScreen',
        'Ent3D_rendererClearColor',
        'Ent3D_rendererEnabled',
        'Ent3D_screenAutoUpdateEnabled',
	]).concat([
        /* Camera Category */
        'Ent3D_cameraCategoryText',
        'Ent3D_lookAtCamera',
        'Ent3D_lookAtCameraMousePointer',
        'Ent3D_setCameraPosition',
        'Ent3D_adjustCameraPosition',
        'Ent3D_setCameraRotation',
        'Ent3D_adjustCameraRotation',
        'Ent3D_cameraPosition',
        'Ent3D_cameraRotation',
	]).concat([
        /* Objects Category */
        'Ent3D_objectsCategoryText',
        'Ent3D_reset',
        'Ent3D_clearObject',
        'Ent3D_createCube',
        'Ent3D_createCubeSixColor',
        'Ent3D_deleteObject',
        'Ent3D_setObjectPosition',
        'Ent3D_adjustObjectPosition',
        'Ent3D_setObjectRotation',
        'Ent3D_adjustObjectRotation',
        'Ent3D_objectPosition',
        'Ent3D_objectRotation',
        'Ent3D_isObjectExist'
    ]).concat([
        /* Materials Category */
        'Ent3D_materialsCategoryText',
        'Ent3D_newMaterial',
        'Ent3D_enableLighting',
        'Ent3D_disableLighting',
        'Ent3D_setMaterialColor',
        'Ent3D_setMaterialTexture'
    ]).concat([
        /* Animating Category */
    ]).concat([
        /* Physics Category */
    ]).concat([
        /* Controls Category */
    ])))
    .setBackground('off', 'transparent', 'https://cdn.jsdelivr.net/gh/muno9748/Ent3D@latest/images/back_off.png')
    .setBackground('on', '#6495ed', 'https://cdn.jsdelivr.net/gh/muno9748/Ent3D@latest/images/back_on.png')
    .setText('Ent3D')
    .mutate()

{
    document.querySelector('.entryCategoryEnt3DStyle')?.remove();
    const categoryStyle = document.createElement('style')

    categoryStyle.innerText = `
    #entryCategoryEnt3D {
        background-size: 30px !important;
        background-position-y: 1px !important;
    }
    `.trim();

    categoryStyle.classList.add('entryCategoryEnt3DStyle');

    document.head.appendChild(categoryStyle);
}

entrylms.confirm({
    outerHTML: `<style>
        .Confirm-cssmodule-button-31i1a:not(.Confirm-cssmodule-cancelButton-2bdHa) {
            background-color: #5096f5 !important;
            border-radius: 9999px !important;
            border: 0 !important;
            -webkit-box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
            -moz-box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
            box-shadow: 10px 10px 120px -18px rgba(80,150,245,0.54);
        }.Confirm-cssmodule-cancelButton-2bdHa{display: none !important;}
        
        .Confirm-cssmodule-confirm-FbkMi {
            border-radius: 2rem !important;
            background-size: 10rem;
            background-repeat: no-repeat;
            background-position: bottom left;
            background-color: white;
        }
        
        .Confirm-cssmodule-title-35Vpd {
            border-radius: 2rem 2rem 0 0 !important;
            background-color: #5096f5 !important;
        }
        
        .ModalView-cssmodule-modalView-25KwR .undefined {
            border-radius: 2rem !important;
        }
        
        .button.entryLmsClose {
            display: none !important;
        }
        
        .Confirm-cssmodule-confirm-FbkMi{
            min-height: 0 !important;
        }
        
        a {
            color: #428bca !important;
        }
    </style>
    Ent3D ver. β-R1이 성공적으로 로드되었습니다.
    
    <br><br>사용법은 엔트리 커뮤니티
    <br><a href="https://playentry.org/ds#!/tips">노하우&팁</a> 게시판에서 확인하세요.`,
}, 'Ent3D β-R1', {
    positiveButtonText: '확인'
})

document.querySelector('#entryCategorystart')?.click()