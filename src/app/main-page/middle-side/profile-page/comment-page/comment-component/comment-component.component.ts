import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-component',
  templateUrl: './comment-component.component.html',
  styleUrl: './comment-component.component.scss',
})
export class CommentComponentComponent implements OnInit {
  @Input() comment = { authorComment: '', context: '' };
  @Input() user = { id: '', username: '' };

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.http
      .get(`http://localhost:3000/users?id=${this.comment.authorComment}`)
      .subscribe((res: any) => {
        this.user = res[0];
      });
  }
}
