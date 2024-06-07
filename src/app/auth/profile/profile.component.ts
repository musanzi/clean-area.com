import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UpdateInfoComponent } from './components/update-info/update-info.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [RouterLink, UserInfoComponent, UpdateInfoComponent, UpdatePasswordComponent, CommonModule, SpinnerComponent]
})
export class ProfileComponent {}
