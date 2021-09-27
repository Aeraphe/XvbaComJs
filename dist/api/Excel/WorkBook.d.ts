import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { VBProject } from "./VBProject";
export declare class WorkBook extends XvbaCOM {
    private _VBProject;
    get VBProject(): VBProject;
    set VBProject(ss: any);
    get Activate(): any;
    constructor(prop?: any);
    FullName: () => any;
}
