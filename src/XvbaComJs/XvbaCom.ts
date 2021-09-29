import { Unknow } from "./UnKnow";
import * as ref from "ref-napi";
import { ApiOl32 } from "../api/Ol32/api";

interface IResponse {
  objectPtr: any;
  value: any;
}

export enum PropType {
  STRING = 0,
  INTEGER = 1,
  BOOLEAN = 2,
}

export abstract class XvbaCOM extends Unknow {
  constructor(application?: string) {
    super(application);
  }

  /**
   *
   * @param propToCall <string> the name of the method | property | object to call IDispatch::Invoke
   * @param param <string | number |boolean>
   * @param type
   * @returns
   */
  private _Invoke(
    propToCall: string,
    param: string | number | boolean | Array<any> = "",
    type: number = PropType.INTEGER
  ): IResponse | undefined {
    try {
      let param2: any = param;
      let response: IResponse = { objectPtr: null, value: null };
      const params = this._PreparInvokeParams(propToCall, param, type);
      const HRESULT = ApiOl32.XvbaCall(
        params.pPropToCallPtr,
        this.guid.pointer,
        params.paramPtr,
        params.responsePtr,
        params.valuePtr,
        params.inputValueType,
        param2
      );

      response = { objectPtr: params.responsePtr, value: params.valuePtr };
      console.log(HRESULT, " : ", propToCall, param);
      return response;
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  private _PreparInvokeParams(
    propToCall: string,
    param: any = "",
    type: number
  ) {
    const pPropToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");

    let responsePtr: any = ref.alloc(ref.types.uint32);

    const { paramPtr, inputValueType } = this._MakeInputBufferType(param);

    //Set the response Buffer type
    let valuePtr: any;
    if (type === PropType.INTEGER) {
      valuePtr = ref.alloc(ref.types.int32);
    } else if (type === PropType.STRING) {
      valuePtr = ref.alloc(ref.types.CString);
    }

    return { pPropToCallPtr, paramPtr, responsePtr, valuePtr, inputValueType };
  }

  /**
   * Check if the param is number or string for make the correct buffer
   * @param param: any
   * @returns  { paramPtr: Buffer, inputValueType:number }
   */
  private _MakeInputBufferType(param: any) {
    let paramPtr: any;
    let inputValueType = PropType.STRING;

    if (param !== undefined && param !== "") {
 
      let bufferType: any;
      switch (typeof param) {
        case "number":
          inputValueType = PropType.INTEGER;
          bufferType = ref.types.int32;
          break;

        case "string":
          inputValueType = PropType.STRING;
          bufferType = ref.types.CString;
          break;

        case "boolean":
          inputValueType = PropType.INTEGER;
          bufferType = ref.types.bool;
          break;
      }
      paramPtr = ref.alloc(bufferType, param);
    } else {
  
      paramPtr = ref.NULL;
      inputValueType = 100;
    }

    return { paramPtr, inputValueType };
  }

  /**
   *
   * Set Value to COM Property
   *
   * @param propToCall <string> COM Property name
   * @param value string | number value to set to the property
   * @param type <PropType>
   */
  private _SetValue(propToCall: string, value: any = "", type: number) {
    const propToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");

    const { inputValueType, paramPtr } = this._MakeInputBufferType(value);

    const HRESULT = ApiOl32.XvbaSetVal(
      propToCallPtr,
      this.guid.pointer,
      paramPtr,
      inputValueType
    );
    console.log(HRESULT);
  }

  /**
   * Call to a COM Method that returns a XvbaCom Object
   *
   * @param propToCall:<string> Method Name
   * @param param : Array | string | number | Boolean
   * @returns XvbaCom
   */
  protected CallMethodToGetObject(
    propToCall: string,
    param: any = "",
    XCom: any
  ) {
    try {
      let response: IResponse | undefined = this._Invoke(propToCall, param);

      if (response !== undefined) {
        return new XCom(response.objectPtr);
      } else {
        throw new Error("Fail on CallMethodToGetObject: undefined");
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on CallMethodToGetObject");
    }
  }

  /**
   * Call to a COM Method that returns a String value
   *
   * @param propToCall:<string> Method Name
   * @param param : Array | string | number | Boolean
   * @returns string
   */
  protected CallMethodToGetString(propToCall: string, param: any = "") {
    try {
      const response: IResponse | undefined = this._Invoke(propToCall, param);
      if (response !== undefined) {
        return response.value.toString();
      } else {
        throw new Error("");
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on CallMethodToGetString");
    }
  }
  /**
   * Call to a COM Method that return void
   *
   * @param propToCall:<string> Method Name
   * @param param : Array | string | number | Boolean
   */
  protected CallMethodToGetVoid(propToCall: string, param: any = "") {
    try {
      const response: IResponse | undefined = this._Invoke(propToCall, param);
      if (response !== undefined) {
      } else {
        throw new Error("Fail on CallMethodToGetNumber");
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   * Call to a COM Method that returns a Number Value
   *
   * @param propToCall:<string> Method Name
   * @param param : Array | string | number | Boolean
   * @returns number
   */
  protected CallMethodToGetNumber(propToCall: string, param: any = "") {
    try {
      const response: IResponse | undefined = this._Invoke(propToCall, param);
      if (response !== undefined) {
        return response.value.deref();
      } else {
        throw new Error("Fail on CallMethodToGetNumber");
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   * Get COM property/Object by name
   *
   * @param prop <string> the COM property Name
   * @returns
   */
  protected GetPropByRef(prop: string) {
    try {
      const classNamePtr: any = Buffer.from(prop + "\0", "ucs2");
      let responsePtr: any = ref.alloc(ref.types.uint32);
      const HRESULT = ApiOl32.XvbaGetMethod(
        this.guid.pointer,
        responsePtr,
        classNamePtr
      );

      console.log("getPropByRef", HRESULT);
      return responsePtr;
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   * Create COM object
   * @param XvbaCom <XvbaCom>
   * @returns <XvbaCom>
   */
  protected CreateObject(XvbaCom: any) {
    try {
      const response: IResponse | undefined = this._Invoke(XvbaCom.name);
      if (response === undefined) {
        throw new Error("Error: GetObject Fail");
      } else {
        return new XvbaCom(response.objectPtr);
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   * Get COM number Property value by
   * pass COM property name
   *
   * @param prop <string> COM Property name
   * @returns
   */
  protected GetNumbValue(prop: string): number {
    try {
      const response: IResponse | undefined = this._Invoke(
        prop,
        "",
        PropType.INTEGER
      );
      if (response === undefined) {
        throw new Error("Error: GetNumbValue Fail");
      } else {
        return response.value.deref();
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on GetNumbValue");
    }
  }

  /**
   * Get COM string Property value
   *
   * @param prop <string> COM Property name
   * @returns
   */
  protected GetStrValue(prop: string) {
    try {
      const response: IResponse | undefined = this._Invoke(
        prop,
        "",
        PropType.STRING
      );
      if (response === undefined) {
        throw new Error("Error: GetStrValue Fail");
      } else {
        return response.value.deref();
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   *
   * Set String Value to COM Property
   *
   * @param propToCall <string> COM Property name
   * @param value string value to set to the property
   * @returns void
   */
  protected SetStrValue(propToCall: string, value: string): void {
    try {
      this._SetValue(propToCall, value, PropType.STRING);
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on SetNumbValue");
    }
  }

  /**
   *
   * Set Number Value to COM Property
   *
   * @param propToCall <string> COM Property name
   * @param value string value to set to the property
   * @returns void
   */
  protected SetNumbValue(propToCall: string, value: number): void {
    try {
      this._SetValue(propToCall, value, PropType.INTEGER);
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on SetNumbValue");
    }
  }

  /**
   *
   * Set Boolean Value to COM Property
   *
   * @param propToCall <string> COM Property name
   * @param value string value to set to the property
   * @returns void
   */
  protected SetBooleanValue(propToCall: string, value: Boolean) {
    try {
      let propType: number;
      if (value === true) {
        propType = PropType.INTEGER;
      } else if (value === false) {
        propType = PropType.STRING;
      } else {
        throw new Error("Error: Boolean value not set");
      }
      return this._SetValue(propToCall, value, propType);
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on SetBooleanValue");
    }
  }
}
