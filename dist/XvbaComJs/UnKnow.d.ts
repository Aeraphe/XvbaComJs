interface IGuid {
    pointer: any;
    type: any;
    name: string;
}
export declare abstract class Unknow {
    guid: IGuid;
    protected application: string;
    constructor(prop?: any);
    private CreateInstace;
    private CreateTheFirstCom;
    private InitializeMethods;
    static ListGUID(): IGuid[];
    /**
     * Close all COM
     * @param className
     */
    static CloseAllCOM(className?: string): void;
    CloseCOM(): void;
}
export {};
