import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { SignInComponent } from './sign-page/sign-in/sign-in.component';
import { SignUpComponent } from './sign-page/sign-up/sign-up.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SignSideComponent } from './sign-page/sign-side/sign-side.component';
import { LeftSideComponent } from './main-page/left-side/left-side.component';
import { MiddleSideComponent } from './main-page/middle-side/middle-side.component';
import { RightSideComponent } from './main-page/right-side/right-side.component';
import { PyramidPageComponent } from './pyramid-page/pyramid-page.component';
import { PryamidComponentComponent } from './main-page/pryamid-component/pryamid-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './main-page/middle-side/home-page/home-page.component';
import { PostComponentComponent } from './shared/post-component/post-component.component';
import { ProfilePageComponent } from './main-page/middle-side/profile-page/profile-page.component';
import { PostPageComponent } from './main-page/middle-side/post-page/post-page.component';
import { SearhPageComponent } from './main-page/middle-side/searh-page/searh-page.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { SignAlertComponent } from './shared/sign-alert/sign-alert.component';
import { DefaultProfileComponent } from './main-page/middle-side/profile-page/default-profile/default-profile.component';
import { EditProfileComponent } from './main-page/middle-side/profile-page/edit-profile/edit-profile.component';
import { UserFoundComponent } from './main-page/middle-side/searh-page/user-found/user-found.component';
import { CommentPageComponent } from './main-page/middle-side/profile-page/comment-page/comment-page.component';
import { CommentComponentComponent } from './main-page/middle-side/profile-page/comment-page/comment-component/comment-component.component';
import { NotFoundComponent } from './main-page/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    SignPageComponent,
    SignInComponent,
    SignUpComponent,
    MainPageComponent,
    SignSideComponent,
    LeftSideComponent,
    MiddleSideComponent,
    RightSideComponent,
    PyramidPageComponent,
    PryamidComponentComponent,
    HomePageComponent,
    PostComponentComponent,
    ProfilePageComponent,
    PostPageComponent,
    SearhPageComponent,
    LoadingSpinnerComponent,
    SignAlertComponent,
    DefaultProfileComponent,
    EditProfileComponent,
    UserFoundComponent,
    CommentPageComponent,
    CommentComponentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
