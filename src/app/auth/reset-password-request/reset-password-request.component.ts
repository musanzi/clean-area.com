import { Component } from '@angular/core';
import { FormCardComponent } from '../../shared/components/form-card/form-card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { ButtonOutlineComponent } from '../../shared/ui/button-outline/button-outline.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ResetPasswordRequestStore } from './data-access/reset-password-request.store';
import { ResetPasswordRequestStoreInterface } from './types/reset-password-request-store.interface';
import { MessageComponent } from '../../shared/components/message/message.component';

@Component({
  selector: 'app-reset-password-request',
  standalone: true,
  providers: [ResetPasswordRequestStore],
  templateUrl: './reset-password-request.component.html',
  imports: [
    FormCardComponent,
    ButtonComponent,
    InputComponent,
    RouterLink,
    NgOptimizedImage,
    ButtonOutlineComponent,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MessageComponent,
    NgClass
  ]
})
export class ResetPasswordRequestComponent {
  form: FormGroup;
  apiUrl: string = environment.apiUrl;
  vm$: Observable<ResetPasswordRequestStoreInterface>;

  constructor(private store: ResetPasswordRequestStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.store.resetPassword(this.form.value);
  }

  loginWithGoogle(): void {
    return window.location.replace(`${this.apiUrl}auth/google/redirect`);
  }

  closeMessage(): void {
    this.store.resetError();
  }
}
