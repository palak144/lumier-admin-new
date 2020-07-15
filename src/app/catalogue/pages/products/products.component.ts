import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
// import {MenuItem} from 'primeng/api';

interface Country {
  _id:string, 
  country:string
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbTabsetConfig]
})

export class ProductsComponent implements OnInit {

  productTitle:string;
  addProductForm: FormGroup; 
  isSubmittedaddProductForm: boolean = false;
  productValue: any;
  // private _unsubscribe = new Subject<boolean>();
  titles: string[];
  editMode = false;
  id: number;
  addProductFormDetails: any;
  product: any;
  countries:Country[];


  constructor(config: NgbTabsetConfig) {
    // customize default values of tabsets used by this component tree
    // config.justify = 'center';
    config.type = 'pills';
  }


  // items: MenuItem[];
    
  //   activeItem: MenuItem;

  //   ngOnInit() {
  //       this.items = [
  //           {label: 'Home', icon: 'pi pi-fw pi-home'},
  //           {label: 'Calendar', icon: 'pi pi-fw pi-calendar'},
  //           {label: 'Edit', icon: 'pi pi-fw pi-pencil'},
  //           {label: 'Documentation', icon: 'pi pi-fw pi-file'},
  //           {label: 'Settings', icon: 'pi pi-fw pi-cog'}
  //       ];
        
  //       this.activeItem = this.items[0];
  //   }

  

  ngOnInit() {
  }

}
