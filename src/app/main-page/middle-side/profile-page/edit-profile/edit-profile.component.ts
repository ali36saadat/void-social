import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  @Input() editProfileData: any | null = {
    id: '',
    name: {
      firstName: '',
      lastName: '',
    },
    email: '',
    username: '',
    bio: '',
  };

  constructor(private http: HttpClient) {
    this.editProfileForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
      bio: new FormControl(null),
    });
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    const userDataLocal = userData ? JSON.parse(userData) : {};
    if (userDataLocal && Object.keys(userDataLocal).length) {
      this.http
        .get(`http://localhost:3000/users?id=${userDataLocal.id}`)
        .subscribe((res: any) => {
          this.editProfileData = res[0];
          // console.log(this.editProfileData);
        });
    }

    // this.http.patch(``)
  }

  onSubmit() {
    const userData = localStorage.getItem('userData');
    const userDataLocal = userData ? JSON.parse(userData) : {};
    if (userDataLocal && Object.keys(userDataLocal).length) {
      this.http
        .patch(`http://localhost:3000/users/OAv6XQEJqGfHlkPdZqhNqpGey6p1`, {
          firstName: 'salam',
          name: {
            firstName: this.editProfileForm.get('firstName')?.value,
            lastName: this.editProfileForm.get('lastName')?.value,
          },
          username: this.editProfileForm.get('username')?.value,
          bio: this.editProfileForm.get('bio')?.value,
        })
        .subscribe({
          next: (res: any) => {
            this.editProfileData = res;
          },
          error: (err) => {
            console.error('Error updating profile:', err);
          },
        });
    }
  }
}
