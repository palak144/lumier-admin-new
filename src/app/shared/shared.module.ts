import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilityService } from './utility/utility.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import {TabMenuModule} from 'primeng/tabmenu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { QuillModule } from 'ngx-quill';
import { ErrorHandlerService } from './services/error-handler.service';
import { BaseService } from './services/base.service';
import { SharedDataService } from './services/shared-data.service';
import { FileUploadService } from './services/file-upload.service';
import { WebsiteContentService } from './services/website-content.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CategoriesService } from './services/categories.service';
//import { FrameManagementService } from './services/frame-management.service';
import { CompaniesService } from './services/companies.service';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';
import { ColorPickerModule } from 'ngx-color-picker';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PaginatorModule } from 'primeng/paginator';
import { TimeFormat } from './pipes/convert-time.pipe';
import { CustomerService } from './services/customers/customer.service';
import { ToastrModule } from 'ngx-toastr';


/** shared ,odule only for add / update frame front face image upload */

//import { FrameFrontFaceUploadComponent } from './components/frame-front-face-upload/frame-front-face-upload.component';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    NgbModule,
    CheckboxModule,
    DropdownModule,
    FileUploadComponent,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    NgxUiLoaderModule,
    TableModule,
    TooltipModule,
    TabMenuModule,
    AngularEditorModule,
    SafeHtmlPipe,
    QuillModule,
    ColorPickerModule,
    RadioButtonModule,
    PaginatorModule,
    TimeFormat,
    ToastrModule,
    // FrameFrontFaceUploadComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CheckboxModule,
    DropdownModule,
    ProgressSpinnerModule,
    MessageModule,
    MessagesModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    NgxUiLoaderModule,
    TableModule,
    TooltipModule,
    TabMenuModule,
    AngularEditorModule,
    QuillModule,
    ColorPickerModule,
    RadioButtonModule,
    PaginatorModule,
    ToastrModule.forRoot(),

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ToggleFullscreenDirective,
    FileUploadComponent,
    SafeHtmlPipe,
    TimeFormat,
    //FrameFrontFaceUploadComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        UtilityService,
        ConfirmationService,
        MessageService,
        ErrorHandlerService,
        BaseService,
        SharedDataService,
        FileUploadService,
        WebsiteContentService,
        TokenInterceptorService,
        CategoriesService,
        //FrameManagementService,
        DashboardService,
        CompaniesService,
        UserService,
        CustomerService
      ]
    };
  }
}
