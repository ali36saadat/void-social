import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrl: './post-component.component.scss',
})
export class PostComponentComponent implements OnInit {
  @Input() post = {
    id: '',
    userId: '',
    title: '',
    context: '',
    time: {
      day: '',
      hour: '',
    },
    like: [],
  };
  @Input() user = { username: '' };
  @Input() time = '';
  @Input() likeNumbers = this.post.like.length;
  @Input() isLike = false;
  constructor(private http: HttpClient) {}
  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

  ngOnInit(): void {
    this.likeNumbers = this.post.like.length;

    if (this.post.like.some((id: string) => id === this.currentUser.id)) {
      this.isLike = true;
    }

    const date = new Date();

    if (this.post.time.day == date.toLocaleDateString()) {
      if (date.getHours() == Number(this.post.time.hour)) {
        this.time = `Now`;
      } else {
        this.time = `${date.getHours() - Number(this.post.time.hour)}h ago`;
      }
    } else {
      this.time = this.post.time.day;
    }

    this.http
      .get(`http://localhost:3000/users/${this.post.userId}`)
      .subscribe((res: any) => {
        this.user = res;
      });

  }

  likePost() {
    if (!this.isLike) {
      const newLike = [...this.post.like, this.currentUser.id];
      this.http
        .patch(`http://localhost:3000/posts/${this.post.id}`, {
          like: newLike,
        })
        .subscribe((res: any) => {
          this.post.like = res.like;
          this.likeNumbers = this.post.like.length;
        });

      this.isLike = true;
    } else {
      const newLike = this.post.like.filter((l) => l != this.currentUser.id);
      this.isLike = false;

      this.http
        .patch(`http://localhost:3000/posts/${this.post.id}`, {
          like: newLike,
        })
        .subscribe((res: any) => {
          this.post.like = res.like;
          this.likeNumbers = this.post.like.length;
        });
    }
  }
}
