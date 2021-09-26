import { XvbaCOM } from "../../XvbaComJs/XvbaCom";
import { VBProject } from "./VBProject";

export class WorkBook extends XvbaCOM {

  public get VBProject(): VBProject {
    return this.GetObject(VBProject);
  }

  public get Activate(): any {
    return this.GetValue("Activate");
  }

  constructor(prop?: any) {
    super(prop);
  }

  FullName = () => this.GetValue("FullName");
  

}

