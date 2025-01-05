import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-alert',
  templateUrl: './sign-alert.component.html',
  styleUrl: './sign-alert.component.scss',
})
export class SignAlertComponent {
  constructor() {}

  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
