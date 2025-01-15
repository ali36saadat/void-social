import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../../sign-page/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-default-profile',
  templateUrl: './default-profile.component.html',
  styleUrl: './default-profile.component.scss',
})
export class DefaultProfileComponent implements OnInit {
  id = '';
  myId = '';

  @Input() posts: any[] = [];
  @Input() profileData: any | null = {
    id: '',
    name: {
      firstName: '',
      lastName: '',
    },
    email: '',
    username: '',
    bio: '',
    followingLength: 0,
    followerLength: 0,
  };
  @Input() isMyProfile = true;
  @Input() isFollowing = false;
  @Input() idFollowing = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    const userDataLocal = userData ? JSON.parse(userData) : {};
    this.myId = userDataLocal.id;
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      if (userDataLocal && Object.keys(userDataLocal).length) {
        if (this.id == this.myId || this.id == undefined) {
          this.isMyProfile = true;
          this.id = this.myId;
          this.http
            .get(`http://localhost:3000/users?id=${this.myId}`)
            .subscribe((res: any) => {
              this.profileData = res[0];
            });
        } else {
          this.isMyProfile = false;
          this.http.get(`http://localhost:3000/users?id=${this.id}`).subscribe({
            next: (res: any) => {
              this.profileData = res.length ? res[0] : undefined;

              if (!this.profileData) {
                this.router.navigate(['/mainPage/profile']);
              }
              this.http
                .get(
                  `http://localhost:3000/following?followedId=${this.id}&followedById=${this.myId}`,
                )
                .subscribe({
                  next: (res: any) => {
                    if (res.length == 0) {
                      this.isFollowing = false;
                    } else {
                      this.idFollowing = res[0].id;
                      this.isFollowing = true;
                    }
                  },
                });
            },
            error: (err) => {
              // this.router.navigate(['/mainPage']);
            },
          });
        }
      }

      this.http
        .get(`http://localhost:3000/following?followedId=${this.id}`)
        .subscribe((res: any) => {
          this.profileData.followerLength = res.length;
        });

      this.http
        .get(`http://localhost:3000/following?followedById=${this.id}`)
        .subscribe((res: any) => {
          this.profileData.followingLength = res.length;
        });
    });

    this.http
      .get(`http://localhost:3000/posts?userId=${this.id}`)
      .subscribe((res: any) => {
        this.posts = res;
      });
  }

  logout() {
    this.authService.logout();
  }

  followAndUnfollow() {
    if (!this.isFollowing) {
      this.http
        .post(`http://localhost:3000/following`, {
          followedId: this.id,
          followedById: this.myId,
        })
        .subscribe((res: any) => {
          this.idFollowing = res.id;
        });
      this.isFollowing = !this.isFollowing;
    } else {
      this.http
        .delete(`http://localhost:3000/following/${this.idFollowing}`)
        .subscribe(() => {});
      this.isFollowing = !this.isFollowing;
    }
  }
}
