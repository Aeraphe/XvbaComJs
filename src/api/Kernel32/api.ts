import * as ffi from "ffi-napi";

export const ApiKernell32 = ffi.Library("Kernel32", {
  DebugActiveProcess: ["int", ["int"]],
  IsDebuggerPresent: ["int", []],
});
