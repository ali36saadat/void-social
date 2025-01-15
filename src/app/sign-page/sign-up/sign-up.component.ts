import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Injectable,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  @Input() error: string | null;
  isLoading = false;
  forbiddenUsernameList: string[] = [];
  signUpForm: FormGroup;
  passwordStatus = '0';
  usernameStatus = '0';
  emailStatus = '0';

  status: {
    [key: string]: string;
  } = {
    '0': 'sign__up--input-element--empty',
    '1': 'sign__up--input-element--red',
    '2': 'sign__up--input-element--yellow',
    '3': 'sign__up--input-element--green',
  };

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
      }),
      username: new FormControl(null, [
        Validators.required,
        this.forbiddenUsername.bind(this),
        Validators.minLength(4),
      ]),
      mail: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
      ]),
    });
  }

  forbiddenUsername(control: FormControl): { [s: string]: boolean } | null {
    if (this.forbiddenUsernameList.indexOf(control.value) !== -1) {
      return { usernameIsForbidden: true };
    }
    return null;
  }

  onPasswordInputChange(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    if (inputValue.length == 0) {
      this.passwordStatus = '0';
    } else if (inputValue.length < 8) {
      this.passwordStatus = '1';
    } else if (
      inputValue.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      )
    ) {
      this.passwordStatus = '3';
    } else if (
      inputValue.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    ) {
      this.passwordStatus = '2';
    } else {
      this.passwordStatus = '1';
    }
  }

  onUsernameInputChange(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;
    if (inputValue.length == 0) {
      this.usernameStatus = '0';
    } else if (inputValue.length < 4) {
      this.usernameStatus = '1';
    } else {
      // this.http
      //   .get(`http://localhost:3000/users?username=${inputValue}`)
      //   .subscribe((res: any) => {
      //     if (res.length == 0) {
      //       this.usernameStatus = '3';
      //     } else {
      //       this.usernameStatus = '1';
      //     }
      //   });
      if (
        this.forbiddenUsernameList.some(
          (username) => username === this.signUpForm.get('username')?.value,
        )
      ) {
        this.usernameStatus = '1';
      } else {
        this.usernameStatus = '3';
      }
    }
  }

  onEmailInputChange(event: Event): void {
    const inputValue: string = (event.target as HTMLInputElement).value;

    if (inputValue.length == 0) {
      this.emailStatus = '0';
    } else if (
      inputValue.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)
    ) {
      this.emailStatus = '3';
    } else {
      this.emailStatus = '1';
    }
  }

  onHandlerClose() {
    this.error = null;
  }

  onSubmit() {
    this.isLoading = true;

    const usernameValue = this.signUpForm.get('username')?.value;

    this.authService.signup(
      this.signUpForm.get('name')?.value,
      usernameValue,
      this.signUpForm.get('mail')?.value,
      this.signUpForm.get('password')?.value,
    );
    // .subscribe(
    //   (resData: any) => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage: any) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   },
    // );

    this.signUpForm.reset();

    // let Auth: Observable<AuthResponseData>;
    // this.isLoading = true;
    // const usernameValue = this.signUpForm.get('username')?.value;
    // const signIn = this.authService.signup(
    //   usernameValue,
    //   this.signUpForm.get('mail')?.value,
    //   this.signUpForm.get('password')?.value,
    // );
    // signIn.subscribe(
    //   (res2) => {
    //     const signInUserData = {
    //       id: res2.localId,
    //       name: this.signUpForm.value.name,
    //       email: this.signUpForm.value.mail,
    //       username: this.signUpForm.value.username,
    //     };
    //     this.http
    //       .post('http://localhost:3000/users', signInUserData)
    //       .subscribe();
    //     this.setSignPageValue();
    //     // this.signUpForm.reset();
    //     // this.passwordStatus = '0';
    //     // this.usernameStatus = '0';
    //     // this.emailStatus = '0';
    //   },
    //   (err) => {
    //     this.isLoading = false;
    //     if (err.error.error.message == 'EMAIL_EXISTS') {
    //       this.error = 'The email address is already in use by another account';
    //       this.signUpForm.get('mail')?.reset();
    //       this.emailStatus = '0';
    //     } else if (err.error.error.message == 'OPERATION_NOT_ALLOWED') {
    //       this.error = 'Password sign-in is disabled for this project';
    //     } else if (err.error.error.message == 'TOO_MANY_ATTEMPTS_TRY_LATER') {
    //       this.error =
    //         'We have blocked all requests from this device due to unusual activity. Try again later';
    //     } else {
    //       this.error = err.error.error.message;
    //     }
    //   },
    // );
    // // this.http
    // //   .get(`http://localhost:3000/users?username=${usernameValue}`)
    // //   .subscribe((res: any) => {
    // //     if (Object.keys(res).length) {
    // //       this.isLoading = false;
    // //       this.forbiddenUsernameList.push(res[0].username);
    // //       this.error = 'The username is already in use by another account.';
    // //       this.signUpForm.get('username')?.reset();
    // //       this.usernameStatus = '0';
    // //     } else {
    // //       this.http
    // //         .post<AuthResponseData>(
    // //           `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDszLYU8Z6ypEdDI7nVatUu5Kdv1YbzVOY`,
    // //           {
    // //             email: this.signUpForm.get('mail')?.value,
    // //             password: this.signUpForm.get('password')?.value,
    // //             returnSecureToken: true,
    // //           },
    // //         )
    // //         .subscribe(
    // //           (res2) => {
    // //             this.isLoading = false;
    // //             const signInUserData = {
    // //               id: res2.localId,
    // //               name: this.signUpForm.value.name,
    // //               email: this.signUpForm.value.mail,
    // //               username: this.signUpForm.value.username,
    // //             };
    // //             this.http
    // //               .post('http://localhost:3000/users', signInUserData)
    // //               .subscribe();
    // //             this.setSignPageValue();
    // //             // this.signUpForm.reset();
    // //             // this.passwordStatus = '0';
    // //             // this.usernameStatus = '0';
    // //             // this.emailStatus = '0';
    // //           },
    // //           (err) => {
    // //             this.isLoading = false;
    // //             if (err.error.error.message == 'EMAIL_EXISTS') {
    // //               this.error =
    // //                 'The email address is already in use by another account';
    // //               this.signUpForm.get('mail')?.reset();
    // //               this.emailStatus = '0';
    // //             } else if (err.error.error.message == 'OPERATION_NOT_ALLOWED') {
    // //               this.error = 'Password sign-in is disabled for this project';
    // //             } else if (
    // //               err.error.error.message == 'TOO_MANY_ATTEMPTS_TRY_LATER'
    // //             ) {
    // //               this.error =
    // //                 'We have blocked all requests from this device due to unusual activity. Try again later';
    // //             } else {
    // //               this.error = err.error.error.message;
    // //             }
    // //           },
    // //         );
    // //     }
    // //   });
    // // this.signUpForm.reset();
  }

  //Change Sign Page
  @Output() onChange = new EventEmitter<boolean>();
  setSignPageValue() {
    this.onChange.emit(false);
  }
}
