import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-searh-page',
  templateUrl: './searh-page.component.html',
  styleUrl: './searh-page.component.scss',
})
export class SearhPageComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() user: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  changeSearchInput(e: any) {
    const searchInputValue = e.target.value;
    if (!searchInputValue) {
      this.users = [];
    } else {
      this.http
        .get<any[]>(`http://localhost:3000/users?username`)
        .pipe(
          map((users: Array<any>) =>
            users.filter(
              (user: any) =>
                user.username && user.username.includes(e.target.value),
            ),
          ),
        )
        .subscribe((res: any) => {
          this.users = res;
        });
    }
  }
}
