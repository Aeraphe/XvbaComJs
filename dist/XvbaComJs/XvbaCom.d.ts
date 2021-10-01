import { Unknow } from "./UnKnow";
export declare enum PropType {
    STRING = 0,
    INTEGER = 1,
    BOOLEAN = 2,
    NULL = 100
}
export declare abstract class XvbaCOM extends Unknow {
    constructor(application?: string);
    /**
     *
     * @param propToCall <string> the name of the method | property | object to call IDispatch::Invoke
     * @param param : arguments is an Array-like object
     * @param type
     * @returns
     */
    private _Invoke;
    private _PreparInvokeParams;
    /**
     * Check if the param is number or string for make the correct buffer
     * @param param: any
     * @returns  { paramPtr: Buffer, inputValueType:number }
     */
    private _MakeInputBufferType;
    /**
     *
     * Set Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string | number value to set to the property
     * @param type <PropType>
     */
    private _SetValue;
    /**
     * Call to a COM Method that returns a XvbaCom Object
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns XvbaCom
     */
    protected CallMethodToGetObject(propToCall: string, XCom: any, ...args: any): any;
    /**
     * Call to a COM Method that returns a String value
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns string
     */
    protected CallMethodToGetString(propToCall: string, ...args: any): any;
    /**
     * Call to a COM Method that return void
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     */
    protected CallMethodToGetVoid(propToCall: string, ...param: any): void;
    /**
     * Call to a COM Method that returns a Number Value
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns number
     */
    protected CallMethodToGetNumber(propToCall: string, ...args: any): any;
    /**
     * Get COM property/Object by name
     *
     * @param prop <string> the COM property Name
     * @returns
     */
    protected GetPropByRef(prop: string): any;
    /**
     * Create COM object
     * @param XvbaCom <XvbaCom>
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns <XvbaCom>
     */
    protected CreateObject(XvbaCom: any, ...args: any): any;
    /**
     * Get COM number Property value by
     * pass COM property name
     *
     * @param prop <string> COM Property name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns
     */
    protected GetNumbValue(prop: string, ...args: any): number;
    /**
     * Get COM string Property value
     *
     * @param prop <string> COM Property name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns
     */
    protected GetStrValue(prop: string, ...args: any): any;
    /**
     *
     * Set String Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetStrValue(propToCall: string, value: string): void;
    /**
     *
     * Set Number Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetNumbValue(propToCall: string, value: number): void;
    /**
     *
     * Set Boolean Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetBooleanValue(propToCall: string, value: Boolean): void;
    /**
     * Check the param type receive from  functions and return a number
     * correspond to the type in C++
     * @param value
     * @returns
     */
    private _GetParamType;
    /**
     *
     * Receive args from functions and convert on Array of Struct for C++
     *
     * @param args Array<any>
     * @returns
     */
    private _MakeStructArrayOfParams;
}
