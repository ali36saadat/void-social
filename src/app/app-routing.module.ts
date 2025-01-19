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
  {
    path: 'mainPage',
    loadChildren: () =>
      import('./main-page/main-page.module').then((m) => m.MainPageModule),
  },
  {
    path: 'signPage',
    loadChildren: () =>
      import('./sign-page/sign-page.module').then((m) => m.SignPageModule),
  },
  // { path: '**', component: NotFoundComponent },
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
