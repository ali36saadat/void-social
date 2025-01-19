import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
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
import { DefaultProfileComponent } from './main-page/middle-side/profile-page/default-profile/default-profile.component';
import { EditProfileComponent } from './main-page/middle-side/profile-page/edit-profile/edit-profile.component';
import { UserFoundComponent } from './main-page/middle-side/searh-page/user-found/user-found.component';
import { CommentPageComponent } from './main-page/middle-side/profile-page/comment-page/comment-page.component';
import { CommentComponentComponent } from './main-page/middle-side/profile-page/comment-page/comment-component/comment-component.component';
import { NotFoundComponent } from './main-page/not-found/not-found.component';
import { SignPageModule } from './sign-page/sign-page.module';
import { MainPageRoutingModule } from './main-page/main-page-routing.module';
import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
    PyramidPageComponent,
    PryamidComponentComponent,
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
