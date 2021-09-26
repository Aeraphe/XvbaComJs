import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { WorkBooks } from "./WorkBooks";


export class Excel extends XvbaCOM {
  public WorkBooks: WorkBooks;

  constructor() {
    super("Excel.Application");
    this.WorkBooks = new WorkBooks();
  }

  Visible() {
    console.log("Visible");
    this.SetVal("Visible",1);
  }
}




