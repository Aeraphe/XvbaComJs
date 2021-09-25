import * as ffi from "ffi-napi";
import * as path from "path";
import * as os from "os";

let XvbaComDll = "" ;

if (os.arch() === "x64") {
  XvbaComDll = path.join(
    "F:\\Apps\\XvbaCom\\XvbaCom\\x64\\Release\\XvbaCom.dll"
  );
} 

export const ApiOl32 = ffi.Library(XvbaComDll, {
  XvbaCoCreateInstance: ["int", ["pointer", "pointer"]],
  XvbaShowApplication: ["int", ["pointer"]],
  XvbaGetMethod: ["int", ["pointer", "pointer", "pointer"]],
  XvbaGetPropertyValue: [
    "int",
    ["pointer", "pointer", "pointer", "pointer", "pointer", "int"],
  ],
});
