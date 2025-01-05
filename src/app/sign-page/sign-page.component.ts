import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrl: './sign-page.component.scss',
})
export class SignPageComponent {
  isSignUpPage = false;

  pageChanger(val: boolean) {
    this.isSignUpPage = val;
  }
}
