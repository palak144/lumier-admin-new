import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
  
})
export class AddProductComponent implements OnInit {

 
  productTitle:string;
  addProductForm: FormGroup; 
  isSubmittedaddProductForm: boolean = false;
  permissions: any;
  closeResult: string;
  languages: string[];
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private basedArray: Array<any> = [];
  manufacturerBrands: string[];
  countryOrigins: string[];
  supplyTypes: string[];
  categories: string[];
  specialityTypes: string[];
  
  constructor(
    private modalService: NgbModal,
  ) { }

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
}

addBasedValue() {
  this.basedArray.push(this.newAttribute)
  this.newAttribute = {};
}

// deleteFieldValue(index) {
//     this.fieldArray.splice(index, 1);
// }

  ngOnInit() {

    this.productTitle = "Add New Product";
    this.languages = ['Hindi', 'English'];
    this.manufacturerBrands = ['One', 'Two', 'Three', 'Four'];
    this.countryOrigins = ['India', 'Australia', 'USA', 'Singapour.'];
    this.supplyTypes = ['Dental', 'Madical'];
    this.categories = ['category-one', 'category-two', 'category-three'];
    this.specialityTypes = ['Dental', 'Madical'];
    // this.initForm();
  }

  private initForm(){
    
    let name = "";
    
    this.addProductForm = new FormGroup({
      "countryId":new FormControl(null,[Validators.required]),
      "name": new FormControl( name, Validators.required),
    });
    
    }


  open(content , permission) {
    
    this.permissions = permission
    this.modalService.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

  // This function is used in open
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return `with: ${reason}`;
  }
}


}
