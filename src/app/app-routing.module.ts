import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
