import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  getYear(): number {
    return new Date().getFullYear();
  }
}
