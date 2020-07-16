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

  constructor() { }

  ngOnInit() {
    this.comboTitle = "Add New Combo";
  } 

}
