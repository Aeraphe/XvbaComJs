import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
export declare class VBComponent extends XvbaCOM {
    private _Name;
    private _Type;
    get Name(): string;
    get Type(): string;
    constructor(param?: any);
    Export(compFilePath: string): any;
}
