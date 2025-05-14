import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RemoveProductComponent } from '@shared/ui/remove/remove-product.component';
import { CartStateService } from '@store/cart-state/cart-state.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RemoveProductComponent, SlicePipe, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export default class CheckoutComponent {
  private readonly cartService = inject(CartStateService);
  cartstore = this.cartService.cardStore;

  private readonly _checkoutSvc = inject(CheckoutService);

  onProceedToPay(): void {
    this._checkoutSvc.processPay(this.cartstore);
  }

  clearAll(): void {
    this.cartService.clearCart();
  }

  onRemoveProduct(productId: number) {
    console.log(productId);
  }
}
