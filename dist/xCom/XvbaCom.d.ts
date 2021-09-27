import { Unknow } from "./UnKnow";
export declare abstract class XvbaCOM extends Unknow {
    constructor(application?: string);
    protected Call(propToCall: string, param?: any): {
        objectPtr: any;
        value: any;
    };
    protected GetObject(XvbaCom: any): any;
    protected GetValue(prop: string): any;
    protected SetVal(propToCall: string, param?: any): void;
}
