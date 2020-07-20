type Color = string;
type URL = string;
type Skeleton = 'basic' | 'basic_create' | 'basic_event' | 'basic_loop' | 'basic_define' | 'pebble_event' | 'pebble_loop' | 'pebble_basic' | 'basic_string_field' | 'basic_boolean_field' | 'basic_param' | 'basic_button' | 'basic_without_next' | 'basic_double_loop';

interface ICustomBlockParam {
    data: Param;
    def: ParamDef;
    name?: string;
}

interface ITextParam {
    type: "Block";
    accept: "string" | "boolean" | "param";
}

interface IDropdownParam {
    type: "Dropdown";
    options: string[][];
    fontSize?: number;
    arrowColor?: Color;
}

interface IIndicatorParam {
    type: "Indicator";
    img: URL;
    size?: number;
}

type ParamDef = {
    type: "number" | "text",
    params: string[]
} | string | null;
type Param = ITextParam | IDropdownParam | IIndicatorParam;

class CustomBlock {
    constructor(type: string)

    type: string;
    meta_: {
        color: Color,
        fontColor: Color,
        outerLine: Color,
        skeleton: Skeleton,
        statement: any[],
        params: Param[],
        events: { [key: string]: Function[] },
        def: {
            params: ParamDef[],
            type: string
        },
        paramsKeyMap: { [key: string]: number },
        class: string,
        func: Function,
        template: string
    }

    setTemplate(template: string): CustomBlock;
    setColor(_default?: Color, darken?: Color, text?: Color): CustomBlock;
    setSkeleton(type: Skeleton): CustomBlock;
    setParams(...params: ICustomBlockParam[]): CustomBlock;
    addEvent(name: string, event: Function): CustomBlock;
    setClass(classname: string): CustomBlock;
    setAction(func: Function): CustomBlock;
    attach(): CustomBlock;
    mutate(): CustomBlock;
}

type BackgroundType = 'on' | 'off';

class CustomCategory {
    constructor(name?: string)

    addBlock(...blockType: string[]): CustomCategory;
    setText(text: string): CustomCategory;
    setBackground(type: BackgroundType, color: Color, image: URL): CustomCategory;
    mutate(): CustomCategory;
}

export { CustomBlock, CustomCategory }
export const addBlockToDefaultCategory: (category: string, ...blocks: string[]) => { mutate: Function };

export as namespace EntLibrary;