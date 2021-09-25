import { XvbaCOM } from "../../XvbaCom/XvbaCom";
import { ApiOl32 } from "../Ol32/api";
import { WorkBooks } from "./WorkBooks";


export class Excel extends XvbaCOM {
  public WorkBooks: WorkBooks;

  constructor() {
    super("Excel.Application");
    this.WorkBooks = new WorkBooks();
  }

  Display() {
    ApiOl32.XvbaShowApplication(this.gui.pointer);
  }
}




