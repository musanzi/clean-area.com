import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-form-card',
  standalone: true,
  templateUrl: './form-card.component.html',
  imports: [CommonModule, MessageComponent]
})
export class FormCardComponent {
  @Input() formTitle: string = '';
  @Input() error: string | null = '';
}
