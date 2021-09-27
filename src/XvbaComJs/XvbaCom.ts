import { Unknow } from "./UnKnow";
import * as ref from "ref-napi";
import { ApiOl32 } from "../api/Ol32/api";

interface IResponse {
  objectPtr: any;
  value: any;
}

export enum PropType {
  INTEGER = 1,
  STRING = 0,
}
export abstract class XvbaCOM extends Unknow {
  constructor(application?: string) {
    super(application);
  }

  private Invoke(
    propToCall: string,
    param: any = "",
    type: number = PropType.INTEGER
  ): IResponse | undefined {
    try {
      let response: IResponse = { objectPtr: null, value: null };
      const params = this._PreparCallParams(propToCall, param, type);
      const HRESULT = ApiOl32.XvbaCall(
        params.pPropToCallPtr,
        this.guid.pointer,
        params.pParamPtr,
        params.responsePtr,
        params.valuePtr,
        params.typeValue
      );

      response = { objectPtr: params.responsePtr, value: params.valuePtr };
      console.log(HRESULT, " : ", propToCall);
      return response;
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  private _PreparCallParams(propToCall: string, param: any = "", type: number) {
    const pPropToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");
    const pParamPtr: any = Buffer.from(param + "\0", "ucs2");
    let responsePtr: any = ref.alloc(ref.types.uint32);

    param = param === "" ? ref.NULL : param;
    let typeValue = 0;
    let valuePtr: any;
    if (type === PropType.INTEGER) {
      typeValue = 0;
      valuePtr = ref.alloc(ref.types.int32);
    } else if (type === PropType.STRING) {
      typeValue = 1;
      valuePtr = ref.alloc(ref.types.CString);
    }

    return { pPropToCallPtr, pParamPtr, responsePtr, valuePtr, typeValue };
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
      let response: IResponse | undefined = this.Invoke(propToCall, param);

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
      const response: IResponse | undefined = this.Invoke(propToCall, param);
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
   * Call to a COM Method that returns a Number Value
   *
   * @param propToCall:<string> Method Name
   * @param param : Array | string | number | Boolean
   * @returns number
   */
  protected CallMethodToGetNumber(propToCall: string, param: any = "") {
    try {
      const response: IResponse | undefined = this.Invoke(propToCall, param);
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
      const response: IResponse | undefined = this.Invoke(XvbaCom.name);
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
  protected GetNumbValue(prop: string) {
    try {
      const response: IResponse | undefined = this.Invoke(
        prop,
        "",
        PropType.INTEGER
      );
      if (response === undefined) {
        throw new Error("Error: GetNumbValue Fail");
      } else {
        return response.value;
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
      const response: IResponse | undefined = this.Invoke(
        prop,
        "",
        PropType.STRING
      );
      if (response === undefined) {
        throw new Error("Error: GetStrValue Fail");
      } else {
        return response.value;
      }
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      console.error(error);
    }
  }

  /**
   *
   * Set Value to COM Property
   *
   * @param propToCall <string> COM Property name
   * @param value string | number value to set to the property
   * @param type <PropType>
   */
  private SetValue(propToCall: string, value: any = "", type: number) {
    const propToCallPtr: any = Buffer.from(propToCall + "\0", "ucs2");
    const valuePtr: any = Buffer.from(value + "\0", "ucs2");

    const HRESULT = ApiOl32.XvbaSetVal(
      propToCallPtr,
      this.guid.pointer,
      valuePtr,
      type
    );
    console.log(HRESULT);
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
      this.SetValue(propToCall, value, PropType.STRING);
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
      this.SetValue(propToCall, value, PropType.INTEGER);
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
      return this.SetValue(propToCall, value, propType);
    } catch (error) {
      XvbaCOM.CloseAllCOM();
      throw new Error("Fail on SetBooleanValue");
    }
  }
}
