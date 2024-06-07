import { Store } from '@ngrx/store';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authActions } from './shared/auth/data-access/auth.actions';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { TopbarComponent } from './shared/components/topbar/topbar.component';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  imports: [RouterOutlet, FooterComponent, NgIf, AsyncPipe, NgClass, TopbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(authActions.authentication());
  }
}
