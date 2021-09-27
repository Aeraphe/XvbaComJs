import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { VBComponents } from "./VBComponents";
export declare class VBProject extends XvbaCOM {
    private _VBComponents;
    get VBComponents(): VBComponents;
    constructor(prop?: any);
}
