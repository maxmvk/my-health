import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxMaskModule} from 'ngx-mask';

import {AuthComponent} from './auth.component';
import {CheckEmailComponent} from './pages/check-email/check-email.component';
import {RegisterComponent} from './pages/register/register.component';
import {ResetPasswordComponent} from './pages/reset-password/reset-password.component';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {AuthenticationComponent} from './pages/authentication/authentication.component';
import {UpdatePasswordComponent} from './pages/update-password/update-password.component';
import {VerifyEmailComponent} from './pages/verify-email/verify-email.component';
import {VerificationErrorComponent} from './components/verification-error/verification-error.component';
import {ProtectionProductionGuard} from '../shared/guards';
import {LoaderModule} from '../shared/modules/loader/loader.module';

const routes: Routes = [
  {
    path: '', component: AuthComponent, canActivate: [ProtectionProductionGuard], children: [
      {path: '', component: SignInComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'authentication', component: AuthenticationComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'check-email', component: CheckEmailComponent},
      {path: 'update-password/:token', component: UpdatePasswordComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    CheckEmailComponent,
    RegisterComponent,
    ResetPasswordComponent,
    SignInComponent,
    AuthenticationComponent,
    UpdatePasswordComponent,
    VerifyEmailComponent,
    VerificationErrorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxMaskModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    LoaderModule
  ],
  providers: [ProtectionProductionGuard]
})
export class AuthModule {
}
