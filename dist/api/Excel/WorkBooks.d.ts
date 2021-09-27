import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
export declare class WorkBooks extends XvbaCOM {
    constructor();
    /**
     * Open Excel file
     * @param filePath :string
     * @returns
     */
    Open(filePath: string): any;
}
