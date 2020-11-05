import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

import {SiteRoutingModule} from './site-routing.module';
import {SharedPipesModule} from './modules';
import {SiteComponent} from './site.component';
import {
  NavbarComponent,
  NotificationButtonComponent,
  HeaderComponent,
  LogoutButtonComponent,
  NavbarLinkComponent,
  UserProfileComponent
} from './components';
import {AuthGuard, ProtectionProductionGuard} from 'src/app/shared/guards';
import {avatarReducer, userReducer} from 'src/app/site/store';
import {tabsControllerReducer} from './store';
import {pagesSheetReducer} from './store/pagesSheets/pagesSheets.reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SiteRoutingModule,
    StoreModule.forFeature('site', {
      userData: userReducer,
      avatarData: avatarReducer,
      tabsController: tabsControllerReducer,
      pagesSheet: pagesSheetReducer
    }),
    SharedPipesModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatRippleModule,
    MatIconModule
  ],
  declarations: [
    LogoutButtonComponent,
    NavbarLinkComponent,
    UserProfileComponent,
    HeaderComponent,
    SiteComponent,
    NavbarComponent,
    NotificationButtonComponent
  ],
  providers: [
    ProtectionProductionGuard,
    AuthGuard
  ]
})
export class SiteModule {
}
