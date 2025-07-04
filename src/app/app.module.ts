import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LeftSideComponent } from './main-page/left-side/left-side.component';
import { MiddleSideComponent } from './main-page/middle-side/middle-side.component';
import { RightSideComponent } from './main-page/right-side/right-side.component';
import { PryamidComponentComponent } from './main-page/pryamid-component/pryamid-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './main-page/not-found/not-found.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, PryamidComponentComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.FIREBASE_API as any)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
