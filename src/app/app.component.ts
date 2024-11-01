import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoryFilterComponent } from '@features/categories/category-filter/category-filter.component';
import { initialCartState } from '@features/shopping-cart/shopping-cart.service';
import { HeaderComponent } from '@layout/header/header.component';
import HeroComponent from '@layout/hero/hero.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeroComponent,
    CategoryFilterComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  cart = initialCartState;
}
