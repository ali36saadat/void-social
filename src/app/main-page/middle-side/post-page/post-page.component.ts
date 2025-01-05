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
    // console.log(this.newPostForm);
    const date = new Date();
    console.log(
      'day :' +
        date.toLocaleDateString() +
        ' | hour :' +
        date.getHours() +
        ':' +
        date.getMinutes(),
    );
    const newPost = {
      userId: 'ExBQLx1RH4OYb1NEDbMtWJz4v462',
      title: this.newPostForm.get('postTitle')?.value,
      context: this.newPostForm.get('postContent')?.value,
      username: 'Ali36Saadat',
      time: {
        day: date.toLocaleDateString(),
        hour: date.getHours(),
      },
    };
    this.http.post('http://localhost:3000/posts', newPost).subscribe((res) => {
      this.router.navigate(['/mainPage/home']);
    });
  }

  onTextareaInputChange(e: any) {
    this.contentLength = e.target.value.length;
  }
}
