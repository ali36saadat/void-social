import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../assets/css/prism.css'],
})
export class AppComponent {
  title = 'twitextAngular';

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
}
