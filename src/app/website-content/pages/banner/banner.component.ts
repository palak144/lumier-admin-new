import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UtilityService } from 'app/shared/utility/utility.service';
import { WebsiteContentService } from 'app/shared/services/website-content.service';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { SharedDataService } from 'app/shared/services/shared-data.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  displayAddBannerForm = false;
  basePathToUploadFiles = 'samplePath/';
  infoMsgsInFileUpload: any[] = [];
  fileUrlFromUploader: string;
  bannersListing: any;
  currentBannerImage: string;
  imageToEdit: any;

  // tslint:disable-next-line: max-line-length
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loader: NgxUiLoaderService,
    private utilityService: UtilityService,
    private websiteContentService: WebsiteContentService,
    private errorHandler: ErrorHandlerService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.getAllBanners();
  }

  openAddBannerForm(item?) {
    // opened for add
    if (!item) {
      if (this.bannersListing.length === 6) {
        this.messageService.add({
          severity: 'info',
          summary: 'Cannot add more than 6 banners.'
        });
      } else {
        this.displayAddBannerForm = true;
      }
    } else {
      // edit
      this.imageToEdit = item;
      this.displayAddBannerForm = true;
    }
  }

  closeAddBannerForm() {
    this.displayAddBannerForm = false;
    this.imageToEdit = null;
  }

  getDownloadUrl(event) {
    this.fileUrlFromUploader = event;
    this.addEditBanner();
  }

  getAllBanners() {
    this.loader.start();
    this.websiteContentService.getAllBanners().subscribe(
      (success: any) => {
        this.bannersListing = success.data.bannerList;

        // set the chosen banner as 1st by default
        this.setCurrentBannerImage(this.bannersListing[0]);

        this.utilityService.scrollToTop();
        this.loader.stop();
      },
      error => {
        this.errorHandler.routeAccordingToError(error);
        this.utilityService.scrollToTop();
        this.loader.stop();
      }
    );
  }

  addEditBanner() {
    let bannerData;
    if (this.bannersListing.length === 6) {
      this.messageService.add({
        severity: 'info',
        summary: 'Cannot add more than 6 banners. Delete old to add new banner'
      });
    } else {
      this.loader.start();

      // edit banner
      if (this.imageToEdit) {
        bannerData = {
          id: this.imageToEdit.id,
          banner_image: this.fileUrlFromUploader
        };
      } else {
        // add banner
        bannerData = { banner_image: this.fileUrlFromUploader };
      }
      this.websiteContentService.addEditBanner(bannerData).subscribe(
        (success: any) => {
          this.sharedDataService.successMessage('Banner Added Successfully!');
          this.displayAddBannerForm = false;
          this.imageToEdit = null;
          this.getAllBanners();
        },
        error => {
          this.errorHandler.routeAccordingToError(error);
          this.loader.stop();
        }
      );
    }
  }

  deleteBanner(id: number) {
    if (this.bannersListing.length === 1) {
      this.messageService.add({
        severity: 'info',
        summary: 'Cannot delete all banners.'
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        accept: () => {
          this.loader.start();

          this.websiteContentService.deleteBanner(id).subscribe(
            (success: any) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Banner Deleted.',
                life: 3000
              });
              this.getAllBanners();
            },
            error => {
              this.errorHandler.routeAccordingToError(error);
              this.utilityService.scrollToTop();
              this.loader.stop();
            }
          );
        }
      });
    }
  }

  setCurrentBannerImage(item) {
    this.currentBannerImage = item.banner_image;
    this.utilityService.scrollToTop();
  }
}
