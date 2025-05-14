import { CurrencyPipe, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product.interface';

import { AddToCartComponent } from '@dominicode/ui/add-to-cart';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, AddToCartComponent, CurrencyPipe, SlicePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // @Input({ required: true }) product!: Product;
  product = input.required<Product>();
  // @Output() addToCartEvent = new EventEmitter<Product>();
  addToCartEvent = output<Product>();

  onAddToCart(): void {
    this.addToCartEvent.emit(this.product());
  }
}
