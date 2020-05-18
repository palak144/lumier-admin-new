import { Component, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';
import { SharedDataService } from '../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewChecked {
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;

  constructor(
    private loader: NgxUiLoaderService,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) { }

  ngAfterViewChecked() {
    // setTimeout(() => {
    //     var wrapperDiv = document.getElementsByClassName("wrapper")[0];
    //     var dir = wrapperDiv.getAttribute("dir");
    //     if (dir === 'rtl') {
    //         this.placement = 'bottom-left';
    //     }
    //     else if (dir === 'ltr') {
    //         this.placement = 'bottom-right';
    //     }
    // }, 3000);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else this.toggleClass = 'ft-maximize';
  }

  logout() {
    this.loader.start();
    this.authService.logout();
    this.loader.stop();
  }

  setting() {
    this.router.navigateByUrl('setting/profile');
  }
}
