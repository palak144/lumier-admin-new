import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../shared/services/catalogue/product.service';
import { ToastrService } from 'ngx-toastr';
import { UtilityService } from '../../../../shared/utility/utility.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportProductComponent implements OnInit {
  addimportForm: FormGroup;
  isSubmittedaddImportForm:boolean=false;
  private _unsubscribe = new Subject<boolean>();
data = [
  {
    "productName":"Admin 1",
    "productLink":"assets/iBulk_Upload_file_Toolv1.xlsm",
    "time":"08-09-2020"
  }
]
  datastring: string;
  file: any = "";
  fileName: any;

  constructor(  private activateRoute : ActivatedRoute,
    private utilityService:UtilityService, private ProductService:ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.addimportForm = new FormGroup({
 
      "file": new FormControl('', Validators.required),
    })
  }
  download(){
      
    window.open("assets/Bulk_Upload_file_Toolv1.xlsm", "_blank")
   }
  onFileChange(ev) {
    
    this.file = ev.target.files[0];
    this.fileName = this.file.name
      }
      convertData(){
        let workBook = null;
        let jsonData = null;
        const reader = new FileReader();
        
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
          this.datastring = dataString;
        }
        reader.readAsBinaryString(this.file);
      }
      onSubmitFileForm()
      {
        this.isSubmittedaddImportForm=true;
        if (this.addimportForm.invalid) {
          return
        }
        this.convertData()
        const formData = new FormData();
     
        formData.append("importfile", this.datastring);
        this.ProductService.ImportFileData(formData).pipe(takeUntil(this._unsubscribe)).subscribe(
          (response) => {
      this.toastr.success('File Upload Successfully!');
          },
          error => {
            this.toastr.error('error',error.error.message);
          }
        )
      }
      get importControls() {
        return this.addimportForm.controls;
      }
}
