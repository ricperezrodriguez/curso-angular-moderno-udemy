import { TestBed } from '@angular/core/testing';
import { CartCalculatorService } from './cart-calculator.service';

interface CartItem {
  price: number | string;
  quantity?: number;
}

describe('CartCalculatorService', () => {
  let service: CartCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartCalculatorService],
    });
    service = TestBed.inject(CartCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate total price correctly', () => {
    const items: CartItem[] = [
      { price: 10, quantity: 2 },
      { price: '5', quantity: 3 },
      { price: 20 },
    ];
    const total = service.calculateTotal(items);
    expect(total).toBe(55);
  });

  it('should calculate total price with default quantity', () => {
    const items: CartItem[] = [{ price: 10 }, { price: '5', quantity: 2 }];
    const total = service.calculateTotal(items);
    expect(total).toBe(20);
  });

  it('should calculate total items count correctly', () => {
    const items: CartItem[] = [
      { price: 10, quantity: 2 },
      { price: '5', quantity: 3 },
      { price: 20 },
    ];
    const count = service.calculateItemsCount(items);
    expect(count).toBe(6);
  });

  it('should calculate total items count with default quantity', () => {
    const items: CartItem[] = [{ price: 10 }, { price: '5', quantity: 2 }];
    const count = service.calculateItemsCount(items);
    expect(count).toBe(3);
  });
});


// Explicación de las pruebas:
// 1. Creación del servicio: Verifica que el servicio se crea correctamente.
// 2. Cálculo del precio total: Comprueba que el método calculateTotal calcula correctamente el precio total de los artículos, considerando tanto precios numéricos como de cadena.
// Cálculo del precio total con cantidad predeterminada: Verifica que el método calculateTotal maneja correctamente los artículos sin cantidad especificada, usando la cantidad predeterminada de 1.
// Cálculo del conteo total de artículos: Comprueba que el método calculateItemsCount calcula correctamente el número total de artículos, considerando las cantidades especificadas.
// Cálculo del conteo total de artículos con cantidad predeterminada: Verifica que el método calculateItemsCount maneja correctamente los artículos sin cantidad especificada, usando la cantidad predeterminada de 1.
// Estas pruebas aseguran que los métodos del servicio CartCalculatorService funcionan correctamente bajo diferentes escenarios.