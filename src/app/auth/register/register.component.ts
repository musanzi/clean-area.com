import { Component } from '@angular/core';
import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormCardComponent } from '../../shared/components/form-card/form-card.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { ButtonOutlineComponent } from '../../shared/ui/button-outline/button-outline.component';
import { InputComponent } from '../../shared/ui/input/input.component';
import { Observable } from 'rxjs';
import { RegisterStore } from './data-access/register.store';
import { RegisterStoreInterface } from './types/register-store.interface';
import { environment } from '../../../environments/environment';
import { MessageComponent } from '../../shared/components/message/message.component';

@Component({
  selector: 'app-register',
  standalone: true,
  providers: [RegisterStore],
  templateUrl: './register.component.html',
  imports: [
    FormCardComponent,
    ButtonComponent,
    ButtonOutlineComponent,
    InputComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MessageComponent,
    NgClass
  ]
})
export class RegisterComponent {
  form: FormGroup;
  vm$: Observable<RegisterStoreInterface>;
  apiUrl: string = environment.apiUrl;

  constructor(private store: RegisterStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.store.register(this.form.value);
  }

  loginWithGoogle(): void {
    window.location.replace(`${this.apiUrl}auth/google/redirect`);
  }

  closeMessage(): void {
    this.store.resetError();
  }
}
