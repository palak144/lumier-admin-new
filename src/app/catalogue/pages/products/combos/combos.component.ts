import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

interface Country {
  _id:string, 
  country:string
}

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.scss']
})
export class CombosComponent implements OnInit {

  comboTitle:string;
  addComboForm: FormGroup; 
  isSubmittedaddComboForm: boolean = false;
  comboValue: any;
  // private _unsubscribe = new Subject<boolean>();
  titles: string[];
  editMode = false;
  id: number;
  addComboFormDetails: any;
  combo: any;
  countries:Country[];

  constructor() { }

  ngOnInit() {
  }

}
