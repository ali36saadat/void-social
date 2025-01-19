import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { AuthGuard } from '../sign-page/auth.guard';
import { HomePageComponent } from './middle-side/home-page/home-page.component';
import { PostPageComponent } from './middle-side/post-page/post-page.component';
import { SearhPageComponent } from './middle-side/searh-page/searh-page.component';
import { DefaultProfileComponent } from './middle-side/profile-page/default-profile/default-profile.component';
import { EditProfileComponent } from './middle-side/profile-page/edit-profile/edit-profile.component';
import { CommentPageComponent } from './middle-side/profile-page/comment-page/comment-page.component';

const routes: Routes = [
  {
    path: '',
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
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class MainPageRoutingModule {}
