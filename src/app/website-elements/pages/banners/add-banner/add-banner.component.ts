
import { BannerService } from '../../../../shared/services/website-element/banner.service';
import { Component, OnInit, LOCALE_ID, Inject} from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject} from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { CommonServiceService } from '../../../../shared/services/common-service.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})

export class AddBannerComponent implements OnInit {

  addBannerForm : FormGroup;
  isSubmittedaddBannerForm: boolean = false;
  bannerTitle:string;
  countries: any[];
  private _unsubscribe = new Subject<boolean>();
  supplyTypes: any[];
  selectedCountryId: any[];
  dLogo: string;
  id: number;
  editMode: boolean;
  banner: any;
  file: any;
  companyFlagSize: boolean = false;
  companyLogo: any;
  selected_supplyType: any;
  selected_country: any;
  selected_endDate :any
  selected_startDate :any
  addBannerFormDetails: any;
  pages: string[];
  positions: string[];
  url: string | ArrayBuffer;
  selected_page: any[];
  selected_position: any[];
  startDate: any;
  endDate: any;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonServiceService,
    private toastr: ToastrService,
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

    // this.pages = ['landing page' , 'Get an equipment', 'Group buy Products','Offers', 'Dental', 'Medical', 'My Wallet', 'Lumier32 Loyality Program' ];
    this.positions = ['Main','Inner Page']
    this.initForm()
    this.selected_country = [];
    this.selected_supplyType = [];
    this.selected_page = [];
    this.selected_position = [];
    this.startDate = [];
    this.endDate = [];
  }

  get signUpControls() {
      return this.addBannerForm.controls
  }

  fileChangeEvent(fileInput : any){
  
    this.file = fileInput.target.files[0];
    
    var last = this.file.name.substring(this.file.name.lastIndexOf(".") + 1, this.file.name.length); 
    if(this.file.type == "image/jpeg" || this.file.type == "image/jpg" || this.file.type == "image/png")
    if (this.file.size < 200000) {
    {
      this.companyFlagSize = true;
       let reader = new FileReader();      
        reader.readAsDataURL(this.file);      
        reader.onload = (event) => {
           this.url = reader.result;
          this.companyLogo = this.url;        
          document.getElementById('sizeValidations').style.color = 'black';
        }
        this.addBannerForm.controls['file'].setValue(this.file ? this.file : '');
        this.file = this.file.name
      }
    }
      else {
        this.companyFlagSize = false;
        
        document.getElementById('sizeValidations').style.color = '#ffae42';
        this.addBannerForm.controls['file'].setValue(this.file ? '' : '');
      }
  }
  onSubmitBannerForm(){
      event.preventDefault();
  
      this.isSubmittedaddBannerForm = true
      if (this.addBannerForm.invalid) {
        return
      }
      let noEndDate = (this.addBannerForm.get('noEndDate').value == true) ? "2099/12/01" :  this.addBannerForm.get('endDate').value 

      this.addBannerFormDetails = {
        "name": this.addBannerForm.get('name').value,
        "hyperlink": this.addBannerForm.get('hyperlink').value,
        "countryId": this.addBannerForm.get('countryId').value,
        "file": this.addBannerForm.get('file').value,
        "supplyTypeId":this.addBannerForm.get('supplyTypeId').value,
        "sequenceNumber": 1,
        // "page":this.addBannerForm.get('page').value,
        "position":this.addBannerForm.get('position').value,
        "startDate":this.addBannerForm.get('startDate').value,
        "endDate":noEndDate,
      }
      
      if (this.id ) {
        this.addBannerFormDetails.id = this.id;
      }
      if (this.editMode) {
        
        this.bannerService.addBanner(this.addBannerFormDetails ).subscribe(
          data => {
          this.toastr.success("Banner Edited Successfully")
            this.router.navigate(['/website-elements/banners'],{relativeTo : this.activatedRoute})
          },
          error => {
            this.toastr.error(error.message)
          });
      }
      else{
      this.bannerService.addBanner(this.addBannerFormDetails).subscribe(
        data => {
          this.toastr.success("Banner Added Successfully")
          this.router.navigate(['/website-elements/banners'],{relativeTo : this.activatedRoute})
        },
        error => {
          this.toastr.error(error.message)
  
        });
      }
    
  }

  private initForm(){
    let name = "";
    let hyperlink = "";
    let file ="";
    // let sequenceNumber ="";
    let page ="";
    let position ="";

    this.addBannerForm = new FormGroup({
      countryId:new FormControl(null,[Validators.required]),
      name: new FormControl( name, Validators.required),
    hyperlink: new FormControl( hyperlink, Validators.required),
      supplyTypeId: new FormControl( null, Validators.required),
      // sequenceNumber: new FormControl( sequenceNumber,[Validators.required, Validators.pattern('^[1-5]{1,1}$')] ),
      // page: new FormControl( page, Validators.required),
      position: new FormControl( position, Validators.required),
      startDate: new FormControl( null, Validators.required),
      endDate: new FormControl( null),
      noEndDate: new FormControl('')
    });
    
        if(this.editMode){
          this.bannerTitle = "Edit Banner"
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
                "name" : this.banner.name,
                "hyperlink" : this.banner.hyperLink,
               
             })
             
            console.log(this.addBannerForm.patchValue)
            this.file = this.banner.logoName
            this.companyFlagSize = true;
            this.companyLogo = this.banner.image,
            this.selected_country= this.banner.countryId;
            this.selected_supplyType = this.banner.supplyTypeId;
            // this.selected_page= this.banner.page;
            this.selected_position = this.banner.position;
            this.selected_startDate = formatDate(this.banner.startDate,'yyyy-MM-dd',this.locale),
           this.selected_endDate = formatDate(this.banner.endDate,'yyyy-MM-dd',this.locale)
            
          }
          ,
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
    this.getSupplyType();  
  }

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
