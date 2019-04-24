import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { TdMediaService } from '@covalent/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  userSubscription: Subscription;
  user: any;

  constructor(
    public media: TdMediaService, 
     private authService: AuthService,
     private router: Router,
     private translate: TranslateService) {
      translate.setDefaultLang('en');
}

  ngOnInit() {
    this.authService.me().subscribe(data => {
      this.user = data.user;
    });

    // update this.user after login/register/logout
    this.userSubscription = this.authService.$userSource.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.signOut();
    this.redirect('/auth/login');
  }

  navigate(link): void {
    this.router.navigate([link]);
  }

  redirect(link): void {
    this.router.navigateByUrl(link);
  }

  ngOnDestroy() { 
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}


