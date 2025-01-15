import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-found',
  templateUrl: './user-found.component.html',
  styleUrl: './user-found.component.scss',
})
export class UserFoundComponent implements OnInit {
  @Input() user = {
    username: '',
    name: { firstName: '', lastName: '' },
    id: '',
    bio: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
