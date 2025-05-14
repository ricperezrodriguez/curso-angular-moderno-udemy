// describe('CheckoutComponent', () => {
//   it('should create', () => {
//     const myMockFn = jest.fn((x?, y?) => 'hello');

import { TestBed } from '@angular/core/testing';
import { CartStateService } from '@store/cart-state/cart-state.service';
import CheckoutComponent from './checkout.component';
import { CheckoutService } from './checkout.service';

//     myMockFn();
//     myMockFn('Angular', 19);

//     expect(myMockFn).toHaveBeenCalled();
//     expect(myMockFn).toHaveBeenCalledWith('Angular', 19);
//     expect(myMockFn).toHaveBeenCalledTimes(2);
//   });
// });

const mockCartStateService = {
  clearCart: jest.fn(),
  products: [],
  totalAmount: 0,
  productCount: 0,
};

const mockCheckoutService = {
  processPay: jest.fn(),
};

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: CartStateService, useValue: mockCartStateService },
        { provide: CheckoutService, useValue: mockCheckoutService },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;

    jest.clearAllMocks();
  });

  describe('onProceedPay', () => {
    it('call checkout service with cartstore', () => {
      component.onProceedToPay();
      expect(mockCheckoutService.processPay).toHaveBeenCalledWith(
        component.cartstore
      );
    });
  });

  describe('clearAll', () => {
    it('call clear cart method', () => {
      component.clearAll();
      expect(mockCartStateService.clearCart).toHaveBeenCalled();
    });
  });

  describe('onRemoveProduct', () => {
    it('log product id', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const productId = 1;
      component.onRemoveProduct(productId);
      expect(consoleSpy).toHaveBeenCalledWith(productId);
    });
  });
});
