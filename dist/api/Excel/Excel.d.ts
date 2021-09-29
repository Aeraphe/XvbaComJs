import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { Sheets } from "./Sheets";
import { WorkBooks } from "./WorkBooks";
export declare class Excel extends XvbaCOM {
    WorkBooks: WorkBooks;
    private _Sheets;
    get Sheets(): Sheets;
    constructor();
    Visible: () => void;
    Name: () => any;
    Quit: () => void;
}
