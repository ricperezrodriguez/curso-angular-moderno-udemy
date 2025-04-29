import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { CategoryService } from '@features/categories/categories.service';
import { ProductsService } from '@features/products/products.service';
import { CategoryButtonComponent } from '../category-button/category-button.component';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [AsyncPipe, CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">
      <li>
        <app-category-button
          category="all"
          [(filterCategory)]="selectedCategory"
        />
      </li>
      @for(category of categories(); track category) {
      <li>
        <app-category-button
          [category]="category"
          [(filterCategory)]="selectedCategory"
        />
      </li>
      }
    </ul>
  `,
})
export class CategoryFilterComponent {
  readonly categories = inject(CategoryService).categories;
  private readonly _productsService = inject(ProductsService);

  selectedCategory = signal<string>('all');

  constructor() {
    effect(
      () => {
        const category = this.selectedCategory();
        this._productsService.filterProductsByCategory(category);
      },
      {
        allowSignalWrites: true,
      }
    );
  }
}
