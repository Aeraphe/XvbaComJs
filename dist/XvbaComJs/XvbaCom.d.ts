import { Unknow } from "./UnKnow";
export declare enum PropType {
    INTEGER = 1,
    STRING = 0
}
export declare abstract class XvbaCOM extends Unknow {
    constructor(application?: string);
    private Invoke;
    private _PreparCallParams;
    /**
     * Call to a COM Method that returns a XvbaCom Object
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns XvbaCom
     */
    protected CallMethodToGetObject(propToCall: string, param: any, XCom: any): any;
    /**
     * Call to a COM Method that returns a String value
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns string
     */
    protected CallMethodToGetString(propToCall: string, param?: any): any;
    /**
     * Call to a COM Method that returns a Number Value
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns number
     */
    protected CallMethodToGetNumber(propToCall: string, param?: any): any;
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
     * @returns <XvbaCom>
     */
    protected CreateObject(XvbaCom: any): any;
    /**
     * Get COM number Property value by
     * pass COM property name
     *
     * @param prop <string> COM Property name
     * @returns
     */
    protected GetNumbValue(prop: string): any;
    /**
     * Get COM string Property value
     *
     * @param prop <string> COM Property name
     * @returns
     */
    protected GetStrValue(prop: string): any;
    /**
     *
     * Set Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string | number value to set to the property
     * @param type <PropType>
     */
    private SetValue;
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
}
