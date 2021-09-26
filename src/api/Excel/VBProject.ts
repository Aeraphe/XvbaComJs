import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { VBComponents } from "./VBComponents";

export class VBProject extends XvbaCOM {
    private _VBComponents: VBComponents;
  
    public get VBComponents(): VBComponents {
      this._VBComponents = this.GetObject(VBComponents);
      return this._VBComponents;
    }
  
    constructor(prop?: any) {
      super(prop);
    }
  }
  