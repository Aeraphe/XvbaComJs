import { XvbaCOM } from "../../XvbaCom/XvbaCom";
import { WorkBook } from "./WorkBook";

export class WorkBooks extends XvbaCOM {
    private WorkBook: WorkBook;
  
    constructor() {
      super();
    }
  
    Open(filePath: string) {
      console.log("Open")
      const resp = this.Invoke("Open", filePath);
      this.WorkBook.gui.pointer = resp.method;
      return this.WorkBook;
    }
    
  }