
import { BannerService } from 'app/shared/services/website-element/banner.service';
import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from 'app/shared/services/common-service.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})

export class AddBannerComponent implements OnInit {

  addBannerForm : FormGroup;
  isSubmittedaddBannerForm: boolean = false;
  bannerTitle:string;
  position: string[];
  countries: any[];
  private _unsubscribe = new Subject<boolean>();
  supplyTypes: any[];
  selectedCountryId: any[];
  dLogo: string;
  activatedRoute: any;
  id: number;
  editMode: boolean;
  banner: any;
  file: any;
  companyFlagSize: boolean;
  companyLogo: any;
  selected_supplyType: any;
  selected_country: any;
  constructor(
    private commonService:CommonServiceService,
    private bannerService:BannerService,

  ) { }

  ngOnInit() {
    this.bannerTitle = "Add New Banner"
    this.dLogo = "assets/img/defaultImg.png";

    this.activatedRoute.params.subscribe(
      (id: Params) => {
        this.id = +id['id']
        this.editMode = id['id'] != null
        
        this.getCountry();
      }
    )
    this.initForm()
    this.selected_country = [];
    this.selected_supplyType = [];
  }

  get signUpControls() {
      return this.addBannerForm.controls
  }
  private initForm(){
    
    let name = "";
    let hyperlink = "";
    let file ="";
    let sequenceNumber ="";
    let position ="";
    let page ="";


    this.addBannerForm = new FormGroup({
      countryId:new FormControl(null,[Validators.required]),
      name: new FormControl( name, Validators.required),
    hyperlink: new FormControl( hyperlink, Validators.required),
      supplyTypeId: new FormControl( null, Validators.required),
      sequenceNumber: new FormControl( sequenceNumber, Validators.required),
      position: new FormControl( position, Validators.required),
      page: new FormControl( page, Validators.required),

    });
    
        if(this.editMode){
          this.bannerTitle = "Edit Banner "
          this.addBannerForm.addControl(
            "file", new FormControl( file,),
          );
          this.bannerService.getBannerDetails(this.id).pipe(takeUntil(this._unsubscribe)).subscribe(
            (success:any)=>{          
              this.banner=success.data
              this.commonService.getSupplyType(this.banner.countryId).pipe(takeUntil(this._unsubscribe)).subscribe(
                (success:any) => {
                  this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
                },
                error => {
                }
              )
              this.addBannerForm.patchValue({
                "name" : this.banner.manufacturerName,
            })
            
            this.file = this.banner.logoName
            this.companyFlagSize = true;
            this.companyLogo = this.banner.logo,
            this.selected_country= this.banner.countryId;
            this.selected_supplyType = this.banner.supplyTypeId;
          },
            error=>{          
            }
          )
          }
          else{
            this.addBannerForm.addControl(
              "file", new FormControl( file,Validators.required),
            );
          }
    
    }
  getdropdown1(event:any){
    this.selectedCountryId = event.value
    this.getSupplyType();  }
  getCountry()
  {
    this.commonService.getCountry().pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.countries = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  getSupplyType()
  {
    
    this.commonService.getSupplyType(this.selectedCountryId).pipe(takeUntil(this._unsubscribe)).subscribe(
      (success:any) => {
        
        this.supplyTypes = this.arrayOfStringsToArrayOfObjects(success.data);
      },
      error => {
      }
    )
  }
  arrayOfStringsToArrayOfObjects(arr: any[]) {
    const newArray = [];
    arr.forEach(element => {
      newArray.push({
        label: element.itemName,
        value: element.id
      });
    });
    return newArray;
  }
}
