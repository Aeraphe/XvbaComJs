import * as ffi from "ffi-napi";
export declare const ApiOl32: {
    XvbaCoCreateInstance: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>]>;
    XvbaGetMethod: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>]>;
    XvbaGetPropertyRef: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>]>;
    XvbaCall: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, number, number]>;
    XvbaSetVal: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, import("ref-napi").Pointer<unknown>, number]>;
    XvbaRelease: ffi.ForeignFunction<number, [import("ref-napi").Pointer<unknown>]>;
};
