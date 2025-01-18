import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, subscribeOn, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, map, filter, switchMap } from 'rxjs';
import { AuthUser } from './AuthUser.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<AuthUser | null>(null);

  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signup(fullName: object, username: string, email: string, password: string) {
    this.http
      .get(`http://localhost:3000/users?username=${username}`)
      .pipe(
        switchMap((res: any) => {
          if (res.length === 0) {
            return throwError(() => new Error('The array is empty!'));
          }
          catchError(this.handleError);
          return res;
        }),
      )
      .subscribe((res) => console.log(res));
    // return this.http
    //   .get(`http://localhost:3000/users/?username=${username}`)
    //   .subscribe((res: any) => {
    //     if (Object.keys(res).length) {
    //       res.forbiddenUsernameList.push(res[0].username);
    //       res.error = 'The username is already in use by another account.';
    //       res.signUpForm.get('username')?.reset();
    //       res.usernameStatus = '0';
    //     }
    //   });
  }

  signIn(mail: string, password: string) {
    return this.http
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDszLYU8Z6ypEdDI7nVatUu5Kdv1YbzVOY',
        {
          email: mail,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.handleError),
        tap((resData: any) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn,
          );
        }),
      );
  }

  autoSignIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new AuthUser(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.router.navigate(['/signPage/signIn']);
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
}
