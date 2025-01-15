import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './sign-page/sign-in/sign-in.component';
import { SignUpComponent } from './sign-page/sign-up/sign-up.component';
import { SignPageComponent } from './sign-page/sign-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HomePageComponent } from './main-page/middle-side/home-page/home-page.component';
import { PostPageComponent } from './main-page/middle-side/post-page/post-page.component';
import { SearhPageComponent } from './main-page/middle-side/searh-page/searh-page.component';
import { ProfilePageComponent } from './main-page/middle-side/profile-page/profile-page.component';
import { EditProfileComponent } from './main-page/middle-side/profile-page/edit-profile/edit-profile.component';
import { DefaultProfileComponent } from './main-page/middle-side/profile-page/default-profile/default-profile.component';
import { AuthGuard } from './sign-page/auth.guard';
import { CommentPageComponent } from './main-page/middle-side/profile-page/comment-page/comment-page.component';
import { NotFoundComponent } from './main-page/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/mainPage', pathMatch: 'full' },
  { path: 'signPage/:type', component: SignPageComponent },
  {
    path: 'mainPage',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomePageComponent },
      { path: 'home', component: HomePageComponent },
      { path: 'newPost', component: PostPageComponent },
      { path: 'search', component: SearhPageComponent },
      {
        path: 'profile',
        children: [
          { path: '', component: DefaultProfileComponent },
          { path: 'default', component: DefaultProfileComponent },
          { path: 'editProfile', component: EditProfileComponent },
          {
            path: ':id',
            children: [
              { path: '', component: DefaultProfileComponent },
              {
                path: ':id',
                component: CommentPageComponent,
              },
            ],
          },
        ],
      },
    ],
  },
  // { path: '**', component: NotFoundComponent },
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
