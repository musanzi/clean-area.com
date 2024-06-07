import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'submit';
  @Input() loading: boolean | null = false;
  @Input() disabled: boolean | null = false;
}
