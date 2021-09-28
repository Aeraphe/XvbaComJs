import { XvbaCOM } from "../../XvbaComJs/XvbaCom";

export class VBComponent extends XvbaCOM {
  private _Name: string;

  private _Type: string;

  public get Name(): string {
    if (this._Name == undefined) {
      this._Name = this.GetStrValue("Name");
    }
    return this._Name;
  }

  public get Type(): string {
    if (this._Type == undefined) {
      this._Type = this.GetStrValue("Type");
    }
    return this._Type;
  }

  constructor(param?: any) {
    super(param);
  }


  Export(compFilePath:string){
      return this.CallMethodToGetNumber("Export",compFilePath)
  }

}
