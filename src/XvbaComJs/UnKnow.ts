import * as ref from "ref-napi";
import { ApiOl32 } from "../api/Ol32/api";

const propType = {
  PROPERTY_GET: 0x2,
  METHOD: 0x1,
  PROPERTY_PUT: 0x4,
  PROPERTY_PUTREF: 0x8,
};

let lastComCreate: any;

interface IGuid {
  pointer: any;
  type: any;
  name: string;
}

//GUID Global Unique Identifier List for Created COMs
let GUIDList: Array<IGuid> = [];

export abstract class Unknow {
  guid: IGuid = { pointer: null, type: null, name: "" };
  //COM object name
  protected application = "";

  constructor(prop?: any) {
    this.CreateInstace(prop);
  }

  private CreateInstace(prop?: any) {
    GUIDList.push(this.guid);
    this.guid.type = propType.METHOD;
    this.guid.name = this.constructor.name;

    if (prop !== undefined && typeof prop === "string") {
      this.application = prop || this.application;
    } else if (prop !== undefined && typeof prop !== "string") {
      this.guid.pointer = prop;

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
    this.guid.pointer = responsePtr;
    lastComCreate = responsePtr;
    console.log(HRESULT);
  };

  private InitializeMethods() {
    const className = this.constructor.name;
    const classNamePtr: any = Buffer.from(className + "\0", "ucs2");
    let responsePtr: any = ref.alloc(ref.types.uint32);
    const HRESULT = ApiOl32.XvbaGetMethod(
      lastComCreate,
      responsePtr,
      classNamePtr
    );
    this.guid.pointer = responsePtr;
    lastComCreate = responsePtr;
    console.log(HRESULT);
  }

  /**
   * List of all COM objects create in C++
   * @returns 
   */
  static ListGUID() {
    return GUIDList;
  }

  /**
   * Release all COM
   * 
   * C++ has no garbage collection and
   * has to manually managed memory allocation/deallocation
   * 
   */
  static ReleaseAllCOM() {
    if (GUIDList.length > 0) {
      GUIDList.map((gui) => {
        console.log(ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
      });
      GUIDList = [];
    }
  }

  /**
   * Release all COM With Delay
   *
   * C++ has no garbage collection and
   * has to manually managed memory allocation/deallocation
   * Some cases the delay on Release COMs is needed
   *
   * @param time: number default = 3000ms
   */
  static ReleaseAllCOMWithDelay(time = 3000) {
    setTimeout(() => {
      if (GUIDList.length > 0) {
        GUIDList.map((gui) => {
          console.log(ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
        });
        GUIDList = [];
      }
    }, time);
  }

  /**
   * Release all COM
   * 
   * C++ has no garbage collection and
   * has to manually managed memory allocation/deallocation
   * @param className
   */
  static ReleaseSelectedCom(className?: string) {
    if (GUIDList.length > 0) {
      GUIDList.map((gui) => {
        if (className != undefined) {
          if (gui.name === className) {
            console.log(ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
          }
        }
      });
      GUIDList = [];
    }
  }

  /**
   * Release all COM
   *
   * C++ has no garbage collection and
   * has to manually managed memory allocation/deallocation
   * @param className
   */
  public ReleaseCOM() {
    ApiOl32.XvbaRelease(this.guid.pointer);
    this.guid = { pointer: null, type: null, name: "" };
  }
}
