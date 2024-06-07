import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-button-outline',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './button-outline.component.html'
})
export class ButtonOutlineComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() loading: boolean = false;
}
