import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { WorkBooks } from "./WorkBooks";
export declare class Excel extends XvbaCOM {
    WorkBooks: WorkBooks;
    constructor();
    Visible(): void;
}
