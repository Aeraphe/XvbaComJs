import * as ffi from "ffi-napi";
import * as path from "path";
import * as os from "os";

const getDllFile = () => {
  if (os.arch() === "x64") {
    return path.join(__dirname, "lib", "64", "XvbaCom.dll");
  } else {
    return path.join(__dirname, "lib", "32", "XvbaCom.dll");
  }
};

export const ApiOl32 = ffi.Library(getDllFile(), {
  XvbaCoCreateInstance: ["int", ["pointer", "pointer"]],
  XvbaGetMethod: ["int", ["pointer", "pointer", "pointer"]],
  XvbaGetPropertyRef: ["int", ["pointer", "pointer", "pointer"]],
  XvbaCall: [
    "int",
    ["pointer", "pointer", "void*", "pointer", "pointer", "int","int"],
  ],
  XvbaSetVal: ["int", ["pointer", "pointer", "pointer", "int"]],
  XvbaRelease:["int",["pointer"]],
});""
