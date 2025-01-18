import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrl: './comment-page.component.scss',
})
export class CommentPageComponent implements OnInit {
  @Input() posts: any[] = [];
  @Input() comments: any[] = [];
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

  commentForm: FormGroup;

  currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const pathArr = window.location.pathname.split('/');

    this.commentForm = new FormGroup({
      commentInput: new FormControl(null, Validators.required),
    });

    this.http
      .get(`http://localhost:3000/posts?id=${pathArr[4]}`)
      .subscribe((res: any) => {
        this.posts = res;
        this.post = res[0];
      });

    this.http
      .get(`http://localhost:3000/comments?postId=${pathArr[4]}`)
      .subscribe((res: any) => {
        this.comments = res;
      });
  }

  comment() {
    if (this.commentForm.get('commentInput')?.value != 0) {
      const newComment = {
        authorComment: this.currentUser.id,
        forUser: this.post.userId,
        postId: this.post.id,
        context: this.commentForm.get('commentInput')?.value,
      };

      this.http
        .post(`http://localhost:3000/comments`, newComment)
        .subscribe((res: any) => {
          this.comments.push(res);
        });
      this.commentForm.reset();
    }
  }
}
