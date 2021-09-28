
import { Excel } from "../api/Excel/Excel";
import { WorkBook } from "../api/Excel/WorkBook";
import { VBComponent } from "../api/Excel/VBComponent";

export const tryExcel = async () => {
  try {
    let excel = new Excel();

    excel.Visible();
    let Book: WorkBook = excel.WorkBooks.Open("F:\\Apps\\XvbaCom\\index.xlsb");

    let sheets = excel.Sheets
    
    let total = sheets.Count();
    console.log("--->", total);
    let exName = excel.Name();
    console.log("--->", exName);
    let totalComp =Book.VBProject.VBComponents.Count;
   console.log("--->",totalComp);



   for (let index = 0; index < totalComp; index++) {


    const vbComponent :VBComponent = Book.VBProject.VBComponents.Item(index  + 1);
    const compName = vbComponent.Name
    let compFileName = ""

    switch (vbComponent.Type) {

        case 1:
            compFileName = compName + ".bas"
            break;
        case 2:
            compFileName = compName + ".cls"
            break;
        case 3:
            compFileName = compName + ".frm"
            break;
        case 100:
            compFileName = compName + ".cls"
            break;


        default:
            break;
    }

    setTimeout(() => {
      
    }, 3000);
    const fileExport  = "F:\\Apps\\XvbaCom\\vba\\" + compFileName;

    vbComponent.Export(fileExport);


}



    Excel.CloseAllCOMWithDelay();
  } catch (error) {
    console.log(error);
    Excel.CloseAllCOM();
  }
};


