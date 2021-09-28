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
     * Close all Com
     * @param className
     */
    static CloseAllCOM(): void;
    /**
     * Close all Com With Delay
     * @param time: number default = 3000ms
     */
    static CloseAllCOMWithDelay(time?: number): void;
    /**
     * Close all Com
     * @param className
     */
    static ReleaseSelectedCom(className?: string): void;
    CloseCOM(): void;
}
export {};
