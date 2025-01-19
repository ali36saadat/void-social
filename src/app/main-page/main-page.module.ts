import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MainPageComponent } from './main-page.component';
import { LeftSideComponent } from './left-side/left-side.component';
import { MiddleSideComponent } from './middle-side/middle-side.component';
import { RightSideComponent } from './right-side/right-side.component';
import { HomePageComponent } from './middle-side/home-page/home-page.component';
import { PostComponentComponent } from '../shared/post-component/post-component.component';
import { ProfilePageComponent } from './middle-side/profile-page/profile-page.component';
import { PostPageComponent } from './middle-side/post-page/post-page.component';
import { SearhPageComponent } from './middle-side/searh-page/searh-page.component';
import { DefaultProfileComponent } from './middle-side/profile-page/default-profile/default-profile.component';
import { EditProfileComponent } from './middle-side/profile-page/edit-profile/edit-profile.component';
import { UserFoundComponent } from './middle-side/searh-page/user-found/user-found.component';
import { CommentPageComponent } from './middle-side/profile-page/comment-page/comment-page.component';
import { CommentComponentComponent } from './middle-side/profile-page/comment-page/comment-component/comment-component.component';
import { AppRoutingModule } from '../app-routing.module';
import { MainPageRoutingModule } from './main-page-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    LeftSideComponent,
    MiddleSideComponent,
    RightSideComponent,
    HomePageComponent,
    PostComponentComponent,
    ProfilePageComponent,
    PostPageComponent,
    SearhPageComponent,
    DefaultProfileComponent,
    EditProfileComponent,
    UserFoundComponent,
    CommentPageComponent,
    CommentComponentComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    MainPageRoutingModule,
  ],
  exports: [
    MainPageComponent,
    LeftSideComponent,
    MiddleSideComponent,
    RightSideComponent,
    HomePageComponent,
    PostComponentComponent,
    ProfilePageComponent,
    PostPageComponent,
    SearhPageComponent,
    DefaultProfileComponent,
    EditProfileComponent,
    UserFoundComponent,
    CommentPageComponent,
    CommentComponentComponent,
  ],
})
export class MainPageModule {}
