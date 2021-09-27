import { XvbaCOM } from "../../XvbaComJs/XvbaCom";


export class Sheets extends XvbaCOM {

    constructor(param?:any) {
      super(param);
    }
  
    Count(){
      return this.GetNumbValue("Count");
    }
  }
  