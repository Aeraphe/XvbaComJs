import { XvbaCOM } from "../../XvbaCom/XvbaCom";

export class WorkBook extends XvbaCOM {

    constructor(prop?:any) {
      super(prop);
    }
  
    Name() {
      console.log("GetName")
      const resp = this.Invoke("Name", "");
      return resp.value.deref();
    }
  }
  