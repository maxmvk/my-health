import {Injector, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpLinkModule} from 'apollo-angular-link-http';
import {ApolloModule} from 'apollo-angular';
import {AppRoutingModule} from './app-routing.module';
import {GraphQLModule} from './graphql.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';

import {AuthModule} from './auth/auth.module';
import {ProtectionModule} from './protection/protection.module';

import {ApolloInterceptor} from './shared/services';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';
import {appReducer} from './shared/store/app/app.reducer';

const maskConfig: Partial<IConfig> = {
  validation: false
};

let AppInjector: Injector;

const ApolloProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: ApolloInterceptor
};

const JwtProvider: Provider = {
  useValue: JWT_OPTIONS,
  provide: JWT_OPTIONS
};

/**
 * imports: Firstly - AuthModule, than - AppRoutingModule (controlling empty "path")
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    GraphQLModule,
    ApolloModule,
    HttpLinkModule,
    BrowserAnimationsModule,
    ProtectionModule,
    NgxMaskModule.forRoot(maskConfig),
    StoreModule.forRoot({
      app: appReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    MatSnackBarModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectId),
    AngularFireDatabaseModule
  ],
  providers: [
    JwtProvider,
    ApolloProvider,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
