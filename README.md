# XvbaCom

- Create Windows COM like Excel for use in Node Js

- This package works like a Framework where you extends your class 
and use the methods for conect to Windows COM 

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

import { XvbaCOM } from "xvbacomjs";
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


## Contributions

- Contributions are very welcome!