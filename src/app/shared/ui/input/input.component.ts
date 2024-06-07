import { Component, inject, Input } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { ApiValiationsErrorsInterface } from '../../auth/types/api-valiations-errors.interface';

@Component({
  selector: 'app-input',
  standalone: true,
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ],
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() type: 'email' | 'password' | 'text' | 'number' = 'text';
  @Input() placeholder: string = '';
  @Input() validationErrors: ApiValiationsErrorsInterface[] = [];

  getError(field: string): string {
    const error = this.validationErrors.find((error: ApiValiationsErrorsInterface) => error.property === field);
    if (!error) return '';
    return error.message;
  }
}
