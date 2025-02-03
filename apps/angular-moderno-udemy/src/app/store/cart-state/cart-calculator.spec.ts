import { TestBed } from '@angular/core/testing';
import { CartCalculatorService } from "@store/cart-state/cart-calculator.service";

describe('CartCalculatorService', () => {
  let service: CartCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCalculatorService);
  });

  describe('calculateTotal()', () => {
    
    it('calculate total price correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: '5', quantity: 3 },
        { price: 20 },
      ];

      expect(service.calculateTotal(items)).toBe(55);
    });

    it('calculate total price with default quantity', () => {
      const items = [{ price: 10 }, { price: '5' }];

      expect(service.calculateTotal(items)).toBe(15);
    });

    it('return 0 for empty items list', () => {
      expect(service.calculateTotal([])).toBe(0);
    });

  })


  describe('calculateItemsCount()', () => {
    it('calculate total item count correctly', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: '5', quantity: 3 },
        { price: 20 },
      ];
      expect(service.calculateItemsCount(items)).toBe(6)
      
    });

    it('calculate total item count with default quantity', () => {
      const items = [
        { price: 10, },
        { price: '25' },
      ];
      
      expect(service.calculateItemsCount(items)).toBe(2);
    });

    it('return 0 for empty items list in item count', () => {
      expect(service.calculateItemsCount([])).toBe(0)
    })
  })
})