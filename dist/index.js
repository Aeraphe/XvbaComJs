/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/XvbaComJs/UnKnow.ts":
/*!*********************************!*\
  !*** ./src/XvbaComJs/UnKnow.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Unknow = void 0;
const ref = __webpack_require__(/*! ref-napi */ "ref-napi");
const api_1 = __webpack_require__(/*! ../api/Ol32/api */ "./src/api/Ol32/api.ts");
const propType = {
    PROPERTY_GET: 0x2,
    METHOD: 0x1,
    PROPERTY_PUT: 0x4,
    PROPERTY_PUTREF: 0x8,
};
let lastComCreate;
//GUID Global Unique Identifier List for Created COMs
let GUIDList = [];
class Unknow {
    constructor(prop) {
        this.guid = { pointer: null, type: null, name: "" };
        //COM object name
        this.application = "";
        this.CreateTheFirstCom = () => {
            const ProgID = Buffer.from(this.application + "\0", "ucs2");
            let responsePtr = ref.alloc(ref.types.uint32);
            const HRESULT = api_1.ApiOl32.XvbaCoCreateInstance(ProgID, responsePtr);
            this.guid.pointer = responsePtr;
            lastComCreate = responsePtr;
            console.log(HRESULT);
        };
        this.CreateInstace(prop);
    }
    CreateInstace(prop) {
        GUIDList.push(this.guid);
        this.guid.type = propType.METHOD;
        this.guid.name = this.constructor.name;
        if (prop !== undefined && typeof prop === "string") {
            this.application = prop || this.application;
        }
        else if (prop !== undefined && typeof prop !== "string") {
            this.guid.pointer = prop;
            return;
        }
        if (lastComCreate === undefined) {
            this.CreateTheFirstCom();
        }
        else {
            this.InitializeMethods();
        }
    }
    InitializeMethods() {
        const className = this.constructor.name;
        const classNamePtr = Buffer.from(className + "\0", "ucs2");
        let responsePtr = ref.alloc(ref.types.uint32);
        const HRESULT = api_1.ApiOl32.XvbaGetMethod(lastComCreate, responsePtr, classNamePtr);
        this.guid.pointer = responsePtr;
        lastComCreate = responsePtr;
        console.log(HRESULT);
    }
    static ListGUID() {
        return GUIDList;
    }
    /**
     * Close all Com
     * @param className
     */
    static CloseAllCOM() {
        if (GUIDList.length > 0) {
            GUIDList.map((gui) => {
                console.log(api_1.ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
            });
            GUIDList = [];
        }
    }
    /**
     * Close all Com With Delay
     * @param time: number default = 3000ms
     */
    static CloseAllCOMWithDelay(time = 3000) {
        setTimeout(() => {
            if (GUIDList.length > 0) {
                GUIDList.map((gui) => {
                    console.log(api_1.ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
                });
                GUIDList = [];
            }
        }, time);
    }
    /**
     * Close all Com
     * @param className
     */
    static ReleaseSelectedCom(className) {
        if (GUIDList.length > 0) {
            GUIDList.map((gui) => {
                if (className != undefined) {
                    if (gui.name === className) {
                        console.log(api_1.ApiOl32.XvbaRelease(gui.pointer), ":", gui.name);
                    }
                }
            });
            GUIDList = [];
        }
    }
    CloseCOM() {
        api_1.ApiOl32.XvbaRelease(this.guid.pointer);
        this.guid = { pointer: null, type: null, name: "" };
    }
}
exports.Unknow = Unknow;


/***/ }),

/***/ "./src/XvbaComJs/XvbaCom.ts":
/*!**********************************!*\
  !*** ./src/XvbaComJs/XvbaCom.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.XvbaCOM = exports.PropType = void 0;
const UnKnow_1 = __webpack_require__(/*! ./UnKnow */ "./src/XvbaComJs/UnKnow.ts");
const ref = __webpack_require__(/*! ref-napi */ "ref-napi");
const api_1 = __webpack_require__(/*! ../api/Ol32/api */ "./src/api/Ol32/api.ts");
var PropType;
(function (PropType) {
    PropType[PropType["STRING"] = 0] = "STRING";
    PropType[PropType["INTEGER"] = 1] = "INTEGER";
    PropType[PropType["BOOLEAN"] = 2] = "BOOLEAN";
})(PropType = exports.PropType || (exports.PropType = {}));
class XvbaCOM extends UnKnow_1.Unknow {
    constructor(application) {
        super(application);
    }
    /**
     *
     * @param propToCall <string> the name of the method | property | object to call IDispatch::Invoke
     * @param param <string | number |boolean>
     * @param type
     * @returns
     */
    _Invoke(propToCall, param = "", type = PropType.INTEGER) {
        try {
            let param2 = param;
            let response = { objectPtr: null, value: null };
            const params = this._PreparInvokeParams(propToCall, param, type);
            const HRESULT = api_1.ApiOl32.XvbaCall(params.pPropToCallPtr, this.guid.pointer, params.paramPtr, params.responsePtr, params.valuePtr, params.inputValueType, param2);
            response = { objectPtr: params.responsePtr, value: params.valuePtr };
            console.log(HRESULT, " : ", propToCall, param);
            return response;
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    _PreparInvokeParams(propToCall, param = "", type) {
        const pPropToCallPtr = Buffer.from(propToCall + "\0", "ucs2");
        let responsePtr = ref.alloc(ref.types.uint32);
        const { paramPtr, inputValueType } = this._MakeInputBufferType(param);
        //Set the response Buffer type
        let valuePtr;
        if (type === PropType.INTEGER) {
            valuePtr = ref.alloc(ref.types.int32);
        }
        else if (type === PropType.STRING) {
            valuePtr = ref.alloc(ref.types.CString);
        }
        return { pPropToCallPtr, paramPtr, responsePtr, valuePtr, inputValueType };
    }
    /**
     * Check if the param is number or string for make the correct buffer
     * @param param: any
     * @returns  { paramPtr: Buffer, inputValueType:number }
     */
    _MakeInputBufferType(param) {
        let paramPtr;
        let inputValueType = PropType.STRING;
        if (param !== undefined && param !== "") {
            let bufferType;
            switch (typeof param) {
                case "number":
                    inputValueType = PropType.INTEGER;
                    bufferType = ref.types.int32;
                    break;
                case "string":
                    inputValueType = PropType.STRING;
                    bufferType = ref.types.CString;
                    break;
                case "boolean":
                    inputValueType = PropType.INTEGER;
                    bufferType = ref.types.bool;
                    break;
            }
            paramPtr = ref.alloc(bufferType, param);
        }
        else {
            paramPtr = ref.NULL;
            inputValueType = 100;
        }
        return { paramPtr, inputValueType };
    }
    /**
     *
     * Set Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string | number value to set to the property
     * @param type <PropType>
     */
    _SetValue(propToCall, value = "", type) {
        const propToCallPtr = Buffer.from(propToCall + "\0", "ucs2");
        const { inputValueType, paramPtr } = this._MakeInputBufferType(value);
        const HRESULT = api_1.ApiOl32.XvbaSetVal(propToCallPtr, this.guid.pointer, paramPtr, inputValueType);
        console.log(HRESULT);
    }
    /**
     * Call to a COM Method that returns a XvbaCom Object
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns XvbaCom
     */
    CallMethodToGetObject(propToCall, param = "", XCom) {
        try {
            let response = this._Invoke(propToCall, param);
            if (response !== undefined) {
                return new XCom(response.objectPtr);
            }
            else {
                throw new Error("Fail on CallMethodToGetObject: undefined");
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on CallMethodToGetObject");
        }
    }
    /**
     * Call to a COM Method that returns a String value
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns string
     */
    CallMethodToGetString(propToCall, param = "") {
        try {
            const response = this._Invoke(propToCall, param);
            if (response !== undefined) {
                return response.value.toString();
            }
            else {
                throw new Error("");
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on CallMethodToGetString");
        }
    }
    /**
     * Call to a COM Method that return void
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     */
    CallMethodToGetVoid(propToCall, param = "") {
        try {
            const response = this._Invoke(propToCall, param);
            if (response !== undefined) {
            }
            else {
                throw new Error("Fail on CallMethodToGetNumber");
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    /**
     * Call to a COM Method that returns a Number Value
     *
     * @param propToCall:<string> Method Name
     * @param param : Array | string | number | Boolean
     * @returns number
     */
    CallMethodToGetNumber(propToCall, param = "") {
        try {
            const response = this._Invoke(propToCall, param);
            if (response !== undefined) {
                return response.value.deref();
            }
            else {
                throw new Error("Fail on CallMethodToGetNumber");
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    /**
     * Get COM property/Object by name
     *
     * @param prop <string> the COM property Name
     * @returns
     */
    GetPropByRef(prop) {
        try {
            const classNamePtr = Buffer.from(prop + "\0", "ucs2");
            let responsePtr = ref.alloc(ref.types.uint32);
            const HRESULT = api_1.ApiOl32.XvbaGetMethod(this.guid.pointer, responsePtr, classNamePtr);
            console.log("getPropByRef", HRESULT);
            return responsePtr;
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    /**
     * Create COM object
     * @param XvbaCom <XvbaCom>
     * @returns <XvbaCom>
     */
    CreateObject(XvbaCom) {
        try {
            const response = this._Invoke(XvbaCom.name);
            if (response === undefined) {
                throw new Error("Error: GetObject Fail");
            }
            else {
                return new XvbaCom(response.objectPtr);
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    /**
     * Get COM number Property value by
     * pass COM property name
     *
     * @param prop <string> COM Property name
     * @returns
     */
    GetNumbValue(prop) {
        try {
            const response = this._Invoke(prop, "", PropType.INTEGER);
            if (response === undefined) {
                throw new Error("Error: GetNumbValue Fail");
            }
            else {
                return response.value.deref();
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on GetNumbValue");
        }
    }
    /**
     * Get COM string Property value
     *
     * @param prop <string> COM Property name
     * @returns
     */
    GetStrValue(prop) {
        try {
            const response = this._Invoke(prop, "", PropType.STRING);
            if (response === undefined) {
                throw new Error("Error: GetStrValue Fail");
            }
            else {
                return response.value.deref();
            }
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            console.error(error);
        }
    }
    /**
     *
     * Set String Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    SetStrValue(propToCall, value) {
        try {
            this._SetValue(propToCall, value, PropType.STRING);
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on SetNumbValue");
        }
    }
    /**
     *
     * Set Number Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    SetNumbValue(propToCall, value) {
        try {
            this._SetValue(propToCall, value, PropType.INTEGER);
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on SetNumbValue");
        }
    }
    /**
     *
     * Set Boolean Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    SetBooleanValue(propToCall, value) {
        try {
            let propType;
            if (value === true) {
                propType = PropType.INTEGER;
            }
            else if (value === false) {
                propType = PropType.STRING;
            }
            else {
                throw new Error("Error: Boolean value not set");
            }
            return this._SetValue(propToCall, value, propType);
        }
        catch (error) {
            XvbaCOM.CloseAllCOM();
            throw new Error("Fail on SetBooleanValue");
        }
    }
}
exports.XvbaCOM = XvbaCOM;


/***/ }),

/***/ "./src/api/Excel/Excel.ts":
/*!********************************!*\
  !*** ./src/api/Excel/Excel.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Excel = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
const Sheets_1 = __webpack_require__(/*! ./Sheets */ "./src/api/Excel/Sheets.ts");
const WorkBooks_1 = __webpack_require__(/*! ./WorkBooks */ "./src/api/Excel/WorkBooks.ts");
class Excel extends XvbaCom_1.XvbaCOM {
    constructor() {
        super("Excel.Application");
        this.Visible = () => this.SetBooleanValue("Visible", true);
        this.Name = () => this.GetStrValue("Name");
        this.Quit = () => this.CallMethodToGetVoid("Quit");
        this.WorkBooks = new WorkBooks_1.WorkBooks();
    }
    get Sheets() {
        if (this._Sheets == undefined) {
            this._Sheets = this.CreateObject(Sheets_1.Sheets);
            return this._Sheets;
        }
        else {
            return this._Sheets;
        }
    }
}
exports.Excel = Excel;


/***/ }),

/***/ "./src/api/Excel/Sheets.ts":
/*!*********************************!*\
  !*** ./src/api/Excel/Sheets.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sheets = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
class Sheets extends XvbaCom_1.XvbaCOM {
    constructor(param) {
        super(param);
    }
    Count() {
        return this.GetNumbValue("Count");
    }
}
exports.Sheets = Sheets;


/***/ }),

/***/ "./src/api/Excel/VBComponent.ts":
/*!**************************************!*\
  !*** ./src/api/Excel/VBComponent.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VBComponent = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
class VBComponent extends XvbaCom_1.XvbaCOM {
    constructor(param) {
        super(param);
    }
    get Name() {
        if (this._Name == undefined) {
            this._Name = this.GetStrValue("Name");
        }
        return this._Name;
    }
    get Type() {
        if (this._Type == undefined) {
            this._Type = this.GetNumbValue("Type");
        }
        return this._Type;
    }
    Export(compFilePath) {
        return this.CallMethodToGetNumber("Export", compFilePath);
    }
}
exports.VBComponent = VBComponent;


/***/ }),

/***/ "./src/api/Excel/VBComponents.ts":
/*!***************************************!*\
  !*** ./src/api/Excel/VBComponents.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VBComponents = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
const VBComponent_1 = __webpack_require__(/*! ./VBComponent */ "./src/api/Excel/VBComponent.ts");
class VBComponents extends XvbaCom_1.XvbaCOM {
    constructor(prop) {
        super(prop);
    }
    get Count() {
        this._Count = this.GetNumbValue("Count");
        return this._Count;
    }
    Item(value) {
        return this.CallMethodToGetObject("Item", value, VBComponent_1.VBComponent);
    }
}
exports.VBComponents = VBComponents;


/***/ }),

/***/ "./src/api/Excel/VBProject.ts":
/*!************************************!*\
  !*** ./src/api/Excel/VBProject.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VBProject = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
const VBComponents_1 = __webpack_require__(/*! ./VBComponents */ "./src/api/Excel/VBComponents.ts");
class VBProject extends XvbaCom_1.XvbaCOM {
    constructor(prop) {
        super(prop);
    }
    get VBComponents() {
        if (this._VBComponents == undefined) {
            this._VBComponents = this.CreateObject(VBComponents_1.VBComponents);
        }
        return this._VBComponents;
    }
}
exports.VBProject = VBProject;


/***/ }),

/***/ "./src/api/Excel/WorkBook.ts":
/*!***********************************!*\
  !*** ./src/api/Excel/WorkBook.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkBook = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
const VBProject_1 = __webpack_require__(/*! ./VBProject */ "./src/api/Excel/VBProject.ts");
class WorkBook extends XvbaCom_1.XvbaCOM {
    constructor(prop) {
        super(prop);
        this.FullName = () => this.GetStrValue("FullName");
    }
    get VBProject() {
        if (this._VBProject == undefined) {
            this._VBProject = this.CreateObject(VBProject_1.VBProject);
            return this._VBProject;
        }
        else {
            return this._VBProject;
        }
    }
    set VBProject(ss) {
        this._VBProject = ss;
    }
    get Activate() {
        return this.GetNumbValue("Activate");
    }
}
exports.WorkBook = WorkBook;


/***/ }),

/***/ "./src/api/Excel/WorkBooks.ts":
/*!************************************!*\
  !*** ./src/api/Excel/WorkBooks.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WorkBooks = void 0;
const XvbaCom_1 = __webpack_require__(/*! ../../XvbaComJs/XvbaCom */ "./src/XvbaComJs/XvbaCom.ts");
const WorkBook_1 = __webpack_require__(/*! ./WorkBook */ "./src/api/Excel/WorkBook.ts");
class WorkBooks extends XvbaCom_1.XvbaCOM {
    constructor() {
        super();
    }
    /**
     * Open Excel file
     * @param filePath :string
     * @returns
     */
    Open(filePath) {
        return this.CallMethodToGetObject("Open", filePath, WorkBook_1.WorkBook);
    }
}
exports.WorkBooks = WorkBooks;


/***/ }),

/***/ "./src/api/Ol32/api.ts":
/*!*****************************!*\
  !*** ./src/api/Ol32/api.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiOl32 = void 0;
const ffi = __webpack_require__(/*! ffi-napi */ "ffi-napi");
const path = __webpack_require__(/*! path */ "path");
const os = __webpack_require__(/*! os */ "os");
const getDllFile = () => {
    if (os.arch() === "x64") {
        return path.join(__dirname, "lib", "64", "XvbaCom.dll");
    }
    else {
        return path.join(__dirname, "lib", "32", "XvbaCom.dll");
    }
};
exports.ApiOl32 = ffi.Library(getDllFile(), {
    XvbaCoCreateInstance: ["int", ["pointer", "pointer"]],
    XvbaGetMethod: ["int", ["pointer", "pointer", "pointer"]],
    XvbaGetPropertyRef: ["int", ["pointer", "pointer", "pointer"]],
    XvbaCall: [
        "int",
        ["pointer", "pointer", "void*", "pointer", "pointer", "int", "int"],
    ],
    XvbaSetVal: ["int", ["pointer", "pointer", "pointer", "int"]],
    XvbaRelease: ["int", ["pointer"]],
});
"";


/***/ }),

/***/ "./src/example/excel.ts":
/*!******************************!*\
  !*** ./src/example/excel.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tryExcel = void 0;
const Excel_1 = __webpack_require__(/*! ../api/Excel/Excel */ "./src/api/Excel/Excel.ts");
const tryExcel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let excel = new Excel_1.Excel();
        excel.Visible();
        let Book = excel.WorkBooks.Open("F:\\Apps\\XvbaCom\\index.xlsb");
        let sheets = excel.Sheets;
        let total = sheets.Count();
        console.log("--->", total);
        let exName = excel.Name();
        console.log("--->", exName);
        let totalComp = Book.VBProject.VBComponents.Count;
        console.log("--->", totalComp);
        for (let index = 0; index < totalComp; index++) {
            const vbComponent = Book.VBProject.VBComponents.Item(index + 1);
            const compName = vbComponent.Name;
            let compFileName = "";
            switch (vbComponent.Type) {
                case 1:
                    compFileName = compName + ".bas";
                    break;
                case 2:
                    compFileName = compName + ".cls";
                    break;
                case 3:
                    compFileName = compName + ".frm";
                    break;
                case 100:
                    compFileName = compName + ".cls";
                    break;
                default:
                    break;
            }
            const fileExport = "F:\\Apps\\XvbaCom\\vba\\" + compFileName;
            vbComponent.Export(fileExport);
        }
        excel.Quit();
        Excel_1.Excel.CloseAllCOMWithDelay();
    }
    catch (error) {
        console.log(error);
        Excel_1.Excel.CloseAllCOMWithDelay();
    }
});
exports.tryExcel = tryExcel;


/***/ }),

/***/ "ffi-napi":
/*!***************************!*\
  !*** external "ffi-napi" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("ffi-napi");

/***/ }),

/***/ "ref-napi":
/*!***************************!*\
  !*** external "ref-napi" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("ref-napi");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const excel_1 = __webpack_require__(/*! ./example/excel */ "./src/example/excel.ts");
(0, excel_1.tryExcel)();

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map