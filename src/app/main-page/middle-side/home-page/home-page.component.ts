import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  @Input() posts: [] = [];

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(
        `http://localhost:3000/following?followedById=${this.currentUser.id}`,
      )
      .pipe(
        map((u: object[] | any, i: number) => {
          return u.map((item: any) => item.followedId);
        }),
      )
      .subscribe((followingArr: any) => {
        console.log(followingArr);
        this.http
          .get(`http://localhost:3000/posts`)
          .pipe(
            map((p: any) =>
              p.filter((post: any) =>
                followingArr.some((id: any) => id === post.userId),
              ),
            ),
          )
          .subscribe((res) => {
            this.posts = res;
          });
      });
  }
}
