import * as ref from "ref-napi";
import { ApiOl32 } from "../api/Ol32/api";

export const propType = {
  PROPERTY_GET: 0x2,
  METHOD: 0x1,
  PROPERTY_PUT: 0x4,
  PROPERTY_PUTREF: 0x8,
};

let lastComCreate: any;

interface IGui {
  pointer: any;
  type: any;
  name: string;
}

let GUIList: Array<IGui> = [];

export abstract class Unknow {
  gui: IGui = { pointer: null, type: null, name: "" };
  protected application = "";

  constructor(prop?: any) {
    this.CreateObject(prop);
  }

  private CreateObject(prop?: any) {
    GUIList.push(this.gui);
    this.gui.type = propType.METHOD;
    this.gui.name = this.constructor.name;

    if (prop !== undefined && typeof prop === "string") {
      this.application = prop || this.application;
    } else if (prop !== undefined && typeof prop !== "string") {
      this.gui.pointer = prop;

      return;
    }

    if (lastComCreate === undefined) {
      this.CreateTheFirstCom();
    } else {
      this.InitializeMethods();
    }
  }

  private CreateTheFirstCom = () => {
    const ProgID: any = Buffer.from(this.application + "\0", "ucs2");
    let responsePtr: any = ref.alloc(ref.types.uint32);
    const HRESULT = ApiOl32.XvbaCoCreateInstance(ProgID, responsePtr);
    this.gui.pointer = responsePtr;
    lastComCreate = responsePtr;
    console.log(HRESULT);
  };

  private InitializeMethods() {
    const classNamePtr: any = Buffer.from("WorkBooks" + "\0", "ucs2");
    let responsePtr: any = ref.alloc(ref.types.uint32);
    const HRESULT = ApiOl32.XvbaGetMethod(
      lastComCreate,
      responsePtr,
      classNamePtr
    );
    this.gui.pointer = responsePtr;
    lastComCreate = responsePtr;
    console.log(HRESULT);
  }

  public ListGUI() {
    return GUIList;
  }

  public CloseAllCOM() {
    if (GUIList.length > 0) {
      GUIList.forEach((gui) => {
        console.log(ApiOl32.XvbaRelease(gui.pointer), gui.name);
      });
      GUIList = [];
    }
  }

  public CloseCOM() {
    ApiOl32.XvbaRelease(this.gui.pointer);
    this.gui = { pointer: null, type: null, name: "" };
  }
}
