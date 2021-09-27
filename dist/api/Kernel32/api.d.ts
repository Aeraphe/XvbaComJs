import * as ffi from "ffi-napi";
export declare const ApiKernell32: {
    DebugActiveProcess: ffi.ForeignFunction<number, [number]>;
    IsDebuggerPresent: ffi.ForeignFunction<number, []>;
};
