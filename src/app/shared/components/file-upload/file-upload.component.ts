import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { UtilityService } from 'app/shared/utility/utility.service';
import { FileUploadService } from 'app/shared/services/file-upload.service';
import { ErrorHandlerService } from 'app/shared/services/error-handler.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() businessId: string;
  @Input() currentImage: string;
  @Input() basePathToUploadFiles: string;
  @Output() downloadUrl = new EventEmitter();
  @ViewChild('inputFile') fileUploadInput: ElementRef;

  dialogMessages = [];
  imagePath;
  previewImage: any;
  message: string;
  uploadProgressPercent: number;
  progressState: string;
  // uploadTask: AngularFireUploadTask;
  current_page = 1;
  displayAddImageForm = false;
  eventFromFileInput: any;
  finalDownloadUrl: string;
  spinnerStatus = false;

  constructor(
    private utilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private fileUploadService: FileUploadService,
    private errorHandlerService: ErrorHandlerService,
    private loader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    // display current image in image preview if there is any during EDIT
    if (this.currentImage) {
      this.previewImage = this.currentImage;
    }
  }

  notifyParentDataUpdated() {
    this.downloadUrl.emit(this.finalDownloadUrl);
  }

  preview(file) {
    this.eventFromFileInput = file;
    const files = file.target.files;
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.previewImage = reader.result;

    };
  }

  uploadFile() {
    // this.loader.start();
    this.spinnerStatus = true;
    const file = this.eventFromFileInput.target.files[0];

    // create a unique file name by adding timestamp
    // const currentTimeStamp = new Date();
    // const filePath = `${this.basePathToUploadFiles}/${
    //   file.name
    // }${currentTimeStamp.toISOString()}`;

    this.fileUploadService.fileUploadImage(file).subscribe(
      (success: any) => {
        this.spinnerStatus = false;
        this.finalDownloadUrl = success.image;
        this.notifyParentDataUpdated();
        this.spinnerStatus = false;
      },
      error => {
        this.errorHandlerService.routeAccordingToError(error);
        this.spinnerStatus = false;
      }
    );

    // get notified when the download URL is available - if download link is required for image
    /*
                this.finalDownloadUrl = url;
                this.notifyParentDataUpdated();
                this.spinnerStatus = false;
    */
  }

  cancelCurrentUpload() {
    this.resetUploadInputForm();
  }

  resetUploadInputForm() {
    this.fileUploadInput.nativeElement.value = '';

    // if there was a image already during edit - reset to the original image present
    if (this.currentImage) {
      this.previewImage = this.currentImage;
    } else {
      this.previewImage = null;
    }
    this.progressState = null;
    this.eventFromFileInput = null;
    this.uploadProgressPercent = 0;
    this.dialogMessages = [];
  }
}
