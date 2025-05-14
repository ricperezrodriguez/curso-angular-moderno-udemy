import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { AddToCartComponent } from '@dominicode/ui/add-to-cart';
import { STAR_SVG } from '@shared/constants/star-svg.constants';
import { CartStateService } from '@store/cart-state/cart-state.service';
import { Product } from '../product.interface';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AddToCartComponent, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export default class DetailsComponent {
  starsArray: number[] = new Array(5).fill(0);
  product!: Product | undefined;

  private _productId!: number;
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productSvc = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _cartService = inject(CartStateService);

  constructor() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this._productId = params['id'];
      this.product = this._productSvc.getProductById(+this._productId);
    });
  }

  onAddToCart(product: Product): void {
    this._cartService.addToCart(product);
  }

  getStarSVG(starIndex: number, productRate: number): SafeHtml {
    if (starIndex + 1 <= Math.floor(productRate)) {
      return this._sanitizer.bypassSecurityTrustHtml(STAR_SVG.FULL);
    }

    if (starIndex < productRate) {
      return this._sanitizer.bypassSecurityTrustHtml(STAR_SVG.PARTIAL);
    }

    return this._sanitizer.bypassSecurityTrustHtml(STAR_SVG.EMPTY);
  }
}
