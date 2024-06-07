import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, takeUntil } from 'rxjs';
import { UpdateInfoStore } from './data-access/update-info.store';
import { User } from '../../../../shared/types/models-interfaces';
import { UpdateInfoStoreInterface } from './types/update-info-store.interface';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/ui/input/input.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { MessageComponent } from '../../../../shared/components/message/message.component';

@Component({
  selector: 'app-update-info',
  standalone: true,
  providers: [UpdateInfoStore],
  templateUrl: './update-info.component.html',
  imports: [ReactiveFormsModule, CommonModule, InputComponent, ButtonComponent, MessageComponent]
})
export class UpdateInfoComponent implements OnInit {
  form: FormGroup;
  vm$: Observable<{ udpateInfoState: UpdateInfoStoreInterface; user: User | null }>;

  constructor(private store: UpdateInfoStore, private formBuilder: FormBuilder) {
    this.vm$ = this.store.vm$;
    this.form = this.formBuilder.nonNullable.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.vm$.pipe(takeUntil(this.store.destroy$)).subscribe((state) => {
      this.form.patchValue({
        name: state.user?.name,
        address: state.user?.address,
        phone_number: state.user?.phone_number
      });
    });
  }

  onSubmit(): void {
    this.store.upatedProfile(this.form.value);
  }

  closeUpdateInfoMessage(): void {
    this.store.resetInfoUpdateMessage();
  }
}
