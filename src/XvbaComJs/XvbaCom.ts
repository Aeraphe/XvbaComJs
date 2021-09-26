import { Unknow } from "./UnKnow";
import * as ref from "ref-napi";
import { ApiOl32 } from "../api/Ol32/api";


export abstract class XvbaCOM extends Unknow {
  constructor(application?: string) {
    super(application);
  }

  protected Call(propToCall: string, param: any = "") {
    const pPropToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");
    const pParamPtr: any = Buffer.from(param + "\0", "ucs2");
    let responsePtr: any = ref.alloc(ref.types.uint32);

    let type = 0;
    if (param !== undefined && param !== "") {
      typeof param == "number" ? (type = 1) : (type = 0);
    } else {
      param = ref.NULL;
    }
    let valuePtr: any = "";
    if (type === 0) {
      valuePtr = ref.alloc(ref.types.CString);
    } else {
      valuePtr = ref.alloc(ref.types.uint32);
    }
    const HRESULT = ApiOl32.XvbaCall(
      pPropToCallPtr,
      this.gui.pointer,
      pParamPtr,
      responsePtr,
      valuePtr,
      type
    );
    console.log(HRESULT);
    return { objectPtr: responsePtr, value: valuePtr };
  }

  protected GetObject(XvbaCom: any) {
    const { objectPtr } = this.Call(XvbaCom.name, "");
    return new XvbaCom(objectPtr);
  }

  protected GetValue(prop: string) {
    const { value } = this.Call(prop, "");
    return value.deref();
  }

  protected SetVal(propToCall: string, param: any = "") {
    const pPropToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");
    const pParamPtr: any = Buffer.from(param + "\0", "ucs2");
    let type = 0;
    if (param !== undefined && param !== "") {
      typeof param == "number" ? (type = 1) : (type = 0);
    } else {
      param = ref.NULL;
    }

    const HRESULT = ApiOl32.XvbaSetVal(
      pPropToCallPtr,
      this.gui.pointer,
      pParamPtr,
      type
    );
    console.log(HRESULT);
  }
}
