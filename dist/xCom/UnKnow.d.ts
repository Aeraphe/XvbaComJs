export declare const propType: {
    PROPERTY_GET: number;
    METHOD: number;
    PROPERTY_PUT: number;
    PROPERTY_PUTREF: number;
};
interface IGui {
    pointer: any;
    type: any;
    name: string;
}
export declare abstract class Unknow {
    gui: IGui;
    protected application: string;
    constructor(prop?: any);
    private CreateObject;
    private CreateTheFirstCom;
    private InitializeMethods;
    ListGUI(): IGui[];
    CloseAllCOM(): void;
    CloseCOM(): void;
}
export {};
