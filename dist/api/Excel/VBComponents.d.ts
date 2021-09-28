import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { VBComponent } from "./VBComponent";
export declare class VBComponents extends XvbaCOM {
    private _Count;
    get Count(): any;
    constructor(prop?: any);
    Item(value: number): VBComponent;
}
