import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  Injectable,
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrl: './post-page.component.scss',
})
export class PostPageComponent implements OnInit {
  @Input() contentLength = 0;

  newPostForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.newPostForm = new FormGroup({
      postTitle: new FormControl(null, Validators.required),
      postContent: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const user = JSON.parse(localStorage.getItem('userData') || '{}');
    const date = new Date();

    const newPost = {
      userId: user.id,
      title: this.newPostForm.get('postTitle')?.value,
      context: this.newPostForm.get('postContent')?.value,
      time: {
        day: date.toLocaleDateString(),
        hour: date.getHours(),
      },
      like: [],
    };

    this.http.post('http://localhost:3000/posts', newPost).subscribe((res) => {
      this.router.navigate(['/mainPage/home']);
    });
  }

  onTextareaInputChange(e: any) {
    this.contentLength = e.target.value.length;
  }
}
