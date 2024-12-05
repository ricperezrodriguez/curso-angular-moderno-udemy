import { Component, effect, inject, signal } from '@angular/core';
import { CategoryService } from '@features/categories/categories.service';
import { CategoryButtonComponent } from '@features/categories/category-button/category-button.component';
import { ProductsService } from '@features/products/products.service';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CategoryButtonComponent],
  styleUrl: './category-filter.component.scss',
  template: `
    <h2 class="heading">
      <span class="highlight">Popular</span>
      categories
    </h2>
    <ul class="list-container">
      <li>
        <app-category-button
          category="ALL"
          [(filterCategory)]="selectedCategory"
        />
      </li>
      @for (category of categories(); track category) {
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

  private readonly _productService = inject(ProductsService);

  selectedCategory = signal<string>('all');

  constructor() {
    effect(
      () =>
        this._productService.filterProductsByCategory(this.selectedCategory()),
      {
        allowSignalWrites: true,
      }
    );
  }
}
