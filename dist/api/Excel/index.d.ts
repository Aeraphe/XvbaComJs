import { XvbaCOM } from "../../XvbaCom/XvbaCom";
import { WorkBooks } from "./WorkBooks";
export declare class Excel extends XvbaCOM {
    WorkBooks: WorkBooks;
    constructor();
    Visible(): void;
}
