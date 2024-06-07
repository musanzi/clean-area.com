import { NgClass } from '@angular/common';
import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input()
  message: string | null = '';

  @Input()
  type: 'success' | 'error' | null = null;

  handleClose = output<void>();

  close(): void {
    this.handleClose.emit();
  }
}
