import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportProductComponent implements OnInit {
data = [
  {
    "productName":"Admin 1",
    "productLink":"assets/iBulk_Upload_file_Toolv1.xlsm",
    "time":"08-09-2020"
  }
]
  constructor() { }
  ngOnInit() {
  }
  download(){
      
    window.open("assets/Bulk_Upload_file_Toolv1.xlsm", "_blank")
   }
  onFileChange(ev) {
    
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      var counter = 0;
    var tempArr =[]
    
    for (var i = 0; i < jsonData.Sheet1.length ; i ++) {
        if (jsonData.Sheet1[i].PV === 'P'){
            counter ++ 
            jsonData.Sheet1[i].elemID = counter
            tempArr.push(jsonData.Sheet1[i])
            
        } 
        else if (jsonData.Sheet1[i].PV ==='V') {
          jsonData.Sheet1[i].elemID = counter
            tempArr.push(jsonData.Sheet1[i])
        }
        jsonData.Sheet1[i].rowNumber = i+1
    }
    
      const dataString = JSON.stringify(jsonData.Sheet1);
      console.log(jsonData.Sheet1)
      console.log(dataString)
    }
    reader.readAsBinaryString(file);
      }
}
