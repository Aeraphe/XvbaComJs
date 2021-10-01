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
    /**
     * List of all COM objects create in C++
     * @returns
     */
    static ListGUID(): IGuid[];
    /**
     * Release all COM
     *
     * C++ has no garbage collection and
     * has to manually managed memory allocation/deallocation
     *
     */
    static ReleaseAllCOM(): void;
    /**
     * Release all COM With Delay
     *
     * C++ has no garbage collection and
     * has to manually managed memory allocation/deallocation
     * Some cases the delay on Release COMs is needed
     *
     * @param time: number default = 3000ms
     */
    static ReleaseAllCOMWithDelay(time?: number): void;
    /**
     * Release all COM
     *
     * C++ has no garbage collection and
     * has to manually managed memory allocation/deallocation
     * @param className
     */
    static ReleaseSelectedCom(className?: string): void;
    /**
     * Release all COM
     *
     * C++ has no garbage collection and
     * has to manually managed memory allocation/deallocation
     * @param className
     */
    ReleaseCOM(): void;
}
export {};
