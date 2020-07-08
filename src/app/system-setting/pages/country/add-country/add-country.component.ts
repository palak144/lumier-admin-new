import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {

  currencies: string[];
  statuses: string[];

  constructor() { }

  ngOnInit() {
    this.currencies = ['Rupee.', 'Doller.', 'Pound'];
    this.statuses = ['Active.', 'Inactive.'];
  }

}
