import { XvbaCOM } from "../../XvbaComJs/XvbaCom";

export class VBComponents extends XvbaCOM {
    private _Count: any;
  
    public get Count(): any {
      this._Count = this.GetNumbValue("Count");
      return this._Count;
    }
  
    constructor(prop?: any) {
      super(prop);
    }
  }
  