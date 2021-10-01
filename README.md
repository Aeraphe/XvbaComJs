# XvbaCom

- Create Windows COM like Excel for use in Node Js

- It's a Framework where you extends your class and use the methods for conect to Windows COM 

- You can pass multi params to methods (strings | numbers | booleans)

## See ExcelXvba (Windows COM) created with this extension

- <a href="https://www.npmjs.com/package/excel-xvba">ExcelXvba</a> 

## If you want to edit vba on VSCode see XVBA:

- <a href="https://xvba-repository.web.app/"> www.xvba.dev</a> 

## Importing


```javascript

import { XvbaCOM } from "xvba-com";

//Just extends Your COM class 
export class Excel extends XvbaCOM {

    constructor() {
    super("Excel.Application");
  }

}


```

## Example from <a href="https://www.npmjs.com/package/excel-xvba">ExcelXvba</a>:


```javascript

import { XvbaCOM } from "xvba-com";
import { Sheets } from "./Sheets";
import { WorkBooks } from "./WorkBooks";

export class Excel extends XvbaCOM {
  public WorkBooks: WorkBooks;
  private _Sheets: Sheets;

  public get Sheets(): Sheets {
    if (this._Sheets == undefined) {
      this._Sheets = this.CreateObject(Sheets);
      return this._Sheets;
    } else {
      return this._Sheets;
    }
  }

  constructor() {
    super("Excel.Application");
    this.WorkBooks = new WorkBooks();
  }

  Visible = () => this.SetBooleanValue("Visible", true);

  Name = () => this.GetStrValue("Name");

  Quit = () => this.CallMethodToGetVoid("Quit");
}

```

## Webpack Config

- Put this package in the externals option in webpack.config

```javascript

  externals: {'xvba-com': 'xvba-com'}
  
```

## List of Methods from this Frameworks:

```javascript

  /**
     * Call to a COM Method that returns a XvbaCom Object
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns XvbaCom
     */
    protected CallMethodToGetObject(propToCall: string, XCom: XvbaCom, ...args: any): Object<XvbaCom>;

    /**
     * Call to a COM Method that returns a String value
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns string
     */
    protected CallMethodToGetString(propToCall: string, ...args: any): string;
    
    /**
     * Call to a COM Method that return void
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     */
    protected CallMethodToGetVoid(propToCall: string, ...param: any): void;

    /**
     * Call to a COM Method that returns a Number Value
     *
     * @param propToCall:<string> Method Name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns number
     */
    protected CallMethodToGetNumber(propToCall: string, ...args: any): number;

    /**
     * Get COM property/Object by name
     *
     * @param prop <string> the COM property Name
     * @returns
     */
    protected GetPropByRef(prop: string): any;

    /**
     * Create COM object
     * @param XvbaCom <XvbaCom>
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns <XvbaCom>
     */
    protected CreateObject(XvbaCom: XvbaCom, ...args: any): Object<any>;

    /**
     * Get COM number Property value by
     * pass COM property name
     *
     * @param prop <string> COM Property name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns
     */
    protected GetNumbValue(prop: string, ...args: any): number;

    /**
     * Get COM string Property value
     *
     * @param prop <string> COM Property name
     * @param args : arguments is an Array-like object <string | number | boolean >
     * @returns
     */
    protected GetStrValue(prop: string, ...args: any): string;

    /**
     *
     * Set String Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetStrValue(propToCall: string, value: string): void;

    /**
     *
     * Set Number Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetNumbValue(propToCall: string, value: number): void;

    /**
     *
     * Set Boolean Value to COM Property
     *
     * @param propToCall <string> COM Property name
     * @param value string value to set to the property
     * @returns void
     */
    protected SetBooleanValue(propToCall: string, value: Boolean): void;
    /**
     * Check the param type receive from  functions and return a number
     * correspond to the type in C++
     * @param value
     * @returns
     */

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

```

## Contributions

- Contributions are very welcome!