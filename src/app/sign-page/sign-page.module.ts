import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SignPageComponent } from './sign-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignSideComponent } from './sign-side/sign-side.component';
import { SignAlertComponent } from '../shared/sign-alert/sign-alert.component';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { SignPageRoutingModule } from './sign-page-routing.module';

@NgModule({
  declarations: [
    SignPageComponent,
    SignInComponent,
    SignUpComponent,
    SignSideComponent,
    SignAlertComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    SignPageRoutingModule,
  ],
  exports: [
    SignPageComponent,
    SignInComponent,
    SignUpComponent,
    SignSideComponent,
    SignAlertComponent,
    LoadingSpinnerComponent,
  ],
})
export class SignPageModule {}
