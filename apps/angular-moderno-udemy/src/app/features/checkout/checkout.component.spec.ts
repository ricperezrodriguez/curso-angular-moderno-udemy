import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CheckoutService } from "@features/checkout/checkout.service";
import { CartStateService } from "@store/cart-state/cart-state.service";

// @Component({
//   selector: 'app-remove-product',
//   standalone: true,
//   template: '<button (click)="clickRemoveProduct.emit(123)">remove</button>'
// })
// class MockRemoveProductComponent {
//   clickRemoveProduct = { emit: jest.fn() };
// }

  @Component({
    selector: 'app-checkout',
    standalone: true,
    template: '<button (click)="clickRemoveProduct.emit(123)">remove</button>',
  })
  class MockCheckoutComponent {

    onProceedToPay(): void {
      console.log('onProceedToPay');
    }

    clearAll(): void {
      console.log('clearAll');
    }

    onRemoveProduct(productId: number) {
      console.log(productId);
    }
  }

const mockCheckoutService = {
  processPay: jest.fn()
};

const mockCartStateService = {
  clearCart: jest.fn(),
  cartStore: jest.fn(() => ({
    products: [{
      id: 1,
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      quantity: 1
    }],
    totalAmount: 100,
    productsCount: 1
  }))
};


describe('CheckoutComponent', () => {
  let component: MockCheckoutComponent;
  let fixture: ComponentFixture<MockCheckoutComponent>;

//   jest.mock('@shared/ui/remove/svg/remove-svg.component', () => {
//   class MockRemoveSVGComponent {}
//   return {
//     RemoveSVGComponent: Component({
//       standalone: true,
//       selector: 'app-remove-svg',
//       template: '<svg></svg>'
//     })(MockRemoveSVGComponent)
//   };
// });

  beforeEach( () => {
     TestBed.configureTestingModule({
       imports: [MockCheckoutComponent],
       providers: [
         { provide: CartStateService, useValue: mockCartStateService },
         { provide: CheckoutService, useValue: mockCheckoutService },
       ],
     }).compileComponents();

    fixture = TestBed.createComponent(MockCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    const myMock = jest.fn();
    // myMock.mockReturnValueOnce('true').mockReturnValueOnce('false');
      
    console.log(myMock());
    console.log(myMock());
    // console.log(myMock()); // undefined
    // console.log(myMock()); // undefined

    expect(myMock.mock.calls.length).toBe(2);
  });
});
