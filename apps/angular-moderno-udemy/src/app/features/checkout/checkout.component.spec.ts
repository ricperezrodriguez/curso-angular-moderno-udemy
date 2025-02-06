import { TestBed } from "@angular/core/testing";
import { CartStateService } from '@store/cart-state/cart-state.service';
import CheckoutComponent from './checkout.component';
import { CheckoutService } from "./checkout.service";

const mockCartStateService = {
  clearCart: jest.fn(),
  products: [],
  totalAmount: 0,
  productsCount: 0
};

const mockCheckoutService = {
  processPay: jest.fn()
}


describe('CheckoutComponent', () => {
  let component: CheckoutComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [
        { provide: CartStateService, useValue: mockCartStateService },
      { provide: CheckoutService, useValue: mockCheckoutService }],
    }).compileComponents();

     const fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    
    jest.clearAllMocks();
  })

  describe('onProceedPay', () => {
    it('call checkout service with cart store', () => {
      component.onProceedToPay();
      expect(mockCheckoutService.processPay).toHaveBeenCalledWith(component.cartStore)
      })
  })

  describe('clearAll', () => {
    it('call cart service to clear cart', () => {
      component.clearAll();
      expect(mockCartStateService.clearCart).toHaveBeenCalled();
    })
  });

  describe('onRemoveProduct', () => { 
    it('log product id', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const testProductId = 123; 

      component.onRemoveProduct(testProductId);
      expect(consoleSpy).toHaveBeenCalledWith(testProductId);
    })
  })


})

// describe('CheckoutComponent', () => {
//   it('should create', () => {
//     // const myMockFn = jest.fn(x => x * 2);
//     const myMockFn = jest
//       .fn((y?,x?) => 'Hello')
//       // .mockImplementationOnce(() => 'first call')
//       // .mockImplementationOnce(() => 'second call')
//     myMockFn();
//     myMockFn('Angular', 19);

//     expect(myMockFn).toHaveBeenCalled();
//     expect(myMockFn).toHaveBeenCalledTimes(2);
//     expect(myMockFn).toHaveBeenCalledWith('Angular', 19);
//     expect(myMockFn).toHaveReturnedWith('Hello')




//     // console.log(myMockFn.mock.calls.length)
//     // console.log(myMockFn.mock.results)
//     // console.log(myMockFn.mock.instances)
    

//   });
// });

