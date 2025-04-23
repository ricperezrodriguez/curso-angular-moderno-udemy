import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Product } from '@features/products/product.interface';
import { ToastrService } from 'ngx-toastr';
import { CartCalculatorService } from 'src/app/store/cart-state/cart-calculator.service';
import { CartStorageService } from './cart-storage.service';

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

export const initialCartState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0,
};

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private readonly _cartCalculatorService = inject(CartCalculatorService);
  private readonly _toastrService = inject(ToastrService);
  private readonly _cartStorageService = inject(CartStorageService);

  private readonly _products = signal<Product[]>([]);
  readonly totalAmount = computed(() =>
    this._cartCalculatorService.calculateTotal(this._products())
  );
  readonly productsCount = computed(() =>
    this._cartCalculatorService.calculateItemsCount(this._products())
  );
  readonly cardStore = computed(() => ({
    products: this._products(),
    totalAmount: this.totalAmount(),
    productsCount: this.productsCount(),
  }));

  constructor() {
    const storedState = this._cartStorageService.loadState();
    if (storedState) {
      this._products.set(storedState.products);
    }

    effect(() => {
      const state = this.cardStore();
      this._cartStorageService.saveState(state);
    });
  }

  addToCart(product: Product): void {
    const currentProducts = this._products();

    const existingProductIndex = currentProducts.findIndex(
      (p) => p.id === product.id
    );
    if (existingProductIndex >= 0) {
      currentProducts[existingProductIndex] = {
        ...product,
        quantity: (currentProducts[existingProductIndex].quantity || 0) + 1,
      };

      this._products.set(currentProducts);
    } else {
      this._products.update((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    this._toastrService.success('Product added!!', 'DOMINI STORE');
  }

  removeFromCart(productId: number): void {
    try {
      if (!productId) {
        throw new Error('Product ID is required to remove from cart');
      }

      const currentProducts = this._products();
      const productExists = currentProducts.some((p) => p.id === productId);
      if (!productExists) {
        this._toastrService.error('Product not found in cart', 'DOMINI STORE');
        return;
      }

      this._products.update((prev: Product[]) =>
        prev.filter((p) => p.id !== productId)
      );

      this._toastrService.success('Product removed!!', 'DOMINI STORE');
    } catch (e) {
      console.error('Error removing product from cart:', e);
      this._toastrService.error(
        'Error removing product from cart',
        'DOMINI STORE'
      );
    }
  }

  clearCart(): void {
    this._products.set([]);
    this._toastrService.success('All Products removed!', 'DOMINI STORE');
  }
}
