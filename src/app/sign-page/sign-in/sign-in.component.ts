import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, pipe } from 'rxjs';
import { AuthUser } from '../AuthUser.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  user = new Subject<AuthUser>();

  @Input() error: string | null;
  signInForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      mail: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    this.isLoading = true;

    this.authService
      .signIn(
        this.signInForm.get('mail')?.value,
        this.signInForm.get('password')?.value,
      )
      .subscribe(
        (resData) => {
          this.isLoading = false;
          this.router.navigate(['/mainPage']);
        },
        (errorMessage) => {
          // console.log(errorMessage);
          this.error = errorMessage;
          console.log(this.error);
          this.isLoading = false;
        },
      );
    // .subscribe(
    //   (res: any) => {
    //     // console.log(res);
    //     const expirationDate = new Date(
    //       new Date().getTime() + res.expiresIn * 1000,
    //     );
    //     const user = new AuthUser(
    //       res.email,
    //       res.localId,
    //       res.idToken,
    //       expirationDate,
    //     );

    //     if (user.token) {
    //       this.router.navigate(['/mainPage']);
    //     } else {
    //       this.isLoading = false;
    //       this.error =
    //         'Current authentication tokes is expired. Try another time';
    //       this.signInForm.reset();
    //     }
    //   },
    //   (err: any) => {
    //     this.isLoading = false;
    //     if (err.error.error.message == 'EMAIL_NOT_FOUND') {
    //       this.error =
    //         'There is no user record corresponding to this identifier. The user may have been deleted';

    //       this.signInForm.reset();
    //     } else if (err.error.error.message == 'INVALID_PASSWORD') {
    //       this.error =
    //         'The password is invalid or the user does not have a password';
    //     } else if (err.error.error.message == 'USER_DISABLED') {
    //       this.error =
    //         'The user account has been disabled by an administrator';
    //     } else if (err.error.error.message == 'INVALID_LOGIN_CREDENTIALS') {
    //       this.error = 'The password or the Email is invalid';
    //     } else {
    //       this.error = err.error.error.message;
    //     }
    //   },
    // );
  }

  onHandlerClose() {
    this.error = null;
  }

  //Change Sign Page
  @Output() onChange = new EventEmitter<boolean>();
  setSignPageValue() {
    this.onChange.emit(true);
  }
}
