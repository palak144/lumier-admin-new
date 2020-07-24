import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-combos',
  templateUrl: './add-combos.component.html',
  styleUrls: ['./add-combos.component.scss']
})
export class AddCombosComponent implements OnInit {

  comboTitle:string;
  addComboForm: FormGroup; 
  isSubmittedaddComboForm: boolean = false;
  private fieldArray: Array<any> = [];
  private newAttribute: any = {};
  private varientArray: Array<any> = [];

  addVarientValue() {
    this.varientArray.push(this.newAttribute)
    this.newAttribute = {};
}

  addFieldValue() {
    this.fieldArray.push(this.newAttribute)
    this.newAttribute = {};
}

deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
}

  constructor() { }

  ngOnInit() {
    this.comboTitle = "Add New Combo";
  } 

}
